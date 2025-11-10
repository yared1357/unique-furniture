// src/components/Contact.tsx
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/submit_contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0'
        },
        body: JSON.stringify(formData)
      });

      const text = await res.text();
      let result;
      try { result = JSON.parse(text); } catch { throw new Error('Invalid response'); }

      if (res.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setError(result.message || 'Failed to send');
      }
    } catch (err: any) {
      setError('Network error. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const fade = setTimeout(() => setIsFading(true), 2500);
      const hide = setTimeout(() => { setIsSubmitted(false); setIsFading(false); }, 3000);
      return () => { clearTimeout(fade); clearTimeout(hide); };
    }
  }, [isSubmitted]);

  const contactInfo = [
    { icon: MapPin, title: 'Address', info: 'Bole, Addis Ababa' },
    { icon: Phone, title: 'Phone', info: '+251 00 000 000' },
    { icon: Mail, title: 'Email', info: 'info@uniquefurniture.com' },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-300">{item.info}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" alt="Ceiling" className="w-full h-64 object-cover" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {isSubmitted ? (
              <div className={`text-center py-12 transition-all duration-500 ${isFading ? 'opacity-0 translate-y-[-10px]' : 'opacity-100'}`}
                style={{ animation: isFading ? 'fadeOut 0.5s ease-out forwards' : 'none' }}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Thank you for contacting us!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} placeholder="Full Name *" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} placeholder="Email *" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} placeholder="Phone" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                  <select name="service" value={formData.service} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                    <option value="">Select service</option>
                    <option>Custom Design</option>
                    <option>Installation</option>
                    <option>Lighting</option>
                    <option>Acoustic</option>
                  </select>
                </div>

                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} required disabled={isSubmitting} placeholder="Message *" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none" />

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-3 disabled:opacity-70">
                  {isSubmitting ? (
                    <> <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> <span>Sending...</span> </>
                  ) : (
                    <> <Send className="w-5 h-5" /> <span>Send Message</span> </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Contact;