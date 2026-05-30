"use client";

import React from "react";
import { motion } from "framer-motion";

// David Bust: Neo-Brutalist classical sculpture SVG
export const DavidBust = ({ className = "w-full h-full" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center bg-pastel-pink rounded-full border-3 border-[#1C1917] overflow-hidden ${className}`}>
      {/* Background patterns */}
      <div className="absolute inset-0 dots-grid opacity-30"></div>
      
      {/* Sculpture SVG */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] relative z-10 drop-shadow-[4px_4px_0px_rgba(28,25,23,0.15)]"
      >
        {/* Background halo */}
        <circle cx="100" cy="100" r="85" fill="#ffffff" stroke="#1C1917" strokeWidth="3" />
        <circle cx="100" cy="100" r="75" fill="#E9A16C" fillOpacity="0.2" />
        
        {/* Head Silhouette Base */}
        <path
          d="M75 140 C75 160, 125 160, 125 140 L120 115 C135 110, 140 95, 140 85 C140 50, 125 45, 100 45 C75 45, 60 50, 60 85 C60 95, 65 110, 80 115 Z"
          fill="#F5F2E9"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        
        {/* Hair - Roman curls (brutalist layers) */}
        <path
          d="M60 75 C55 65, 70 55, 80 58 C85 50, 95 48, 100 52 C105 48, 115 50, 120 58 C130 55, 145 65, 140 75 C145 80, 135 88, 130 83 C125 90, 115 88, 110 82 C105 88, 95 88, 90 82 C85 88, 75 90, 70 83 C65 88, 55 80, 60 75 Z"
          fill="#2A5D77"
          stroke="#1C1917"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Head details: Eyes, Nose, Mouth (Minimalist block lines) */}
        {/* Eyebrows */}
        <path d="M83 78 Q90 75 96 78" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
        <path d="M117 78 Q110 75 104 78" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
        
        {/* Nose */}
        <path d="M100 78 L100 95 Q100 97 96 97" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Eyes (Staring blankly like marble statues) */}
        <ellipse cx="89" cy="83" rx="4" ry="2" fill="none" stroke="#1C1917" strokeWidth="2.5" />
        <ellipse cx="111" cy="83" rx="4" ry="2" fill="none" stroke="#1C1917" strokeWidth="2.5" />
        
        {/* Lips */}
        <path d="M94 105 Q100 102 106 105" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 108 Q100 109 104 108" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
        
        {/* Pedestal / Base */}
        <path
          d="M60 160 H140 L130 148 H70 Z"
          fill="#E7E5E4"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <rect x="50" y="160" width="100" height="15" rx="4" fill="#292524" stroke="#1C1917" strokeWidth="3.5" />
      </svg>
      
      {/* Laurel Wreath Crown (Overlay, floats slightly) */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[22%] left-1/2 transform -translate-x-1/2 w-[70%] h-[15%] z-20 pointer-events-none"
      >
        <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Leaves Left */}
          <path d="M15 15 Q25 5 35 12" stroke="#E9A16C" strokeWidth="3" strokeLinecap="round" fill="#E9A16C" />
          <path d="M25 20 Q35 10 45 17" stroke="#E9A16C" strokeWidth="3" strokeLinecap="round" fill="#E9A16C" />
          {/* Leaves Right */}
          <path d="M85 15 Q75 5 65 12" stroke="#E9A16C" strokeWidth="3" strokeLinecap="round" fill="#E9A16C" />
          <path d="M75 20 Q65 10 55 17" stroke="#E9A16C" strokeWidth="3" strokeLinecap="round" fill="#E9A16C" />
        </svg>
      </motion.div>
    </div>
  );
};

// Athena Bust: Greek Goddess with helmet
export const AthenaBust = ({ className = "w-full h-full" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center bg-pastel-green rounded-full border-3 border-[#1C1917] overflow-hidden ${className}`}>
      <div className="absolute inset-0 retro-grid opacity-20"></div>
      
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] relative z-10 drop-shadow-[4px_4px_0px_rgba(28,25,23,0.15)]"
      >
        <circle cx="100" cy="100" r="85" fill="#ffffff" stroke="#1C1917" strokeWidth="3" />
        <circle cx="100" cy="100" r="75" fill="#2A5D77" fillOpacity="0.1" />
        
        {/* Face */}
        <path
          d="M75 135 C75 155, 125 155, 125 135 L121 110 C132 108, 137 95, 137 87 C137 60, 125 55, 100 55 C75 55, 63 60, 63 87 C63 95, 68 108, 79 110 Z"
          fill="#F5F2E9"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        
        {/* Corinthian Helmet (Ancient military/scholarly) */}
        <path
          d="M60 75 C60 40, 75 30, 100 30 C125 30, 140 40, 140 75 L135 85 L145 92 L132 90 L122 75 L100 85 L78 75 L68 90 L55 92 L65 85 Z"
          fill="#E9A16C"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        
        {/* Helmet Crest (Plume) */}
        <path
          d="M100 30 C100 10, 145 10, 155 35 C158 45, 150 50, 135 48 C128 47, 115 45, 100 30 Z"
          fill="#FD9888"
          stroke="#1C1917"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Nose & Eyes */}
        <path d="M100 78 L100 95 Q100 97 96 97" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="88" cy="83" rx="3.5" ry="1.5" fill="none" stroke="#1C1917" strokeWidth="2.5" />
        <ellipse cx="112" cy="83" rx="3.5" ry="1.5" fill="none" stroke="#1C1917" strokeWidth="2.5" />
        <path d="M93 105 Q100 102 107 105" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Neck base */}
        <path
          d="M65 155 H135 L125 142 H75 Z"
          fill="#E7E5E4"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <rect x="55" y="155" width="90" height="15" rx="3" fill="#292524" stroke="#1C1917" strokeWidth="3.5" />
      </svg>
      
      {/* Sparkles / Classical wisdom aura */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[15%] left-[15%] w-3 h-3 bg-white border-2 border-[#1C1917] rounded-full"></div>
        <div className="absolute top-[25%] right-[12%] w-4 h-4 bg-white border-2 border-[#1C1917] rotate-45 flex items-center justify-center">
          <div className="w-1 h-1 bg-[#1C1917]"></div>
        </div>
      </motion.div>
    </div>
  );
};

// PaintingClassic: Retro book, column and quill illustration
export const PaintingClassic = ({ className = "w-full h-full" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center bg-pastel-blue rounded-full border-3 border-[#1C1917] overflow-hidden ${className}`}>
      <div className="absolute inset-0 dots-grid opacity-30"></div>
      
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] relative z-10 drop-shadow-[4px_4px_0px_rgba(28,25,23,0.15)]"
      >
        {/* Outer Circular frame */}
        <circle cx="100" cy="100" r="85" fill="#ffffff" stroke="#1C1917" strokeWidth="3" />
        <path d="M100 15 C146.9 15 185 53.1 185 100 C185 146.9 146.9 185 100 185 C53.1 185 15 146.9 15 100" stroke="#1C1917" strokeWidth="1.5" strokeDasharray="4 4" />
        
        {/* Classical Pillar (Background-ish) */}
        <path d="M35 155 V75 H65 V155 Z" fill="#E7E5E4" stroke="#1C1917" strokeWidth="3.5" />
        <line x1="45" y1="85" x2="45" y2="145" stroke="#1C1917" strokeWidth="2.5" />
        <line x1="55" y1="85" x2="55" y2="145" stroke="#1C1917" strokeWidth="2.5" />
        <rect x="30" y="68" width="40" height="8" rx="2" fill="#292524" stroke="#1C1917" strokeWidth="3" />
        <rect x="30" y="155" width="40" height="10" rx="2" fill="#292524" stroke="#1C1917" strokeWidth="3" />
        
        {/* Open Book */}
        <path
          d="M80 120 C80 100, 115 100, 125 110 C135 100, 170 100, 170 120 V160 C170 140, 135 140, 125 150 C115 140, 80 140, 80 160 Z"
          fill="#F5F2E9"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M125 112 V150" stroke="#1C1917" strokeWidth="2.5" />
        
        {/* Writing/Script lines */}
        <line x1="90" y1="125" x2="110" y2="125" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="90" y1="133" x2="112" y2="133" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="90" y1="141" x2="105" y2="141" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        
        <line x1="138" y1="125" x2="160" y2="125" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="133" x2="158" y2="133" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="141" x2="150" y2="141" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Inkwell (Pastel orange inkpot) */}
        <rect x="75" y="80" width="22" height="20" rx="4" fill="#E9A16C" stroke="#1C1917" strokeWidth="3" />
        <rect x="80" y="74" width="12" height="6" rx="1" fill="#292524" stroke="#1C1917" strokeWidth="3" />
        <path d="M86 86 L86 94" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Feather Quill Pen */}
        <path
          d="M145 60 C135 68, 115 90, 93 103 L88 106 L94 100 C110 82, 130 65, 145 60 Z"
          fill="#ffffff"
          stroke="#1C1917"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="135" y1="67" x2="93" y2="103" stroke="#1C1917" strokeWidth="2.5" />
      </svg>
      
      {/* Floating letters logic */}
      <motion.div
        animate={{ y: [0, -5, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-[25%] right-[22%] font-sans font-black text-xl text-[#1C1917] pointer-events-none"
      >
        A
      </motion.div>
      <motion.div
        animate={{ y: [0, -7, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[40%] right-[32%] font-serif italic text-lg text-[#1C1917] pointer-events-none"
      >
        Ω
      </motion.div>
    </div>
  );
};
