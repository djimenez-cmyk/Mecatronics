'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SuccessModalProps {
  isOpen: boolean;
  documentTitle: string;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, documentTitle, onClose }: SuccessModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isOpen && isHydrated) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, isHydrated, onClose]);

  if (!isHydrated || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-brand-lg max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={40} className="text-success" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Download Started!
        </h2>

        {/* Message */}
        <p className="text-text-secondary mb-6">
          Your download of <span className="font-heading font-semibold text-text-primary">{documentTitle}</span> has started. Check your downloads folder.
        </p>

        {/* Additional Info */}
        <div className="bg-muted rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-heading font-bold text-text-primary mb-2 flex items-center space-x-2">
            <Icon name="InformationCircleIcon" size={18} />
            <span>What's Next?</span>
          </h3>
          <ul className="text-sm text-text-secondary space-y-2">
            <li className="flex items-start space-x-2">
              <Icon name="CheckIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Check your email for additional resources</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="CheckIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Our team will contact you within 24 hours</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="CheckIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Explore more technical resources</span>
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-heading font-semibold hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;