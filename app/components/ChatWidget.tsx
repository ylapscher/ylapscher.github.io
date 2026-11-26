'use client';

import { useEffect, useState, FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FORMSPREE_ENDPOINT } from '../lib/site';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const FORM_ENDPOINT = FORMSPREE_ENDPOINT;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // On the home page the button would sit on top of the hero portrait (on
  // phones especially), so it waits until the visitor has scrolled past it.
  const pathname = usePathname();
  const deferUntilScrolled = pathname === '/';
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  useEffect(() => {
    if (!deferUntilScrolled) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [deferUntilScrolled]);
  const showButton = !isOpen && (!deferUntilScrolled || scrolledPastHero);
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
        aria-label={isOpen ? 'Close contact form' : 'Open contact form'}
        aria-expanded={isOpen}
        tabIndex={showButton ? 0 : -1}
        className={`${isOpen ? 'hidden' : 'flex'} ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        } items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-signal text-signal-ink ring-1 ring-ink/20
          hover:brightness-110 transition duration-300 focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-signal`}
      >
        <ChatBubbleOvalLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window */}
      <div className={`${
        isOpen ? 'flex' : 'hidden'
      } flex-col absolute bottom-0 right-0 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[450px] max-h-[500px] bg-paper border border-rule-hi shadow-[6px_6px_0_0_var(--rule)]`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-rule">
          <h3 className="text-lg font-semibold">Send a note</h3>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close contact form"
            className="p-1 text-muted hover:text-signal transition-colors"
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
                className="w-full px-3 py-2 border border-rule-hi bg-paper focus:ring-2 focus:ring-signal outline-none transition-shadow"
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
                  emailError ? 'border-red-500' : 'border-rule-hi'
                } bg-paper focus:ring-2 focus:ring-signal outline-none transition-shadow`}
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
                className="w-full px-3 py-2 border border-rule-hi bg-paper focus:ring-2 focus:ring-signal outline-none transition-shadow resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full bg-signal text-white font-semibold py-2 px-4 rounded hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
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