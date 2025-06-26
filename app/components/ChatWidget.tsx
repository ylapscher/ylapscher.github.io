'use client';

import { useState, FormEvent } from 'react';
import { ChatBubbleOvalLeftIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const FORM_ENDPOINT = "https://formspree.io/f/xwpkjbzj";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!regex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      return;
    }
    
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setIsOpen(false);
          setFormStatus('idle');
        }, 2000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors`}
      >
        <ChatBubbleOvalLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window */}
      <div className={`${
        isOpen ? 'flex' : 'hidden'
      } flex-col absolute bottom-0 right-0 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[450px] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Get in Touch!</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-3">
          <form 
            action={FORM_ENDPOINT} 
            method="POST" 
            onSubmit={handleSubmit} 
            className="space-y-3"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="_replyto"
                required
                className={`w-full px-3 py-2 rounded border ${
                  emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            
            {formStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center">
                Thanks for reaching out!
              </p>
            )}
            
            {formStatus === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 