import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function CountUp({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const WHATSAPP_NUMBER = '919985349912';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.subject.trim()) e.subject = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*New Message from VEERABADHRA ENTERPRISE Website*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email || 'Not provided')}%0A*Subject:* ${encodeURIComponent(form.subject)}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  const inputClass = (key) =>
    `w-full px-4 py-3 rounded-xl border bg-brand-beige focus:outline-none focus:ring-2 transition-shadow text-gray-900 placeholder:text-gray-900/30 ${
      errors[key] ? 'border-red-400 focus:ring-red-300' : 'border-brand-green/10 focus:ring-brand-gold/40'
    }`;

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">WhatsApp Opened!</h3>
      <p className="text-gray-900/60 text-sm">Your message has been pre-filled in WhatsApp. Just hit send!</p>
      <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
        className="text-sm font-bold text-brand-green underline mt-2">Send another message</button>
    </div>
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name *</label>
        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className={inputClass('name')} placeholder="Your Name" />
        {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email Address <span className="text-gray-900/40 font-normal">(optional)</span></label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={inputClass('email')} placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Subject *</label>
        <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className={inputClass('subject')} placeholder="How can we help?" />
        {errors.subject && <p className="text-xs text-red-500 mt-1">Subject is required</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Message *</label>
        <textarea rows="4" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={inputClass('message') + ' resize-none'} placeholder="Write your message here..." />
        {errors.message && <p className="text-xs text-red-500 mt-1">Message is required</p>}
      </div>
      <motion.button type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white text-brand-green font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all mt-2"
      >
        Send via WhatsApp
        <Send className="w-5 h-5" />
      </motion.button>
    </form>
  );
}

export function ContactPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#faq-section') {
      // Delay to ensure the DOM is fully rendered before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById('faq-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Contact Us" />

      {/* Hero Banner */}
      <div className="px-4 md:px-24 pt-12 md:pt-16 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-brand-gold font-bold tracking-widest uppercase text-xs md:text-sm mb-3">Customer Support</h4>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
            We’re here for your spiritual journey
          </h1>
          <div className="w-20 h-1.5 bg-brand-gold text-white rounded-full mb-6"></div>
          <p className="text-gray-900/70 max-w-2xl text-base md:text-lg leading-relaxed">
            Need help with your daily pooja essentials, custom idol orders, or bulk purchases for festivals? Our dedicated team is always ready to assist you.
          </p>
        </motion.div>
      </div>

      {/* Contact Cards + Form */}
      <div className="px-4 md:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 h-full"
          >
            {/* Location */}
            <div className="bg-white border border-brand-green/10 rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Store Location</h3>
                <p className="text-gray-900/80 text-[15px] font-medium leading-relaxed">H.no 24-425 ranga reddy nagar idpl colony.</p>
                <p className="text-brand-green/70 text-xs mt-1 font-bold">GST: 36AMBPN0939Q2ZJ</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white border border-brand-green/10 rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Call & WhatsApp</h3>
                <p className="text-gray-900/80 text-[15px] font-bold">+91 99853 49912</p>
                <p className="text-gray-900/50 text-xs mt-1">Available 24/7 for spiritual assistance</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-brand-green/10 rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email Support</h3>
                <p className="text-gray-900/80 text-[15px] font-bold">nravi1602@gmail.com</p>
                <p className="text-gray-900/50 text-xs mt-1">We usually reply within a few hours</p>
              </div>
            </div>

            {/* Social Links - flex-grow so it fills remaining height */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-brand-green text-lg mb-4">Follow Our Store</h3>
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/nandimalla.ravikumar?utm_source=qr&stkn=YmxsMmZtaXloYzV2" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-brand-green/20 flex items-center justify-center text-brand-green shadow-sm hover:scale-105 hover:shadow-md transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://youtube.com/@ravikumar-dr3rg?si=OmoxV34P9zY68r4Q" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-brand-green/20 flex items-center justify-center text-brand-green shadow-sm hover:scale-105 hover:shadow-md transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* <a href="https://www.facebook.com/share/17AsQdiXcc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-brand-green/20 flex items-center justify-center text-brand-green shadow-sm hover:scale-105 hover:shadow-md transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a> */}
                  <a href='https://wa.me/919985349912' target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-brand-green/20 flex items-center justify-center text-brand-green shadow-sm hover:scale-105 hover:shadow-md transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
              <p className="text-gray-700 text-xs mt-6">Connect with us for fresh deals and store updates 🌿</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-brand-green/10 rounded-[24px] shadow-lg p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold to-brand-dark-blue rounded-t-[24px]"></div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-900/60 text-sm mb-8">Fill in the form and we'll get back to you shortly.</p>

<ContactForm />
          </motion.div>

        </div>
      </div>

      {/* WhatsApp Quick Contact Banner */}
      <div className="px-4 md:px-24 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-green rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-brand-gold/30 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2c5.506 0 9.987 4.478 9.987 9.981 0 2.654-.959 5.093-2.607 6.945l1.096 4.382-4.502-1.18c-1.222.56-2.559.872-3.974.872-5.506 0-9.987-4.478-9.987-9.981C2.025 6.478 6.506 2 12.012 2zm0 18.252c1.3 0 2.535-.333 3.619-.912l.261-.138 2.656.696-.643-2.571.156-.251c.677-1.096 1.054-2.366 1.054-3.714 0-4.52-3.673-8.193-8.19-8.193-4.516 0-8.188 3.673-8.188 8.193 0 4.52 3.672 8.193 8.188 8.193zm4.568-5.696c-.25-.125-1.479-.73-1.708-.813-.229-.084-.396-.125-.563.125-.167.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.008-1.238-.742-.662-1.242-1.48-1.388-1.73-.146-.25-.015-.385.11-.51.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.355-.771-1.855-.203-.487-.41-.421-.563-.429-.146-.007-.313-.007-.479-.007-.167 0-.438.063-.667.313-.229.25-.875.855-.875 2.085 0 1.23.896 2.42 1.021 2.587.125.167 1.761 2.688 4.264 3.769.596.257 1.061.411 1.424.526.598.19 1.141.163 1.57.099.479-.071 1.479-.604 1.688-1.188.208-.584.208-1.084.146-1.188-.063-.104-.229-.167-.479-.292z"/></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-gold mb-2">Need immediate assistance?</h2>
              <p className="text-brand-cream/90 text-sm leading-relaxed max-w-lg">
                For urgent pooja queries, bulk orders, or fast support, reach out to us directly on WhatsApp. We typically reply within minutes.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/918886000847"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-brand-green font-bold py-4 px-8 rounded-xl hover:scale-105 hover:shadow-2xl transition-all text-sm md:text-base"
          >
            Message on WhatsApp →
          </a>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div id="faq-section" className="bg-[#FDF7E5] py-20 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#073020]/5 rounded-full blur-3xl"></div>
        
        <div className="px-4 md:px-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#073020] mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { q: 'Are your idols made of pure materials?', a: 'Yes, our idols are crafted from authentic brass, panchaloha, and pure silver. We guarantee the highest purity and craftsmanship for your sacred space.' },
              { q: 'Do you deliver delicate pooja items safely?', a: 'Absolutely. All delicate items like idols, glass diyas, and thalis are carefully bubble-wrapped and securely packaged in robust boxes to prevent any transit damage.' },
              { q: 'Is your camphor 100% pure?', a: 'Yes, we source 100% pure, unadulterated camphor that burns completely without leaving any harmful black residue, perfect for your daily aarti.' },
              { q: 'Can I order bulk pooja kits for festivals or weddings?', a: 'Yes, we specialize in bulk orders for Navratri, Diwali, weddings, and other ceremonies. Please contact us on WhatsApp with your specific requirements.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, digital wallets, and cash on delivery for eligible local regions.' },
              { q: 'How long does delivery take?', a: 'Local deliveries are typically fulfilled within 24-48 hours. Nationwide shipping may take 3-5 business days depending on your exact location.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/60 backdrop-blur-sm border border-[#D4AF37]/20 rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#073020] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <span className="text-[#D4AF37] text-sm font-bold font-serif">Q</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                    <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="px-4 md:px-24 py-16 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { end: 500, suffix: '+', label: 'Devoted Customers' },
            { end: 24, suffix: 'hr', label: 'Response Time' },
            { end: 100, suffix: '%', label: 'Pure Materials' },
            { end: 7, suffix: ' Days', label: 'Easy Returns' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#073020] border border-[#D4AF37]/30 rounded-[24px] p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] mb-3 drop-shadow-md">
                <CountUp end={stat.end} suffix={stat.suffix} duration={1600 + i * 200} />
              </p>
              <p className="text-white/90 text-[15px] font-bold tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
