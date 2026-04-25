'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GatedContentModalProps {
  isOpen: boolean;
  documentTitle: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  jobTitle: string;
  newsletter: boolean;
}

const GatedContentModal = ({
  isOpen,
  documentTitle,
  onClose,
  onSubmit,
}: GatedContentModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    jobTitle: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isOpen && isHydrated) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isHydrated]);

  if (!isHydrated || !isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        industry: '',
        jobTitle: '',
        newsletter: false,
      });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-brand-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">
              Request Premium Access
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Fill out the form to download: <span className="font-heading font-semibold">{documentTitle}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-heading font-semibold text-text-primary mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${
                errors.fullName ? 'border-error' : 'border-border'
              } bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
              placeholder="Juan Pérez"
            />
            {errors.fullName && (
              <p className="text-xs text-error mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-heading font-semibold text-text-primary mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.email ? 'border-error' : 'border-border'
                } bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
                placeholder="juan@empresa.com"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-heading font-semibold text-text-primary mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.phone ? 'border-error' : 'border-border'
                } bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
                placeholder="+34 600 000 000"
              />
              {errors.phone && (
                <p className="text-xs text-error mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Company & Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-heading font-semibold text-text-primary mb-2"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.company ? 'border-error' : 'border-border'
                } bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
                placeholder="Empresa S.A."
              />
              {errors.company && (
                <p className="text-xs text-error mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-heading font-semibold text-text-primary mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-border bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                placeholder="Director Técnico"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-heading font-semibold text-text-primary mb-2"
            >
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${
                errors.industry ? 'border-error' : 'border-border'
              } bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
            >
              <option value="">Select your industry</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Automotive">Automotive</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Electronics">Electronics</option>
              <option value="Packaging">Packaging</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && (
              <p className="text-xs text-error mt-1">{errors.industry}</p>
            )}
          </div>

          {/* Newsletter */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="newsletter" className="text-sm text-text-secondary">
              I would like to receive updates, technical insights, and automation news from Mecatronics Pro
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-heading font-semibold text-text-primary hover:text-text-secondary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-conversion text-conversion-foreground rounded-md text-sm font-heading font-semibold hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand flex items-center space-x-2"
            >
              <Icon name="ArrowDownTrayIcon" size={18} />
              <span>Download Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GatedContentModal;