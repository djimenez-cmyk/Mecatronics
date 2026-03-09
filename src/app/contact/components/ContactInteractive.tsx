'use client';

import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';
import FAQSection from './FAQSection';

const ContactInteractive: React.FC = () => {
  return (
    <>
      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div id="contact-form">
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8 shadow-brand">
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-6">
                  Solicite una Consulta
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationMap />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
    </>
  );
};

export default ContactInteractive;