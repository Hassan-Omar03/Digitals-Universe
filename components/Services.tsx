'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/components/StaticMotion';

const servicesData = [
  { id: 1, title: 'Custom Web Development', desc: 'High-performance, scalable web applications tailored to your business needs.', icon: '💻' },
  { id: 2, title: 'UI/UX Design', desc: 'Stunning, user-centric interfaces that provide unforgettable experiences.', icon: '🎨' },
  { id: 3, title: 'SEO Optimization', desc: 'Dominate search rankings and drive organic traffic to your platform.', icon: '📈' },
  { id: 4, title: 'Digital Marketing', desc: 'Data-driven campaigns that convert your leads into loyal customers.', icon: '🚀' },
  { id: 5, title: 'Brand Identity', desc: 'Unique logos and branding packages that make you stand out from the crowd.', icon: '✨' },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3d7ec7]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our <span className="text-[#3d7ec7]">Services</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            We offer a comprehensive suite of digital solutions designed to elevate your brand and drive actual results.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden relative h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute w-full px-4"
              >
                <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center group hover:border-[#3d7ec7]/30 transition-colors duration-300">
                  <span className="text-6xl mb-6 block drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {servicesData[currentIndex].icon}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {servicesData[currentIndex].title}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    {servicesData[currentIndex].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-neutral-900 text-white hover:bg-[#3d7ec7] hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Previous service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-[#3d7ec7]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-neutral-900 text-white hover:bg-[#3d7ec7] hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Next service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
