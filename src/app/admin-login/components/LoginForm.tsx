'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/locales/translations';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { language } = useLanguage();
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
    
    // Check for existing lockout
    if (typeof window !== 'undefined') {
      const storedLockout = localStorage.getItem('adminLoginLockout');
      if (storedLockout) {
        const lockoutEnd = parseInt(storedLockout);
        const now = Date.now();
        if (now < lockoutEnd) {
          setIsLocked(true);
          setLockoutTime(Math.ceil((lockoutEnd - now) / 1000));
        } else {
          localStorage.removeItem('adminLoginLockout');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('adminLoginLockout');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutTime]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = getTranslation(language, 'adminLogin.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = getTranslation(language, 'adminLogin.passwordMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Use Supabase Auth for authentication
      await signIn(email, password);
      
      // Successful login
      setLoginAttempts(0);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminLoginLockout');
      }
      
      // Trigger middleware redirect by refreshing the router
      // The middleware will detect the authenticated session and redirect to /admin-dashboard
      router.refresh();
    } catch (error: any) {
      // Failed login
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 3) {
        // Lock account for 5 minutes
        const lockoutEnd = Date.now() + 5 * 60 * 1000;
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminLoginLockout', lockoutEnd.toString());
        }
        setIsLocked(true);
        setLockoutTime(300);
        setErrors({
          general: 'Demasiados intentos fallidos. Cuenta bloqueada por 5 minutos.'
        });
      } else {
        const errorMessage = error?.message || 'Credenciales inválidas';
        setErrors({
          general: `${errorMessage}. Intentos restantes: ${3 - newAttempts}`
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatLockoutTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-brand p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-primary/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-brand p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          {getTranslation(language, 'adminLogin.title')}
        </h2>
        <p className="text-text-secondary">
          {getTranslation(language, 'adminLogin.subtitle')}
        </p>
      </div>

      {isLocked && (
        <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-heading font-semibold text-error mb-1">
                {getTranslation(language, 'adminLogin.accountLocked')}
              </p>
              <p className="text-sm text-text-secondary">
                {getTranslation(language, 'adminLogin.tooManyAttempts')}. {getTranslation(language, 'adminLogin.tryAgainIn')} {lockoutTime} {getTranslation(language, 'adminLogin.seconds')}.
              </p>
            </div>
          </div>
        </div>
      )}

      {errors.general && !isLocked && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-error mt-0.5" />
            <p className="text-sm text-error flex-1">{errors.general}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-heading font-semibold text-text-primary mb-2"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="UserIcon" size={20} className="text-text-secondary" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLocked}
              className={`w-full pl-10 pr-4 py-3 bg-input border rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-error' : 'border-border'
              } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="admin@mecatronicspro.com"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-error">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-heading font-semibold text-text-primary mb-2"
          >
            {getTranslation(language, 'adminLogin.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={20} className="text-text-secondary" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
              className={`w-full pl-10 pr-12 py-3 bg-input border rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                errors.password ? 'border-error' : 'border-border'
              } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLocked}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon
                name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                size={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-error">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isLocked}
          className="w-full bg-cta hover:bg-primary-hover text-white font-heading font-semibold py-3 px-6 rounded-md transition-all duration-200 shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{getTranslation(language, 'adminLogin.login')}</span>
            </>
          ) : (
            <span>{getTranslation(language, 'adminLogin.login')}</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-text-secondary">
          Sistema protegido con autenticación Supabase
        </p>
      </div>
    </div>
  );
};

export default LoginForm;