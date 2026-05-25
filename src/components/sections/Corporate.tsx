import { useState } from 'react';
import { motion } from 'motion/react';
import FadeImage from '../ui/FadeImage';
import { toast } from 'sonner';

export default function Corporate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};
    let hasError = false;

    ['firstName', 'lastName', 'companyName', 'email', 'details'].forEach((field) => {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      if (!input.value.trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      toast.success('Corporate inquiry submitted successfully. Our team will contact you shortly.', {
        style: {
          background: '#111',
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.1)'
        }
      });
      
      form.reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const getBorderColor = (field: string) => errors[field] ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-lush-yellow';

  return (
    <section id="corporate" className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-6 text-white leading-tight">
              Corporate &amp; Event Mobility.
            </h2>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-8">
              Seamless, managed ground transportation for luxury hotels, premium event planners, and corporate executives visiting Lagos. Consolidate your VIP movements through a single, uncompromising point of contact.
            </p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow/50 mt-2.5 mr-4" />
                <span className="text-muted-2 font-light">Dedicated Account Management</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow/50 mt-2.5 mr-4" />
                <span className="text-muted-2 font-light">Monthly Invoicing & Custom Reporting</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow/50 mt-2.5 mr-4" />
                <span className="text-muted-2 font-light">Priority Fleet Allocation</span>
              </li>
            </ul>

            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-sm group mt-12 bg-[#0A0A0A]">
              <FadeImage 
                src="/Range interior.jpg"
                alt="Corporate Mobility"
                wrapperClassName="absolute inset-0 z-0"
                className="w-full h-full object-cover animate-kenburns opacity-80 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            </div>
          </motion.div>

          {/* Corporate Inquiry Form */}
          <motion.div 
            className="bg-charcoal border border-white/10 p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-display text-white mb-2">Corporate Inquiry</h3>
            <p className="text-sm text-muted-1 mb-8 font-light">Our dedicated team will respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['firstName'] ? 'text-red-500' : 'text-muted-1'}`}>First Name</label>
                  <input name="firstName" type="text" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('firstName')}`} onChange={() => setErrors(e => ({...e, firstName: false}))} />
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['lastName'] ? 'text-red-500' : 'text-muted-1'}`}>Last Name</label>
                  <input name="lastName" type="text" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('lastName')}`} onChange={() => setErrors(e => ({...e, lastName: false}))} />
                </div>
              </div>
              <div>
                <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['companyName'] ? 'text-red-500' : 'text-muted-1'}`}>Company Name</label>
                <input name="companyName" type="text" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('companyName')}`} onChange={() => setErrors(e => ({...e, companyName: false}))} />
              </div>
              <div>
                <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['email'] ? 'text-red-500' : 'text-muted-1'}`}>Corporate Email</label>
                <input name="email" type="email" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('email')}`} onChange={() => setErrors(e => ({...e, email: false}))} />
              </div>
              <div>
                <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['details'] ? 'text-red-500' : 'text-muted-1'}`}>Projected Monthly Volume / Request Details</label>
                <textarea name="details" rows={3} className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors resize-none ${getBorderColor('details')}`} onChange={() => setErrors(e => ({...e, details: false}))}></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || success}
                className="w-full py-4 bg-lush-yellow text-charcoal text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : success ? 'Inquiry Received' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
