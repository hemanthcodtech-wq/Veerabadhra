import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { XCircle, Package, AlertTriangle, Video, Clock, ChevronDown, ShieldCheck } from 'lucide-react';

const claimSteps = [
  {
    num: '01',
    title: 'Record an Unboxing Video',
    desc: 'Before opening your package, start recording a clear, uninterrupted video. The video must show the sealed package, the unboxing process, and the condition of delicate pooja items inside.',
  },
  {
    num: '02',
    title: 'Report Within 7 Days',
    desc: 'Contact us within 7 days of delivery via WhatsApp (+91 9985349912) or email (nravi1602@gmail.com). Include your order number, a description of the issue, and attach the unboxing video as proof.',
  },
  {
    num: '03',
    title: 'We Review Your Claim',
    desc: 'Our spiritual care team will review the submitted proof within 24–48 hours and confirm whether your claim is approved. Claims without a valid unboxing video cannot be processed.',
  },
  {
    num: '04',
    title: 'Resolution',
    desc: 'For shipping damage to idols or diyas: the replacement item will be sent in the next shipment at no extra cost. For missing items: we will refund the item amount, issue a store coupon, or ship the missing item.',
  },
];

const faqs = [
  {
    q: 'Do you accept returns or exchanges for pooja items?',
    a: 'No. To maintain spiritual purity and hygiene, all sales of idols, camphor, and pooja essentials are final. We do not accept returns or exchanges for any reason. Please review your order carefully before placing it.',
  },
  {
    q: 'What if my brass idol or glass item arrived damaged?',
    a: 'If your item was damaged during shipping, we will replace it in the next shipment at no cost to you. You must provide an unboxing video as proof and report the issue within 7 days of delivery.',
  },
  {
    q: 'What if an item is missing from my pooja kit?',
    a: 'If an item is missing, we will either refund the amount for that item, issue a store coupon of equivalent value, or ship the missing item in the next shipment. You must provide an unboxing video showing the incomplete order and report within 7 days.',
  },
  {
    q: 'Why is an unboxing video required?',
    a: 'Because pooja items can be fragile, an unboxing video is the only way to verify the condition of the package at the time of delivery and confirm that items were missing or damaged in transit.',
  },
  {
    q: 'What if I did not record an unboxing video?',
    a: 'Unfortunately, without an unboxing video we cannot process damage or missing item claims for delicate items. We strongly recommend recording a video every time you receive a package from us.',
  },
  {
    q: 'How long do I have to report an issue?',
    a: 'All issues — shipping damage or missing items — must be reported within 7 days of the delivery date. Claims submitted after this window cannot be accepted.',
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

export function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FDF7E5] min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Returns & Exchanges" />

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
              Returns &<br className="hidden md:block" /> Exchanges
            </h1>
            <div className="w-24 h-1.5 rounded-full mb-6 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
              To ensure spiritual purity, all sales are final. However, we take full responsibility for shipping damage to delicate pooja items and missing products — with proper proof, we'll make it right.
            </p>
            <p className="text-white/40 text-xs mt-6 uppercase tracking-wider">Last updated: Sept 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 md:px-24 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif font-bold text-[#073020] mb-6">Our Strict No-Return Policy</h2>
              <div className="bg-white border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 shadow-xl mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#073020] text-xl mb-2">All Sales Are Final</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Due to the sacred and delicate nature of our pooja items (including brass idols, panchaloha, camphor, and textiles), we do not accept returns, exchanges, or cancellations once an order has been shipped.
                    </p>
                  </div>
                </div>
                <div className="bg-[#FDF7E5] rounded-xl p-5 border border-[#D4AF37]/20 flex gap-4">
                  <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <p className="text-sm text-[#073020] font-medium leading-relaxed">
                    Please double-check sizes, materials, and quantities of idols and pooja kits before placing your order. We cannot make exceptions for change of mind.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-[#073020] mb-6">Exceptions: Damage or Missing Items</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-[15px]">
                We meticulously pack all delicate items to ensure they reach you safely. However, if an item arrives damaged or is missing from your package, we will resolve it promptly, provided you follow our strict claims process.
              </p>

              <div className="bg-white border border-[#D4AF37]/30 rounded-[32px] p-6 md:p-10 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
                <h3 className="text-2xl font-serif font-bold text-[#073020] mb-8 flex items-center gap-3">
                  <Video className="w-7 h-7 text-[#D4AF37]" />
                  The Claims Process
                </h3>

                <div className="space-y-8 relative">
                  <div className="absolute top-6 bottom-6 left-[19px] w-0.5 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                  {claimSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      <div className="w-10 h-10 rounded-full bg-[#073020] text-[#D4AF37] border-4 border-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md relative z-10">
                        {step.num}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-[#073020] text-lg mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-[15px] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                <Clock className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white mb-3">7-Day Window</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  You have exactly 7 days from the delivery date to report any issues with your pooja items. Claims submitted on day 8 or later will automatically be rejected.
                </p>
              </div>

              <div className="bg-white border border-[#D4AF37]/20 rounded-[24px] p-8 shadow-xl">
                <ShieldCheck className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold text-[#073020] mb-3">Spiritual Purity Guarantee</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Our no-return policy ensures that every sacred item you purchase is 100% brand new, pure, and untouched by previous customers, maintaining its spiritual sanctity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 md:px-24 py-20 mt-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#073020] mb-4">Common Questions</h2>
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
