'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/locales/translations';
import { createClient } from '@/lib/supabase/client';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
  contactPreference: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    contactPreference: 'email',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const projectTypes = [
    { value: '', label: getTranslation(language, 'contact.selectProjectType') },
    { value: 'Automatización Industrial', label: language === 'es' ? 'Automatización Industrial' : 'Industrial Automation' },
    { value: 'Robótica y Manipulación', label: language === 'es' ? 'Robótica y Manipulación' : 'Robotics and Manipulation' },
    { value: 'Programación PLC', label: language === 'es' ? 'Programación PLC' : 'PLC Programming' },
    { value: 'Sistemas SCADA', label: language === 'es' ? 'Sistemas SCADA' : 'SCADA Systems' },
    { value: 'Mantenimiento Preventivo', label: language === 'es' ? 'Mantenimiento Preventivo' : 'Preventive Maintenance' },
    { value: 'Consultoría Técnica', label: language === 'es' ? 'Consultoría Técnica' : 'Technical Consulting' },
    { value: 'Otro', label: language === 'es' ? 'Otro' : 'Other' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = getTranslation(language, 'contact.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = getTranslation(language, 'contact.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = getTranslation(language, 'contact.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = getTranslation(language, 'contact.phoneRequired');
    } else if (!/^[+]?[\d\s()-]{9,}$/.test(formData.phone)) {
      newErrors.phone = getTranslation(language, 'contact.phoneInvalid');
    }

    if (!formData.projectType) {
      newErrors.projectType = getTranslation(language, 'contact.projectTypeRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = getTranslation(language, 'contact.messageRequired');
    } else if (formData.message.trim().length < 20) {
      newErrors.message = getTranslation(language, 'contact.messageMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // Call Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message,
          contactPreference: formData.contactPreference,
        },
      });

      if (error) {
        console.error('Error sending email:', error);
        throw new Error(error.message || 'Failed to send email');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: '',
          contactPreference: 'email',
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-success/10 border border-success rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
          <Icon name="CheckIcon" size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-success mb-2">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-text-secondary">
          Gracias por contactarnos. Nuestro equipo revisará su solicitud y se pondrá en contacto con usted dentro de las próximas 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-semibold text-text-primary mb-2">
            {getTranslation(language, 'contact.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-input border ${
              errors.name ? 'border-error' : 'border-border'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-heading font-semibold text-text-primary mb-2">
            {getTranslation(language, 'contact.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-input border ${
              errors.email ? 'border-error' : 'border-border'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
            placeholder="juan.perez@empresa.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone and Company Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-heading font-semibold text-text-primary mb-2">
            {getTranslation(language, 'contact.phone')} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-input border ${
              errors.phone ? 'border-error' : 'border-border'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
            placeholder="+55 123 456 78 98"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-heading font-semibold text-text-primary mb-2">
            {getTranslation(language, 'contact.company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="Nombre de su empresa"
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-heading font-semibold text-text-primary mb-2">
          {getTranslation(language, 'contact.projectType')} *
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-input border ${
            errors.projectType ? 'border-error' : 'border-border'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Contact Preference */}
      <div>
        <label className="block text-sm font-heading font-semibold text-text-primary mb-3">
          {getTranslation(language, 'contact.contactPreference')}
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            { value: 'email', label: 'Correo Electrónico', icon: 'EnvelopeIcon' },
            { value: 'phone', label: 'Teléfono', icon: 'PhoneIcon' },
            { value: 'in-person', label: 'Presencial', icon: 'UserIcon' },
          ].map((pref) => (
            <label
              key={pref.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="contactPreference"
                value={pref.value}
                checked={formData.contactPreference === pref.value}
                onChange={handleChange}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
              />
              <Icon name={pref.icon as any} size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">{pref.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-heading font-semibold text-text-primary mb-2">
          {getTranslation(language, 'contact.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-input border ${
            errors.message ? 'border-error' : 'border-border'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none`}
          placeholder="Describa su proyecto, necesidades específicas y cualquier información relevante que nos ayude a entender mejor sus requerimientos..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            {errors.message}
          </p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Mínimo 20 caracteres
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-text-secondary">
          <span className="text-error">*</span> Campos obligatorios
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-cta text-white font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {isSubmitting ? getTranslation(language, 'contact.sending') : getTranslation(language, 'contact.submit')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;