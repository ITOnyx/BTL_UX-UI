/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, BookOpen, Check, RefreshCw } from "lucide-react";
import { DavidBust, AthenaBust, PaintingClassic } from "./ClassicIllustrations";

interface FlashcardsViewProps {
  xp: number;
  setXp: (xp: number | ((prev: number) => number)) => void;
  activeLanguage: { code: string; name: string; flag: string };
  incrementQuestProgress: (id: string, amount?: number) => void;
}

interface Flashcard {
  word: string;
  type: string;
  translation: string;
  sentence: string;
  sentenceTranslation: string;
  illustration: React.ComponentType<{ className?: string }>;
}

const CARDS_BANK: Record<string, Flashcard[]> = {
  la: [
    {
      word: "Philosophia",
      type: "danh từ, cái",
      translation: "Triết học (Tình yêu sự khôn ngoan)",
      sentence: "Philosophia est magistra vitae.",
      sentenceTranslation: "Triết học là người thầy của cuộc đời.",
      illustration: DavidBust,
    },
    {
      word: "Sapientia",
      type: "danh từ, cái",
      translation: "Sự thông thái / Khôn ngoan",
      sentence: "Initium sapientiae timor Domini.",
      sentenceTranslation: "Khởi đầu của sự khôn ngoan là sự kính sợ Chúa.",
      illustration: AthenaBust,
    },
    {
      word: "Liber",
      type: "danh từ, đực",
      translation: "Sách / Cuốn sách",
      sentence: "Libri muti magistri sunt.",
      sentenceTranslation: "Sách là những người thầy câm lặng.",
      illustration: PaintingClassic,
    },
    {
      word: "Amicitia",
      type: "danh từ, cái",
      translation: "Tình bạn / Tình bằng hữu",
      sentence: "Amicitia sine fine est.",
      sentenceTranslation: "Tình bạn chân chính là không có giới hạn.",
      illustration: DavidBust,
    },
  ],
  fr: [
    {
      word: "Bibliothèque",
      type: "danh từ, cái",
      translation: "Thư viện",
      sentence: "Je passe mes après-midi à la bibliothèque.",
      sentenceTranslation: "Tôi dành những buổi chiều của mình ở thư viện.",
      illustration: PaintingClassic,
    },
    {
      word: "Sagesse",
      type: "danh từ, cái",
      translation: "Sự khôn ngoan / Minh triết",
      sentence: "La sagesse commence dans l'émerveillement.",
      sentenceTranslation: "Sự khôn ngoan bắt đầu từ sự kinh ngạc.",
      illustration: AthenaBust,
    },
  ],
  es: [
    {
      word: "Libro",
      type: "danh từ, đực",
      translation: "Cuốn sách",
      sentence: "Este libro antiguo es muy valioso.",
      sentenceTranslation: "Cuốn sách cổ này rất có giá trị.",
      illustration: PaintingClassic,
    },
  ],
  el: [
    {
      word: "Logos",
      type: "danh từ, đực",
      translation: "Ngôi lời / Lý thuyết / Trí tuệ",
      sentence: "En arche en ho logos.",
      sentenceTranslation: "Khởi đầu đã có Ngôi Lời.",
      illustration: DavidBust,
    },
  ],
};

export default function FlashcardsView({
  setXp,
  activeLanguage,
  incrementQuestProgress,
}: FlashcardsViewProps) {
  const cards = CARDS_BANK[activeLanguage.code] || CARDS_BANK.la;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = slide left, -1 = slide right

  const currentCard = cards[currentIndex % cards.length];
  const Illustration = currentCard.illustration;

  // Speak word using SpeechSynthesis
  const speakWord = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card flip
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentCard.word);
    
    if (activeLanguage.code === "la") utterance.lang = "it-IT";
    else if (activeLanguage.code === "fr") utterance.lang = "fr-FR";
    else if (activeLanguage.code === "es") utterance.lang = "es-ES";
    else if (activeLanguage.code === "el") utterance.lang = "el-GR";
    
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleResponse = (knowsIt: boolean) => {
    setIsFlipped(false);
    setDirection(1);
    
    setTimeout(() => {
      if (knowsIt) {
        setXp((prev) => prev + 5);
        incrementQuestProgress("quest_2"); // Vocab quest increment
      }
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir * 300,
      opacity: 0,
      rotate: dir * 5,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    exit: (dir: number) => ({
      x: -dir * 300,
      opacity: 0,
      rotate: -dir * 5,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-xl mx-auto font-lora">
      {/* Deck stats header */}
      <div className="flex justify-between items-center w-full bg-white p-4 rounded-xl border-3 border-[#1C1917] shadow-brutal-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-primary" />
          <span className="font-extrabold uppercase font-lexend text-xs text-gray-500 tracking-wider">
            Thẻ học từ vựng
          </span>
        </div>
        <div className="font-extrabold text-sm text-teal-primary font-lexend">
          Thẻ { (currentIndex % cards.length) + 1 } / { cards.length }
        </div>
      </div>

      {/* 3D Card container (Perspective view) */}
      <div className="w-full h-96 relative perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full relative"
          >
            {/* The Outer card frame that handles 3D rotate */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-full brutal-card relative bg-white overflow-hidden"
            >
              {/* --- FRONT SIDE --- */}
              <div
                className="absolute inset-0 p-6 flex flex-col justify-between items-center bg-white"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>
                
                {/* Word type/category badge */}
                <div className="w-full flex justify-between items-center">
                  <span className="brutal-badge bg-pastel-pink text-xs uppercase tracking-wide font-lexend">
                    {currentCard.type}
                  </span>
                  
                  {/* Pronounce audio button */}
                  <button
                    onClick={speakWord}
                    className="p-2 bg-vintage-cream hover:bg-white rounded-lg border-2 border-[#1C1917] shadow-[2px_2px_0px_#1C1917] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1917] transition-all"
                  >
                    <Volume2 className="w-4 h-4 text-[#1C1917]" />
                  </button>
                </div>

                {/* Classical artwork frame */}
                <div className="w-32 h-32 my-2 relative">
                  <Illustration className="w-full h-full" />
                </div>

                {/* Word Heading */}
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-extrabold font-lexend tracking-wide text-teal-dark">
                    {currentCard.word}
                  </h2>
                  <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-wider font-lexend flex items-center gap-1.5 justify-center">
                    <RefreshCw className="w-3 h-3 animate-spin-slow" /> Nhấp để lật thẻ
                  </p>
                </div>
              </div>

              {/* --- BACK SIDE --- */}
              <div
                className="absolute inset-0 p-6 flex flex-col justify-between items-center bg-vintage-cream"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>

                <div className="w-full">
                  <span className="brutal-badge bg-pastel-blue text-xs uppercase tracking-wide font-lexend">
                    Định nghĩa
                  </span>
                </div>

                {/* Translation & Definition block */}
                <div className="text-center max-w-sm px-2">
                  <h3 className="text-2xl font-black font-lexend text-teal-primary mb-3">
                    {currentCard.translation}
                  </h3>
                  
                  {/* Classical citation */}
                  <div className="bg-white p-3 rounded-xl border-2 border-[#1C1917] mt-2 shadow-[3px_3px_0px_#1C1917]">
                    <p className="text-sm font-serif italic text-gray-800 leading-snug">
                      "{currentCard.sentence}"
                    </p>
                    <p className="text-[10px] font-bold text-gray-500 mt-1">
                      Dịch nghĩa: {currentCard.sentenceTranslation}
                    </p>
                  </div>
                </div>

                <div className="w-full text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider font-lexend">
                    Nhấp thẻ để quay lại mặt trước
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Response Button Controls */}
      <div className="grid grid-cols-2 gap-4 w-full mt-2">
        <button
          onClick={() => handleResponse(false)}
          className="brutal-btn py-3.5 bg-orange-highlight text-[#1C1917] hover:bg-orange-highlight/90 text-sm font-lexend"
        >
          Cần ôn tập
        </button>
        <button
          onClick={() => handleResponse(true)}
          className="brutal-btn py-3.5 bg-teal-primary text-white text-sm font-lexend"
        >
          Đã thuộc +5 XP
          <Check className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
