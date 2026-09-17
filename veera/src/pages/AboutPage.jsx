import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Flame,
} from 'lucide-react';
import { Header } from '../components/Header';
import logo from '../assets/logo.png';
import heroImg from '../assets/story_temple.png';

const ABOUT_STEPS = [
  {
    id: 'source',
    label: '01 / PURITY',
    title: 'Sourced with Devotion',
    description:
      'We partner with trusted artisans and sacred regions to bring you the purest elements for your daily rituals.',
  },
  {
    id: 'stock',
    label: '02 / TRADITION',
    title: 'Rooted in Heritage',
    description:
      'From authentic panchaloha idols to pure camphor, every item in our collection is curated to uphold ancient traditions.',
  },
  {
    id: 'handoff',
    label: '03 / SERVICE',
    title: 'Delivered to Your Doorstep',
    description:
      'Experience the convenience of having your spiritual essentials delivered promptly, ensuring your daily pooja is never interrupted.',
  },
];

const ABOUT_AISLES = [
  {
    id: 'idols',
    title: 'Divine Idols & Murties',
    subtitle: 'Crafted with reverence.',
    description: 'Exquisite brass, silver, and panchaloha idols that bring divine presence into your home.',
  },
  {
    id: 'essentials',
    title: 'Daily Pooja Essentials',
    subtitle: 'Purity for your daily prayers.',
    description:
      'High-quality camphor, pure cow ghee, cotton wicks, and sacred threads for your everyday rituals.',
  },
  {
    id: 'fragrance',
    title: 'Sacred Fragrances',
    subtitle: 'Elevate your spiritual aura.',
    description:
      'Premium agarbatti, dhoop sticks, and natural sambrani that create a serene and meditative atmosphere.',
  },
];

function StepList({ steps }) {
  return (
    <div className="relative mt-12 md:mt-16">
      <div
        aria-hidden="true"
        className="absolute bottom-7 left-[11px] top-3 w-px bg-gradient-to-b from-[#D4AF37] to-transparent"
      />
      <div className="space-y-10">
        {steps.map((step) => (
          <article key={step.id} className="relative pl-12 transition-transform hover:-translate-y-1 duration-300">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[4px] border-[#FDF7E5] bg-[#073020] shadow-md"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              {step.label}
            </p>
            <h3 className="mt-2 font-serif text-[24px] md:text-[28px] font-bold text-[#073020]">
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-xl text-[14px] md:text-[15px] leading-[1.7] text-gray-700">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function AisleAccordion({ items, defaultOpenId }) {
  const [openIds, setOpenIds] = useState(() => new Set([defaultOpenId]));

  const toggleAisle = (id) => {
    setOpenIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }
      return nextIds;
    });
  };

  return (
    <div className="mt-10 border border-[#D4AF37]/30 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm shadow-xl">
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `aisle-trigger-${item.id}`;
        const panelId = `aisle-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`transition-colors duration-300 ${index < items.length - 1 ? 'border-b border-[#D4AF37]/20' : ''} ${isOpen ? 'bg-[#FDF7E5]/50' : 'hover:bg-white'}`}
          >
            <button
              id={triggerId}
              type="button"
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => toggleAisle(item.id)}
              className="flex w-full items-center gap-4 px-6 py-5 text-left outline-none"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors ${
                  isOpen
                    ? 'bg-[#073020] text-[#D4AF37] shadow-md'
                    : 'bg-[#D4AF37]/10 text-[#073020]'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-[17px] md:text-[19px] font-serif font-bold transition-colors ${
                    isOpen ? 'text-[#073020]' : 'text-gray-800'
                  }`}
                >
                  {item.title}
                </span>
                <span className="mt-1 block text-[12px] md:text-[13px] text-gray-500 font-medium tracking-wide">
                  {item.subtitle}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-[#D4AF37] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pl-[72px] pr-6">
                  <p className="border-l-2 border-[#D4AF37] pl-4 text-[14px] md:text-[15px] leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AboutPage() {
  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#FDF7E5] pb-[calc(10rem+env(safe-area-inset-bottom))] text-[#073020] antialiased"
    >
      <Header title="Our Story" />

      <main className="mx-auto w-full max-w-[1200px] pt-[76px] lg:pt-[84px]">
        {/* HERO SECTION */}
        <section aria-labelledby="about-heading" className="relative px-4 md:px-8 mt-6">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-[2rem] shadow-2xl group">
            <img
              src={heroImg}
              alt="Sacred Temple Architecture"
              className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#073020] via-[#073020]/60 to-transparent opacity-95" />

            {/* Logo area */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
              <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-2xl bg-white border-2 border-[#D4AF37] p-3 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <img
                  src={logo}
                  alt="VEERABADHRA ENTERPRISE logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.3em] text-white drop-shadow-md">
                EST. 2024
              </p>
            </div>

            {/* Text and Button area */}
            <div className="absolute inset-x-4 bottom-8 md:inset-x-10 md:bottom-12 flex flex-col z-10">
              <div className="max-w-[700px]">
                <p className="mb-3 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] drop-shadow-md">
                  OUR JOURNEY
                </p>
                <h1
                  id="about-heading"
                  className="font-serif text-[36px] md:text-[50px] lg:text-[60px] font-bold leading-[1.1] text-white drop-shadow-xl"
                >
                  Elevating your daily devotion.
                </h1>
                <p className="mt-5 text-[15px] md:text-[17px] leading-[1.6] text-gray-200 font-medium drop-shadow-md max-w-2xl">
                  At VEERABADHRA ENTERPRISE, we believe that spiritual practice requires purity and dedication. We are your trusted source for premium, authentic pooja essentials delivered directly to your doorstep.
                </p>
                
                <a
                  href="#collections"
                  className="mt-8 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-8 text-[15px] font-bold text-[#073020] shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:bg-white hover:scale-105 w-fit"
                >
                  Discover Collections
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="grid grid-cols-1 gap-16 px-6 pt-16 md:grid-cols-12 md:gap-12 md:px-12 md:pt-24">
          
          {/* LEFT COLUMN: HOW WE WORK */}
          <section
            id="journey"
            aria-labelledby="journey-heading"
            className="md:col-span-5 lg:col-span-4"
          >
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#073020]/5 px-3 py-1.5 mb-4 border border-[#073020]/10">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#073020]">
                  OUR COMMITMENT
                </p>
              </div>
              <h2
                id="journey-heading"
                className="font-serif text-[32px] md:text-[40px] font-bold leading-[1.1] text-[#073020]"
              >
                Purity from origin to offering.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-gray-600">
                Every item in our catalog is carefully selected to ensure it meets the highest standards of spiritual purity. We understand the sanctity of your prayers and strive to provide only the best.
              </p>
              
              <StepList steps={ABOUT_STEPS} />
            </div>
          </section>

          {/* RIGHT COLUMN: CATEGORIES */}
          <section
            id="collections"
            aria-labelledby="aisles-heading"
            className="md:col-span-7 lg:col-span-7 lg:col-start-6"
          >
            <div className="mb-6 md:mb-10">
               <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 px-3 py-1.5 mb-4 border border-[#D4AF37]/20">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#073020]">
                  OUR COLLECTIONS
                </p>
              </div>
              <h2
                id="aisles-heading"
                className="font-serif text-[32px] md:text-[40px] font-bold leading-[1.1] text-[#073020]"
              >
                Essentials for every ritual.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-600 max-w-xl">
                Explore our meticulously curated categories, featuring everything from intricate panchaloha idols to pure, aromatic camphor, designed to enrich your spiritual journey.
              </p>
            </div>

            <AisleAccordion items={ABOUT_AISLES} defaultOpenId="idols" />

            {/* INFO CARDS */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16">
              <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100 transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073020]/5 text-[#D4AF37]">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-[20px] font-bold text-[#073020]">
                  Local Delivery
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                  Based in your community, we offer rapid delivery so you never run out of daily essentials.
                </p>
              </div>

              <div className="rounded-3xl bg-[#073020] p-6 shadow-xl transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#D4AF37]">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-[20px] font-bold text-white">
                  Get in Touch
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-300">
                  Have questions about our products or bulk orders for festivals? We are here to help.
                </p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 text-[13px] font-bold text-[#073020] transition-colors hover:bg-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
