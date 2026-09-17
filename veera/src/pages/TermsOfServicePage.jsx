import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { ShieldCheck, Scale, FileText, ChevronRight } from 'lucide-react';

const sections = [
  {
    id: 'general',
    title: '1. General Conditions',
    content: [
      'By accessing or using any part of the VEERABADHRA ENTERPRISE website, you agree to be bound by these Terms of Service.',
      'We reserve the right to refuse service to anyone for any reason at any time.',
      'You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of our spiritual products or website content without express written permission.',
    ],
  },
  {
    id: 'products',
    title: '2. Sacred Products & Availability',
    content: [
      'Certain pooja essentials or idols may be available exclusively online through our website. These products may have limited quantities and are subject to our strict No-Return Policy.',
      'We have made every effort to display the colors and images of our products (brass, panchaloha, etc.) accurately. We cannot guarantee that your monitor\'s display of any color will be perfectly accurate.',
      'We reserve the right to limit the quantities of any products or services that we offer, especially during peak festival seasons.',
    ],
  },
  {
    id: 'pricing',
    title: '3. Pricing & Modifications',
    content: [
      'Prices for our pooja items and spiritual essentials are subject to change without notice.',
      'We reserve the right at any time to modify or discontinue any product (or any part or content thereof) without notice at any time.',
      'We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of a product.',
    ],
  },
  {
    id: 'billing',
    title: '4. Accuracy of Billing',
    content: [
      'We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.',
      'You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.',
    ],
  },
];

export function TermsOfServicePage() {
  return (
    <div className="bg-[#FDF7E5] min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Terms of Service" />

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
            <p className="font-bold tracking-widest uppercase text-xs mb-4 text-[#D4AF37]">Legal</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-md">
              Terms of<br className="hidden md:block" /> Service
            </h1>
            <div className="w-24 h-1.5 rounded-full mb-6 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
              Please read these Terms of Service carefully before accessing or using our website and purchasing our pooja essentials.
            </p>
            <p className="text-white/40 text-xs mt-6 uppercase tracking-wider">Last updated: Sept 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 md:px-24 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p className="text-[15px] leading-relaxed mb-10 bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm">
                This website is operated by VEERABADHRA ENTERPRISE. Throughout the site, the terms "we", "us" and "our" refer to VEERABADHRA ENTERPRISE. We offer this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
            </motion.div>

            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#D4AF37]/30 rounded-[32px] p-8 md:p-10 shadow-xl overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
                
                <h2 className="text-2xl font-serif font-bold text-[#073020] mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                  {section.title}
                </h2>

                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <ChevronRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
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
                <Scale className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Governing Law</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.
                </p>
              </div>

              <div className="bg-white border border-[#D4AF37]/20 rounded-[24px] p-8 shadow-xl">
                <ShieldCheck className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-xl font-serif font-bold text-[#073020] mb-4">Questions about Terms?</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                  If you have any questions regarding these Terms of Service, please contact us.
                </p>
                <div className="space-y-3">
                  <a href="mailto:nravi1602@gmail.com" className="flex items-center gap-3 text-sm font-bold text-[#073020] hover:text-[#D4AF37] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FDF7E5] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    nravi1602@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
