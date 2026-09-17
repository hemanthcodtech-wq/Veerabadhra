import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Truck, Clock, MapPin, Package, ShieldCheck, ChevronDown } from 'lucide-react';

const sections = [
  {
    id: 'processing',
    icon: <Clock className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Processing Time',
    badge: '1–3 Business Days',
    badgeColor: 'bg-[#D4AF37]/20 text-[#073020]',
    content: [
      'All pooja essentials and idols are carefully processed and prepared within 1–3 business days.',
      'You will receive an order confirmation email immediately after placing your order.',
      'A shipping confirmation with your tracking number is sent once your sacred items have been dispatched.',
      'Bulk orders for festivals or weddings may require an additional 1-2 days of processing time.',
    ],
  },
  {
    id: 'delivery',
    icon: <Truck className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Delivery Timeline',
    badge: '3–7 Business Days',
    badgeColor: 'bg-[#D4AF37]/20 text-[#073020]',
    content: [
      'Standard delivery takes 3–7 business days after dispatch, depending on your location within India.',
      'Remote or rural areas may require an additional 1–3 business days.',
      'We take extra care during transit for delicate items like brass idols, glass diyas, and camphor.',
      'Delivery timelines may slightly vary during peak festival seasons (e.g., Diwali, Navratri).',
    ],
  },
  {
    id: 'coverage',
    icon: <MapPin className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Shipping Coverage',
    badge: 'Pan India + Select International',
    badgeColor: 'bg-[#D4AF37]/20 text-[#073020]',
    content: [
      'We ship sacred pooja items to all pin codes across India through our trusted logistics partners.',
      'International shipping is available for idols and select non-flammable items. Please contact us before placing international orders.',
      'For international orders, customs duties or import taxes may apply depending on your country.',
      'Contact us at nravi1602@gmail.com or WhatsApp +91 9985349912 for specific international shipping rates.',
    ],
  },
  {
    id: 'packaging',
    icon: <Package className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Secure & Pure Packaging',
    badge: 'Fragile-Safe',
    badgeColor: 'bg-[#D4AF37]/20 text-[#073020]',
    content: [
      'We understand the sanctity of your purchase. All items are handled with strict hygiene protocols.',
      'Delicate idols, mud diyas, and glass items are heavily bubble-wrapped and placed in robust corrugated boxes.',
      'Aromatic items (incense, camphor) are sealed separately to preserve their pure fragrance.',
      'Every package is sealed securely to ensure it arrives at your doorstep in pristine condition.',
    ],
  },
];

const faqs = [
  {
    q: 'How are delicate idols and diyas shipped?',
    a: 'We use premium, impact-resistant packaging materials. Each idol is individually wrapped in multiple layers of protective bubble wrap, and fragile items are boxed securely to prevent any movement during transit.',
  },
  {
    q: 'How can I track my shipment?',
    a: 'Once your order is dispatched, you will receive an email and SMS with the tracking link and courier details. You can also track the order status directly from your "My Account" page.',
  },
  {
    q: 'What should I do if my package is delayed?',
    a: 'While we aim for timely delivery, unforeseen logistics delays can happen. If your package is delayed beyond the estimated delivery date, please reach out to our support team on WhatsApp (+91 9985349912) and we will escalate it with our courier partner.',
  },
  {
    q: 'Are there any hidden shipping fees?',
    a: 'No, all shipping charges are calculated transparently at checkout based on the weight of your items (especially heavy brass idols) and your delivery location.',
  },
  {
    q: 'Can I change my delivery address after placing an order?',
    a: 'Address changes are only possible within 12 hours of placing the order, provided the package has not yet been dispatched. Please contact us immediately on WhatsApp to request a change.',
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-[#D4AF37]/50 shadow-md' : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/40'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 bg-white text-left outline-none">
        <span className="font-serif font-bold text-[#073020] text-lg md:text-xl">{faq.q}</span>
        <ChevronDown className={`w-6 h-6 text-[#D4AF37] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-[#FDF7E5]/50"
      >
        <p className="px-5 py-5 text-[15px] text-gray-700 leading-relaxed border-t border-[#D4AF37]/20">{faq.a}</p>
      </motion.div>
    </div>
  );
}

export function ShippingPolicyPage() {
  return (
    <div className="bg-[#FDF7E5] min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Shipping Policy" />

      {/* Hero */}
      <div className="bg-[#073020] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="px-4 md:px-24 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-bold tracking-widest uppercase text-xs mb-4 text-[#D4AF37]">Policy Info</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-md">
              Shipping &<br className="hidden md:block" /> Delivery
            </h1>
            <div className="w-24 h-1.5 rounded-full mb-6 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
              We handle every idol and pooja essential with the utmost reverence. Learn how we securely package and deliver your sacred items directly to your doorstep.
            </p>
            <p className="text-white/40 text-xs mt-6 uppercase tracking-wider">Last updated: Sept 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 md:px-24 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#D4AF37]/30 rounded-[32px] p-8 md:p-10 shadow-xl overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#073020] flex items-center justify-center shrink-0 shadow-md">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#073020]">{section.title}</h2>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>

                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2"></div>
                      <p className="text-gray-600 text-[15px] leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-24 space-y-6"
            >
              <div className="bg-[#073020] rounded-[24px] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <ShieldCheck className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Safe Delivery Promise</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  We guarantee that your sacred items will arrive safely. If your delicate pooja items are damaged during transit, we will replace them at no extra cost (unboxing video required).
                </p>
              </div>

              <div className="bg-white border border-[#D4AF37]/20 rounded-[24px] p-8 shadow-xl">
                <h3 className="text-xl font-serif font-bold text-[#073020] mb-4">Need Help with Delivery?</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                  Have a question about an upcoming bulk delivery for a festival? Our team is available 24/7.
                </p>
                <div className="space-y-3">
                  <a href="mailto:nravi1602@gmail.com" className="flex items-center gap-3 text-sm font-bold text-[#073020] hover:text-[#D4AF37] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FDF7E5] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    nravi1602@gmail.com
                  </a>
                  <a href="https://wa.me/919985349912" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold text-[#073020] hover:text-[#D4AF37] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FDF7E5] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    +91 99853 49912
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 md:px-24 py-20 mt-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#073020] mb-4">Shipping FAQs</h2>
            <div className="w-20 h-1.5 bg-[#D4AF37] mx-auto rounded-full shadow-md"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
