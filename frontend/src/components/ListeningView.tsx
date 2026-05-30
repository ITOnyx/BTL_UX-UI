"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, HelpCircle, Check, ArrowRight, X } from "lucide-react";

interface ListeningViewProps {
  xp: number;
  setXp: (xp: number | ((prev: number) => number)) => void;
  activeLanguage: { code: string; name: string; flag: string };
  incrementQuestProgress: (id: string, amount?: number) => void;
}

interface DictationQuestion {
  sentence: string;
  missingWord: string;
  displaySentence: string; // "Carpe ___ quam minimum..."
  translation: string;
  context: string;
}

const QUESTION_BANK: Record<string, DictationQuestion[]> = {
  la: [
    {
      sentence: "Carpe diem quam minimum credula postero",
      missingWord: "diem",
      displaySentence: "Carpe ___ quam minimum credula postero",
      translation: "Hãy sống trọn ngày hôm nay, chớ tin vào ngày mai.",
      context: "Lời thơ của thi sĩ Horace, mang triết lý sống trọn vẹn hiện tại.",
    },
    {
      sentence: "Veni vidi vici",
      missingWord: "vidi",
      displaySentence: "Veni, ___, vici",
      translation: "Tôi đã đến, tôi đã thấy, tôi đã thắng.",
      context: "Câu nói nổi tiếng của Julius Caesar gửi về Viện Nguyên lão sau chiến thắng tốc hành.",
    },
    {
      sentence: "Alea iacta est",
      missingWord: "iacta",
      displaySentence: "Alea ___ est",
      translation: "Xúc xắc đã được gieo.",
      context: "Julius Caesar nói khi vượt sông Rubicon, đánh dấu bước ngoặt không thể đảo ngược.",
    },
  ],
  fr: [
    {
      sentence: "Chaque chose en son temps",
      missingWord: "temps",
      displaySentence: "Chaque chose en son ___",
      translation: "Mọi việc đều có thời điểm của riêng nó.",
      context: "Châm ngôn nhắc nhở sự kiên nhẫn, làm việc gì cũng cần có trình tự.",
    },
    {
      sentence: "Petit a petit loiseau fait son nid",
      missingWord: "oiseau",
      displaySentence: "Petit à petit, l'___ fait son nid",
      translation: "Tích tiểu thành đại, chú chim tự xây tổ của mình.",
      context: "Thành ngữ Pháp khuyến khích sự tích lũy bền bỉ ngày qua ngày.",
    },
  ],
  es: [
    {
      sentence: "La verdad os hara libres",
      missingWord: "libres",
      displaySentence: "La verdad os hará ___",
      translation: "Sự thật sẽ giải phóng các bạn.",
      context: "Câu trích dẫn nổi tiếng đề cao giá trị của sự thật và tri thức chân lý.",
    },
  ],
  el: [
    {
      sentence: "Gnothi seauton",
      missingWord: "seauton",
      displaySentence: "Gnothi ___",
      translation: "Hãy tự thấu hiểu chính mình.",
      context: "Lời sấm truyền khắc tại Đền thờ Apollo ở Delphi, một cột mốc triết học cổ đại.",
    },
  ],
};

export default function ListeningView({
  xp,
  setXp,
  activeLanguage,
  incrementQuestProgress,
}: ListeningViewProps) {
  const questions = QUESTION_BANK[activeLanguage.code] || QUESTION_BANK.la;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const currentQuestion = questions[questionIndex % questions.length];

  // Reset states on language or question change
  useEffect(() => {
    setUserInput("");
    setHasChecked(false);
    setIsCorrect(false);
    setIsPlaying(false);
  }, [activeLanguage, questionIndex]);

  // Audio synthesizer for success/failure chimes
  const playSoundEffect = (success: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (success) {
        // Success: Major chord arpeggio
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45); // C6
        gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.stop(ctx.currentTime + 0.7);
      } else {
        // Failure: Flat minor buzz
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.start();
        osc.frequency.setValueAtTime(207.65, ctx.currentTime + 0.15); // G#3
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.log("Web Audio API not supported or blocked: ", e);
    }
  };

  // Speak dictation text using Web Speech API
  const speakText = () => {
    if (!window.speechSynthesis) {
      alert("Trình duyệt của bạn không hỗ trợ phát âm thanh Speech Synthesis.");
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion.sentence);
    
    // Set appropriate language locale
    if (activeLanguage.code === "la") utterance.lang = "it-IT"; // Italian matches Latin pronunciation closest
    else if (activeLanguage.code === "fr") utterance.lang = "fr-FR";
    else if (activeLanguage.code === "es") utterance.lang = "es-ES";
    else if (activeLanguage.code === "el") utterance.lang = "el-GR";
    
    utterance.rate = 0.75; // Academic slow pace
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleCheck = () => {
    if (userInput.trim() === "") return;
    
    const correctClean = currentQuestion.missingWord.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    const userClean = userInput.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    
    const isAnsCorrect = correctClean === userClean;
    setIsCorrect(isAnsCorrect);
    setHasChecked(true);
    playSoundEffect(isAnsCorrect);
    
    if (isAnsCorrect) {
      setXp((prev) => prev + 10);
      incrementQuestProgress("quest_1"); // Listen quest increment
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-xl mx-auto font-lora">
      {/* Exercise progress header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border-3 border-[#1C1917] shadow-brutal-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{activeLanguage.flag}</span>
          <span className="font-extrabold uppercase font-lexend text-xs text-gray-500 tracking-wider">
            Luyện nghe chính tả
          </span>
        </div>
        <div className="font-extrabold text-sm text-teal-primary font-lexend">
          Câu { (questionIndex % questions.length) + 1 } / { questions.length }
        </div>
      </div>

      {/* Audio Interaction Area */}
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="brutal-card bg-white p-6 md:p-8 flex flex-col items-center gap-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>

        {/* Heading Instruction */}
        <h3 className="font-black text-lg text-center uppercase tracking-wide font-lexend text-[#1C1917] mb-2">
          Nghe và điền từ còn thiếu
        </h3>

        {/* Custom Retro Speaker Button with waves */}
        <div className="flex flex-col items-center gap-4 my-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={speakText}
            className={`w-24 h-24 rounded-full border-3 border-[#1C1917] flex items-center justify-center cursor-pointer transition-all ${
              isPlaying
                ? "bg-orange-highlight shadow-brutal-sm translate-x-[2px] translate-y-[2px]"
                : "bg-teal-primary text-white shadow-brutal"
            }`}
          >
            {isPlaying ? (
              <Volume2 className="w-10 h-10 text-[#1C1917] animate-bounce" />
            ) : (
              <Play className="w-10 h-10 fill-white stroke-white translate-x-1" />
            )}
          </motion.button>

          {/* Neo-brutalist Waveform Visualizer */}
          <div className="flex items-center gap-1.5 h-10 px-4 py-2 bg-vintage-cream border-2 border-[#1C1917] rounded-full">
            {[0.2, 0.4, 0.6, 0.8, 0.5, 0.3, 0.7, 0.9, 0.4, 0.6].map((delay, index) => (
              <motion.div
                key={index}
                animate={
                  isPlaying
                    ? { height: [8, 28, 8] }
                    : { height: 8 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: delay,
                }}
                className={`w-1.5 rounded-full ${
                  isPlaying ? "bg-teal-primary" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* The Text Sentence with Blank */}
        <div className="w-full text-center py-4 px-2 border-y-2 border-[#1C1917] border-dashed">
          <p className="text-xl md:text-2xl font-extrabold tracking-wide font-lexend text-gray-800 italic">
            {currentQuestion.displaySentence}
          </p>
        </div>

        {/* Fill input field */}
        <div className="w-full flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Gõ từ bị thiếu..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={hasChecked}
            className="w-full bg-[#F5F2E9] border-3 border-[#1C1917] rounded-xl px-4 py-3 text-lg font-black font-lexend text-center focus:outline-none focus:bg-white focus:shadow-brutal-sm transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !hasChecked) handleCheck();
            }}
          />
          
          <button
            onClick={handleCheck}
            disabled={hasChecked || userInput.trim() === ""}
            className={`w-full py-3 brutal-btn ${
              userInput.trim() === "" || hasChecked
                ? "bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none"
                : "bg-teal-primary text-white"
            }`}
          >
            Kiểm tra đáp án
          </button>
        </div>
      </motion.div>

      {/* Result feedback panels */}
      <AnimatePresence>
        {hasChecked && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`brutal-card p-5 flex flex-col gap-4 relative z-20 ${
              isCorrect ? "bg-pastel-green" : "bg-coral-highlight"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#1C1917] flex items-center justify-center">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-teal-primary" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <h4 className="font-black text-base uppercase tracking-wider font-lexend">
                  {isCorrect ? "Rất chính xác! +10 XP" : "Chưa đúng rồi!"}
                </h4>
                {!isCorrect && (
                  <p className="text-xs font-bold mt-0.5 text-red-950 font-lexend">
                    Đáp án đúng: <span className="underline">{currentQuestion.missingWord}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Explanations & Translations */}
            <div className="bg-white/80 p-3 rounded-lg border-2 border-[#1C1917]">
              <p className="text-xs font-serif italic text-gray-800 leading-snug">
                "{currentQuestion.sentence}"
              </p>
              <p className="text-xs font-bold text-gray-700 mt-1">
                Dịch: {currentQuestion.translation}
              </p>
              <p className="text-[10px] text-gray-500 mt-2 font-medium">
                {currentQuestion.context}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 brutal-btn bg-[#1C1917] text-white hover:bg-teal-dark"
            >
              Tiếp tục
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
