import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/logo.png';
import splashBg from '../assets/story_temple.png';

export function SplashScreen({ onComplete }) {
  const container = useRef(null);
  const logoGroup = useRef(null);
  const taglineRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Logo pops in
    tl.from(logoGroup.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Tagline fades up
    tl.from(taglineRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3');

    // Hold for a moment
    tl.to({}, { duration: 1.5 });

    // Fade everything out
    tl.to(container.current, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center w-full h-full overflow-hidden"
    >
      {/* Full-screen background image — basket is baked in, no seams */}
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 w-full" style={{ paddingBottom: '40vh' }}>
        <div ref={logoGroup} className="flex flex-col items-center">
          {/* Logo */}
          <img
            src={logoImg}
            alt="VEERABADHRA ENTERPRISE Logo"
            className="object-contain mb-4"
            style={{
              width: '160px',
              height: '160px',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))'
            }}
          />

          {/* Brand Name */}
          <span
            style={{
              color: '#D4AF37', // Metallic gold
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(32px, 10vw, 48px)',
              fontWeight: '900',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              textShadow: '2px 4px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)',
              textAlign: 'center'
            }}
          >
            VEERABADHRA ENTERPRISE
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            color: '#FDF7E5', // Bright beige/white
            fontFamily: "'Georgia', serif",
            fontSize: 'clamp(18px, 5vw, 24px)',
            fontWeight: '700',
            marginTop: '24px',
            textShadow: '1px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
            textAlign: 'center'
          }}
        >
          Premium Pooja Essentials Delivered Daily
        </p>
      </div>
    </div>
  );
}
