import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

const sections = [
  {
    id: 'info-collection',
    icon: <Eye className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Information We Collect',
    content: [
      'When you purchase a pooja item from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.',
      'When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.',
      'With your permission, we may send you emails about our store, new sacred idols, festival special offers, and other updates.',
    ],
  },
  {
    id: 'consent',
    icon: <CheckCircle className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Consent',
    content: [
      'How do you get my consent? When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.',
      'If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.',
      'How do I withdraw my consent? If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at nravi1602@gmail.com.',
    ],
  },
  {
    id: 'disclosure',
    icon: <Shield className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Disclosure',
    content: [
      'We respect your privacy. We may disclose your personal information only if we are required by law to do so or if you violate our Terms of Service.',
      'We do not sell, rent, or trade your personal information to any third-party marketing companies.',
    ],
  },
  {
    id: 'security',
    icon: <Lock className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Security',
    content: [
      'To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.',
      'If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL). Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.',
    ],
  },
];

export function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FDF7E5] min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Privacy Policy" />

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
              Privacy<br className="hidden md:block" /> Policy
            </h1>
            <div className="w-24 h-1.5 rounded-full mb-6 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
              Your trust is sacred to us. Learn how VEERABADHRA ENTERPRISE carefully protects and respects your personal data.
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
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from VEERABADHRA ENTERPRISE.
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                
                <h2 className="text-2xl font-serif font-bold text-[#073020] mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#073020] flex items-center justify-center shrink-0 shadow-md">
                    {section.icon}
                  </div>
                  {section.title}
                </h2>

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
                <Lock className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white mb-3">100% Secure Checkout</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  We use state-of-the-art SSL encryption to ensure your payment and personal data are fully protected when ordering our sacred products.
                </p>
              </div>

              <div className="bg-white border border-[#D4AF37]/20 rounded-[24px] p-8 shadow-xl">
                <h3 className="text-xl font-serif font-bold text-[#073020] mb-4">Privacy Concerns?</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                  If you would like to access, correct, amend or delete any personal information we have about you, contact our Privacy Compliance Officer.
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
