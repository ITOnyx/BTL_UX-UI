"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Edit2, Volume2, Mic, PenTool, FileText, AlertCircle, ArrowLeft, Check, X, RefreshCw, Star, Play } from "lucide-react";

interface LearnViewProps {
  xp: number;
  setXp: (xp: number | ((prev: number) => number)) => void;
  gems: number;
  setGems: (gems: number | ((prev: number) => number)) => void;
  incrementQuestProgress: (id: string, amount?: number) => void;
  fontSize: "small" | "medium" | "large";
}

export default function LearnView({
  xp,
  setXp,
  gems,
  setGems,
  incrementQuestProgress,
  fontSize
}: LearnViewProps) {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  
  // Data for activities
  const activities = [
    { id: "vocab", title: "Từ vựng", progress: 65, color: "bg-pastel-purple", icon: BookOpen, accent: "#DDD6FE" },
    { id: "test", title: "Kiểm tra", progress: 40, color: "bg-pastel-blue", icon: Edit2, accent: "#C7E7FF" },
    { id: "listening", title: "Luyện nghe", progress: 30, color: "bg-pastel-green", icon: Volume2, accent: "#A7F3D0" },
    { id: "speaking", title: "Luyện nói", progress: 50, color: "bg-orange-highlight", icon: Mic, accent: "#E9A16C" },
    { id: "writing", title: "Luyện viết", progress: 20, color: "bg-pastel-pink", icon: PenTool, accent: "#FBCFE8" },
    { id: "grammar", title: "Ngữ pháp", progress: 45, color: "bg-pastel-blue", icon: FileText, accent: "#C7E7FF" }
  ];

  // Exercises data
  const vocabCards = [
    { word: "Resilience", type: "Danh từ", translation: "Khả năng phục hồi / Sự kiên cường", sentence: "The human capacity for resilience is quite amazing.", sentenceTranslation: "Khả năng kiên cường của con người thực sự rất kinh ngạc." },
    { word: "Eloquent", type: "Tính từ", translation: "Hùng biện / Có tài ăn nói", sentence: "She made an eloquent appeal for action.", sentenceTranslation: "Cô ấy đã đưa ra một lời kêu gọi hành động đầy sức thuyết phục." },
    { word: "Brevity", type: "Danh từ", translation: "Sự ngắn gọn / Khúc chiết", sentence: "Brevity is the soul of wit.", sentenceTranslation: "Sự ngắn gọn là linh hồn của trí tuệ." },
    { word: "Mitigate", type: "Động từ", translation: "Giảm nhẹ / Làm dịu bớt", sentence: "We must take action to mitigate the effects of climate change.", sentenceTranslation: "Chúng ta phải hành động để giảm thiểu tác động của biến đổi khí hậu." }
  ];

  const listeningQuestions = [
    { sentence: "Success is not final failure is not fatal", missingWord: "final", display: "Success is not ___ , failure is not fatal", translation: "Thành công không phải là cuối cùng, thất bại không phải là tử địa.", context: "Winston Churchill - Khuyến khích lòng can đảm tiếp tục cố gắng." },
    { sentence: "An investment in knowledge pays the best interest", missingWord: "knowledge", display: "An investment in ___ pays the best interest", translation: "Đầu tư vào tri thức mang lại lợi ích tốt nhất.", context: "Benjamin Franklin - Tầm quan trọng của việc học." }
  ];

  const speakingPhrases = [
    { phrase: "The early bird catches the worm", translation: "Trâu chậm uống nước đục (Ai đến sớm sẽ có lợi thế).", tip: "Phát âm rõ âm cuối 's' và 'ch'." },
    { phrase: "Actions speak louder than words", translation: "Hành động có giá trị hơn lời nói.", tip: "Lưu ý nối âm 'speak louder'." }
  ];

  const writingPrompts = [
    { vietnamese: "Học tập không bao giờ làm cạn kiệt trí óc.", correctEnglish: "Learning never exhausts the mind", hint: "L-e-a-r-n-i-n-g  n-e-v-e-r  e-x-h-a-u-s-t-s  t-h-e  m-i-n-d." },
    { vietnamese: "Tôi muốn cải thiện kỹ năng tiếng Anh giao tiếp của mình.", correctEnglish: "I want to improve my spoken English skills", hint: "I  w-a-n-t  t-o  i-m-m-p-r-o-v-e  m-y  s-p-o-k-e-n..." }
  ];

  const grammarQuestions = [
    { question: "If I _____ you, I would study English every single day.", options: ["am", "was", "were", "would be"], correctIndex: 2, explanation: "Câu điều kiện loại 2, sử dụng 'were' cho tất cả các ngôi khi giả định không có thật ở hiện tại." },
    { question: "She has been learning English _____ three years.", options: ["for", "since", "during", "ago"], correctIndex: 0, explanation: "Dùng 'for' kèm theo một khoảng thời gian trong thì Hiện tại hoàn thành tiếp diễn." }
  ];

  const errorReviewWords = [
    { word: "Phenomenon", translation: "Hiện tượng", errorCount: 4 },
    { word: "Exaggerate", translation: "Phóng đại", errorCount: 3 },
    { word: "Coincidence", translation: "Sự trùng hợp", errorCount: 2 },
    { word: "Conscientious", translation: "Tận tâm, chu đáo", errorCount: 2 },
    { word: "Hierarchy", translation: "Hệ thống cấp bậc", errorCount: 1 }
  ];

  // Specific state of active sub-activity
  const [vocabIndex, setVocabIndex] = useState(0);
  const [vocabFlipped, setVocabFlipped] = useState(false);
  
  const [listenIndex, setListenIndex] = useState(0);
  const [listenInput, setListenInput] = useState("");
  const [listenChecked, setListenChecked] = useState(false);
  const [listenCorrect, setListenCorrect] = useState(false);
  const [listenIsPlaying, setListenIsPlaying] = useState(false);

  const [speakIndex, setSpeakIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [speakResult, setSpeakResult] = useState<null | { score: number; text: string }>(null);

  const [writeIndex, setWriteIndex] = useState(0);
  const [writeInput, setWriteInput] = useState("");
  const [writeChecked, setWriteChecked] = useState(false);
  const [writeCorrect, setWriteCorrect] = useState(false);

  const [grammarIndex, setGrammarIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [grammarChecked, setGrammarChecked] = useState(false);

  const [testScore, setTestScore] = useState(0);
  const [testStep, setTestStep] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  // Audio synthesis helper
  const playTTS = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const playTTSListen = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.onstart = () => setListenIsPlaying(true);
    utterance.onend = () => setListenIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Render content of active activity modal
  const renderActivityContent = () => {
    switch (activeActivity) {
      case "error_review":
        return (
          <div className="flex flex-col gap-5 p-2 text-[#1C1917]">
            <div className="flex items-center gap-3 border-b-3 border-[#1C1917] pb-3 mb-1">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-black text-lg uppercase tracking-wide font-lexend">Ôn Tập Lỗi Sai</h4>
                <p className="text-xs text-gray-500 font-bold">Ôn lại những từ bạn thường xuyên nhầm lẫn</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {errorReviewWords.map((item, idx) => (
                <div key={idx} className="brutal-card p-4 bg-white flex justify-between items-center border-2 border-[#1C1917]">
                  <div>
                    <h5 className="font-black text-base font-lexend text-teal-primary">{item.word}</h5>
                    <p className="text-xs text-gray-600 font-bold">{item.translation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="brutal-badge bg-coral-highlight text-[10px] font-black font-lexend">
                      Sai {item.errorCount} lần
                    </span>
                    <button 
                      onClick={() => {
                        playTTS(item.word);
                        setXp(p => p + 2);
                      }}
                      className="p-1.5 rounded-lg border-2 border-[#1C1917] bg-pastel-blue hover:translate-y-[-1px] transition-all"
                    >
                      <Volume2 className="w-4 h-4 text-[#1C1917]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setActiveActivity(null);
                setXp(p => p + 15);
                setGems(g => g + 10);
                incrementQuestProgress("quest_2", 2);
              }}
              className="w-full mt-4 brutal-btn py-3 bg-[#1C1917] text-white"
            >
              Hoàn thành ôn tập (+15 XP, +10 Gems)
            </button>
          </div>
        );

      case "vocab":
        const card = vocabCards[vocabIndex % vocabCards.length];
        return (
          <div className="flex flex-col items-center gap-6 py-2 text-[#1C1917]">
            <div className="flex justify-between items-center w-full">
              <span className="brutal-badge bg-pastel-pink text-xs uppercase tracking-wide font-lexend">
                {card.type}
              </span>
              <button
                onClick={() => playTTS(card.word)}
                className="p-2 bg-vintage-cream hover:bg-white rounded-lg border-2 border-[#1C1917] shadow-brutal-sm transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#1C1917]" />
              </button>
            </div>

            {/* Flashcard Box */}
            <div 
              onClick={() => setVocabFlipped(!vocabFlipped)}
              className={`w-full h-64 border-3 border-[#1C1917] rounded-2xl cursor-pointer flex flex-col justify-center items-center text-center p-6 transition-all duration-300 ${
                vocabFlipped ? "bg-vintage-cream shadow-none" : "bg-white shadow-brutal"
              }`}
            >
              {!vocabFlipped ? (
                <div>
                  <h3 className="text-3xl font-black font-lexend text-teal-dark">{card.word}</h3>
                  <p className="text-[10px] text-gray-400 mt-4 font-black uppercase tracking-wider font-lexend flex items-center gap-1.5 justify-center">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Nhấp để lật nghĩa
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <h4 className="text-2xl font-black font-lexend text-teal-primary">{card.translation}</h4>
                  <div className="border-t border-dashed border-gray-400 pt-3 max-w-sm">
                    <p className="text-sm font-serif italic text-gray-800">"{card.sentence}"</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">Dịch: {card.sentenceTranslation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <button
                onClick={() => {
                  setVocabFlipped(false);
                  setVocabIndex(p => Math.max(0, p - 1));
                }}
                disabled={vocabIndex === 0}
                className="brutal-btn py-3.5 bg-white text-[#1C1917] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước đó
              </button>
              {vocabIndex < vocabCards.length - 1 ? (
                <button
                  onClick={() => {
                    setVocabFlipped(false);
                    setVocabIndex(p => p + 1);
                    setXp(p => p + 5);
                    incrementQuestProgress("quest_2", 1);
                  }}
                  className="brutal-btn py-3.5 bg-teal-primary text-white"
                >
                  Đã thuộc +5 XP
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveActivity(null);
                    setVocabIndex(0);
                    setXp(p => p + 15);
                    setGems(g => g + 10);
                    incrementQuestProgress("quest_2", 1);
                  }}
                  className="brutal-btn py-3.5 bg-pastel-green text-[#1C1917]"
                >
                  Hoàn thành (+15 XP)
                </button>
              )}
            </div>
          </div>
        );

      case "listening":
        const listenQ = listeningQuestions[listenIndex % listeningQuestions.length];
        return (
          <div className="flex flex-col gap-6 py-2 text-[#1C1917]">
            <h4 className="font-black text-lg text-center uppercase tracking-wide font-lexend text-[#1C1917]">
              Nghe và điền từ còn thiếu
            </h4>
            <div className="flex flex-col items-center gap-4 my-2">
              <button
                onClick={() => playTTSListen(listenQ.sentence)}
                className={`w-20 h-20 rounded-full border-3 border-[#1C1917] flex items-center justify-center cursor-pointer transition-all ${
                  listenIsPlaying ? "bg-orange-highlight shadow-none translate-y-1" : "bg-teal-primary text-white shadow-brutal"
                }`}
              >
                {listenIsPlaying ? <Volume2 className="w-8 h-8 animate-bounce" /> : <Play className="w-8 h-8 fill-white translate-x-0.5" />}
              </button>
            </div>
            
            <div className="w-full text-center py-4 px-2 border-y-2 border-[#1C1917] border-dashed">
              <p className="text-xl font-extrabold tracking-wide font-lexend text-gray-800 italic">
                {listenQ.display}
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 mt-2">
              <input
                type="text"
                placeholder="Gõ từ bị thiếu vào đây..."
                value={listenInput}
                onChange={(e) => setListenInput(e.target.value)}
                disabled={listenChecked}
                className="w-full bg-[#F5F2E9] border-3 border-[#1C1917] rounded-xl px-4 py-3 text-lg font-black font-lexend text-center focus:outline-none focus:bg-white"
              />
              
              {!listenChecked ? (
                <button
                  onClick={() => {
                    const isAnsCorrect = listenInput.trim().toLowerCase() === listenQ.missingWord.toLowerCase();
                    setListenCorrect(isAnsCorrect);
                    setListenChecked(true);
                    if (isAnsCorrect) {
                      setXp(p => p + 10);
                      incrementQuestProgress("quest_1", 1);
                    }
                  }}
                  disabled={listenInput.trim() === ""}
                  className="w-full py-3.5 brutal-btn bg-teal-primary text-white disabled:opacity-50"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <div className={`p-4 rounded-xl border-2 border-[#1C1917] flex flex-col gap-3 ${
                  listenCorrect ? "bg-pastel-green" : "bg-coral-highlight"
                }`}>
                  <div className="flex items-center gap-2">
                    {listenCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    <span className="font-black text-sm uppercase font-lexend">
                      {listenCorrect ? "Tuyệt vời! +10 XP" : `Sai rồi! Đáp án đúng: ${listenQ.missingWord}`}
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-gray-700">Dịch: {listenQ.translation}</p>
                  <p className="text-[10px] text-gray-500 font-bold">{listenQ.context}</p>
                  
                  <button
                    onClick={() => {
                      setListenInput("");
                      setListenChecked(false);
                      if (listenIndex < listeningQuestions.length - 1) {
                        setListenIndex(p => p + 1);
                      } else {
                        setActiveActivity(null);
                        setListenIndex(0);
                        setXp(p => p + 10);
                        setGems(g => g + 5);
                      }
                    }}
                    className="w-full py-2.5 brutal-btn bg-[#1C1917] text-white"
                  >
                    {listenIndex < listeningQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành bài tập (+10 XP)"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "speaking":
        const phrase = speakingPhrases[speakIndex % speakingPhrases.length];
        return (
          <div className="flex flex-col gap-5 py-2 text-center text-[#1C1917]">
            <h4 className="font-black text-lg uppercase tracking-wide font-lexend text-[#1C1917]">
              Luyện phát âm chuẩn Mỹ
            </h4>
            <div className="bg-white p-5 rounded-2xl border-3 border-[#1C1917] shadow-brutal-sm my-1">
              <p className="text-2xl font-black font-lexend text-teal-dark mb-2">"{phrase.phrase}"</p>
              <p className="text-xs text-gray-600 font-bold mb-3">Dịch nghĩa: {phrase.translation}</p>
              <span className="brutal-badge bg-pastel-purple text-[9px] font-bold">Mẹo: {phrase.tip}</span>
            </div>

            <div className="flex flex-col items-center gap-4 my-4">
              <button
                onMouseDown={() => {
                  setIsRecording(true);
                  setSpeakResult(null);
                }}
                onMouseUp={() => {
                  setIsRecording(false);
                  setTimeout(() => {
                    const score = Math.floor(Math.random() * 20) + 80;
                    setSpeakResult({ score, text: score >= 90 ? "Phát âm xuất sắc! Rất giống người bản xứ." : "Phát âm tốt, cần chú ý nhịp điệu." });
                    setXp(p => p + 10);
                  }, 1500);
                }}
                onTouchStart={() => {
                  setIsRecording(true);
                  setSpeakResult(null);
                }}
                onTouchEnd={() => {
                  setIsRecording(false);
                  setTimeout(() => {
                    const score = Math.floor(Math.random() * 20) + 80;
                    setSpeakResult({ score, text: score >= 90 ? "Phát âm xuất sắc! Rất giống người bản xứ." : "Phát âm tốt, cần chú ý nhịp điệu." });
                    setXp(p => p + 10);
                  }, 1500);
                }}
                className={`w-20 h-20 rounded-full border-3 border-[#1C1917] flex items-center justify-center cursor-pointer transition-all ${
                  isRecording ? "bg-red-500 text-white animate-pulse shadow-none translate-y-1" : "bg-orange-highlight text-[#1C1917] shadow-brutal"
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider font-lexend">
                {isRecording ? "Đang thu âm... Thả ra để chấm điểm" : "Nhấn giữ nút để luyện nói"}
              </p>
            </div>

            {speakResult && (
              <div className="p-4 rounded-xl border-2 border-[#1C1917] bg-pastel-green/20 flex flex-col gap-3 items-center text-center">
                <div className="w-14 h-14 rounded-full bg-pastel-green border-2 border-[#1C1917] flex items-center justify-center font-black font-lexend text-lg">
                  {speakResult.score}%
                </div>
                <div>
                  <h5 className="font-black text-sm font-lexend">Điểm phát âm: {speakResult.score}%</h5>
                  <p className="text-xs text-gray-600 font-bold mt-1">{speakResult.text}</p>
                </div>

                <button
                  onClick={() => {
                    setSpeakResult(null);
                    if (speakIndex < speakingPhrases.length - 1) {
                      setSpeakIndex(p => p + 1);
                    } else {
                      setActiveActivity(null);
                      setSpeakIndex(0);
                      setXp(p => p + 15);
                    }
                  }}
                  className="w-full py-2.5 brutal-btn bg-[#1C1917] text-white"
                >
                  {speakIndex < speakingPhrases.length - 1 ? "Câu tiếp theo" : "Hoàn thành phần nói (+15 XP)"}
                </button>
              </div>
            )}
          </div>
        );

      case "writing":
        const prompt = writingPrompts[writeIndex % writingPrompts.length];
        return (
          <div className="flex flex-col gap-5 py-2 text-[#1C1917]">
            <h4 className="font-black text-lg text-center uppercase tracking-wide font-lexend text-[#1C1917]">
              Luyện viết & dịch câu
            </h4>
            <div className="bg-white p-5 rounded-2xl border-3 border-[#1C1917] shadow-brutal-sm">
              <p className="text-xs text-gray-500 font-bold uppercase font-lexend mb-1">Dịch câu này sang tiếng Anh</p>
              <p className="text-xl font-black text-teal-dark italic">"{prompt.vietnamese}"</p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <textarea
                placeholder="Nhập câu dịch tiếng Anh của bạn..."
                rows={3}
                value={writeInput}
                onChange={(e) => setWriteInput(e.target.value)}
                disabled={writeChecked}
                className="w-full bg-[#F5F2E9] border-3 border-[#1C1917] rounded-xl p-3 text-base font-black font-lexend focus:outline-none focus:bg-white focus:shadow-brutal-sm"
              />

              {!writeChecked ? (
                <button
                  onClick={() => {
                    const cleanUser = writeInput.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    const cleanCorrect = prompt.correctEnglish.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    const isAnsCorrect = cleanUser === cleanCorrect;
                    setWriteCorrect(isAnsCorrect);
                    setWriteChecked(true);
                    if (isAnsCorrect) {
                      setXp(p => p + 15);
                    }
                  }}
                  disabled={writeInput.trim() === ""}
                  className="w-full py-3 brutal-btn bg-teal-primary text-white disabled:opacity-50"
                >
                  Kiểm tra bài dịch
                </button>
              ) : (
                <div className={`p-4 rounded-xl border-2 border-[#1C1917] flex flex-col gap-3 ${
                  writeCorrect ? "bg-pastel-green" : "bg-coral-highlight"
                }`}>
                  <div className="flex items-center gap-2">
                    {writeCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    <span className="font-black text-sm uppercase font-lexend">
                      {writeCorrect ? "Chính xác tuyệt đối! +15 XP" : "Chưa hoàn hảo!"}
                    </span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-[#1C1917] text-xs">
                    <p className="font-bold text-teal-dark">Đáp án chuẩn:</p>
                    <p className="font-mono font-black mt-1">"{prompt.correctEnglish}"</p>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold">Gợi ý từ: {prompt.hint}</p>

                  <button
                    onClick={() => {
                      setWriteInput("");
                      setWriteChecked(false);
                      if (writeIndex < writingPrompts.length - 1) {
                        setWriteIndex(p => p + 1);
                      } else {
                        setActiveActivity(null);
                        setWriteIndex(0);
                        setXp(p => p + 15);
                        setGems(g => g + 5);
                      }
                    }}
                    className="w-full py-2.5 brutal-btn bg-[#1C1917] text-white"
                  >
                    {writeIndex < writingPrompts.length - 1 ? "Câu dịch tiếp theo" : "Hoàn thành phần dịch (+15 XP)"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "grammar":
        const gramQ = grammarQuestions[grammarIndex % grammarQuestions.length];
        return (
          <div className="flex flex-col gap-5 py-2 text-[#1C1917]">
            <h4 className="font-black text-lg text-center uppercase tracking-wide font-lexend text-[#1C1917]">
              Trắc nghiệm Ngữ pháp chuyên sâu
            </h4>
            <div className="bg-white p-5 rounded-2xl border-3 border-[#1C1917] shadow-brutal-sm">
              <p className="text-lg font-black font-lexend text-teal-dark leading-snug">{gramQ.question}</p>
            </div>

            <div className="flex flex-col gap-3">
              {gramQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optColor = "bg-white";
                if (grammarChecked) {
                  if (idx === gramQ.correctIndex) optColor = "bg-pastel-green";
                  else if (isSelected) optColor = "bg-coral-highlight";
                } else if (isSelected) {
                  optColor = "bg-orange-highlight";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !grammarChecked && setSelectedOption(idx)}
                    disabled={grammarChecked}
                    className={`p-3.5 text-left font-lexend font-extrabold rounded-xl border-2 border-[#1C1917] shadow-brutal-sm transition-all ${optColor}`}
                  >
                    <span className="inline-block w-6 text-center text-xs font-black bg-gray-100 rounded-md border border-gray-400 mr-3">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && !grammarChecked && (
              <button
                onClick={() => {
                  setGrammarChecked(true);
                  if (selectedOption === gramQ.correctIndex) {
                    setXp(p => p + 10);
                  }
                }}
                className="w-full py-3 brutal-btn bg-teal-primary text-white"
              >
                Xác nhận câu trả lời
              </button>
            )}

            {grammarChecked && (
              <div className="p-4 rounded-xl border-2 border-[#1C1917] bg-white flex flex-col gap-2">
                <span className="font-black text-sm uppercase font-lexend text-teal-primary">
                  {selectedOption === gramQ.correctIndex ? "🎉 Bạn đã trả lời đúng! +10 XP" : "😢 Rất tiếc, câu trả lời sai!"}
                </span>
                <p className="text-xs text-gray-700 font-bold mt-1">
                  <span className="underline">Giải thích:</span> {gramQ.explanation}
                </p>

                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setGrammarChecked(false);
                    if (grammarIndex < grammarQuestions.length - 1) {
                      setGrammarIndex(p => p + 1);
                    } else {
                      setActiveActivity(null);
                      setGrammarIndex(0);
                      setXp(p => p + 10);
                      setGems(g => g + 5);
                    }
                  }}
                  className="w-full py-2.5 brutal-btn bg-[#1C1917] text-white mt-2"
                >
                  {grammarIndex < grammarQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành (+10 XP)"}
                </button>
              </div>
            )}
          </div>
        );

      case "test":
        return (
          <div className="flex flex-col gap-5 py-2 text-center text-[#1C1917]">
            <h4 className="font-black text-lg uppercase tracking-wide font-lexend text-[#1C1917]">
              Kiểm tra năng lực tổng hợp
            </h4>
            
            {!testFinished ? (
              <div className="flex flex-col gap-4">
                <div className="w-full bg-gray-100 border-2 border-[#1C1917] rounded-full h-4 overflow-hidden">
                  <div className="bg-teal-primary h-full" style={{ width: `${(testStep / 3) * 100}%` }}></div>
                </div>
                
                {testStep === 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl border-2 border-[#1C1917]">
                      <p className="text-base font-bold text-gray-500 font-lexend">CÂU HỎI 1: ĐIỀN TỪ</p>
                      <p className="text-xl font-black font-lexend text-teal-dark mt-2">"Practice makes _____"</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {["perfect", "better", "easier", "harder"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            if (opt === "perfect") setTestScore(p => p + 1);
                            setTestStep(1);
                          }}
                          className="p-3 bg-white border-2 border-[#1C1917] rounded-xl font-bold font-lexend"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {testStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl border-2 border-[#1C1917]">
                      <p className="text-base font-bold text-gray-500 font-lexend">CÂU HỎI 2: DỊCH CÂU</p>
                      <p className="text-xl font-black font-lexend text-teal-dark mt-2">Dịch: "Time flies like an arrow"</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[
                        "Thời gian trôi nhanh như tên bắn.",
                        "Thời gian bay như một chiếc lá.",
                        "Mũi tên bay như thời gian.",
                        "Hãy nắm giữ lấy thời gian."
                      ].map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => {
                            if (i === 0) setTestScore(p => p + 1);
                            setTestStep(2);
                          }}
                          className="p-3 bg-white border-2 border-[#1C1917] rounded-xl font-bold font-lexend text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {testStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl border-2 border-[#1C1917]">
                      <p className="text-base font-bold text-gray-500 font-lexend">CÂU HỎI 3: NGỮ PHÁP</p>
                      <p className="text-xl font-black font-lexend text-teal-dark mt-2">"By this time next year, I _____ my degree."</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {["will complete", "will have completed", "completed", "have completed"].map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => {
                            let finalScore = testScore;
                            if (i === 1) finalScore += 1;
                            setTestScore(finalScore);
                            setTestFinished(true);
                            setXp(p => p + (finalScore * 15));
                            setGems(g => g + 20);
                            incrementQuestProgress("quest_2", 1);
                          }}
                          className="p-3 bg-white border-2 border-[#1C1917] rounded-xl font-bold font-lexend"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <div className="w-20 h-20 rounded-full bg-pastel-pink border-3 border-[#1C1917] flex items-center justify-center text-3xl font-black">
                  🎓
                </div>
                <h5 className="font-black text-xl font-lexend mt-2">
                  Kết quả: {testScore} / 3 Đúng
                </h5>
                <p className="text-xs text-gray-600 font-bold">
                  Bạn nhận được +{testScore * 15} XP và +20 Gems thưởng nỗ lực!
                </p>
                
                <button
                  onClick={() => {
                    setActiveActivity(null);
                    setTestStep(0);
                    setTestScore(0);
                    setTestFinished(false);
                  }}
                  className="w-full py-3 brutal-btn bg-teal-primary text-white mt-2"
                >
                  Xác nhận và kết thúc
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-4xl mx-auto font-lora ${fontSize === "large" ? "text-lg" : fontSize === "small" ? "text-xs" : "text-sm"}`}>
      <AnimatePresence mode="wait">
        {!activeActivity ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Header activity selector */}
            <div className="brutal-card bg-white p-5 flex items-center justify-between border-3 border-[#1C1917] relative">
              <div className="absolute inset-0 dots-grid opacity-25 pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-pastel-pink border-2 border-[#1C1917] flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal-primary fill-teal-primary" />
                </div>
                <div>
                  <h2 className="font-extrabold text-2xl tracking-tight uppercase leading-none font-lexend text-teal-dark">
                    Chọn Hoạt Động
                  </h2>
                  <span className="text-[10px] uppercase font-black text-gray-500 tracking-wider font-lexend">
                    Trung tâm luyện tập tiếng Anh chuyên sâu
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <div className="brutal-badge bg-vintage-cream font-lexend text-xs font-extrabold">
                  🇺🇸 Tiếng Anh
                </div>
              </div>
            </div>

            {/* Error review button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveActivity("error_review")}
              className="w-full py-4 brutal-btn bg-coral-highlight text-[#1C1917] flex items-center justify-center gap-2 border-3 border-[#1C1917] shadow-brutal text-sm font-black font-lexend"
            >
              <AlertCircle className="w-5 h-5" />
              ÔN LỖI SAI (12)
            </motion.button>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {activities.map((act) => {
                const Icon = act.icon;
                return (
                  <motion.div
                    key={act.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`brutal-card p-5 ${act.color} flex flex-col justify-between h-44 cursor-pointer border-3 border-[#1C1917] shadow-brutal`}
                    onClick={() => setActiveActivity(act.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-white border-2 border-[#1C1917] rounded-xl shadow-brutal-sm">
                        <Icon className="w-6 h-6 text-[#1C1917]" />
                      </div>
                      <span className="font-black font-lexend text-lg text-[#1C1917]">
                        {act.progress}%
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-black text-xl font-lexend tracking-tight text-[#1C1917]">
                        {act.title}
                      </h4>
                      {/* Brutal progress bar */}
                      <div className="w-full h-3.5 bg-white border-2 border-[#1C1917] rounded-md mt-2 overflow-hidden">
                        <div
                          className="h-full bg-teal-primary border-r border-[#1C1917]"
                          style={{ width: `${act.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="brutal-card bg-white p-6 border-3 border-[#1C1917] shadow-brutal max-w-2xl mx-auto relative"
          >
            <button
              onClick={() => setActiveActivity(null)}
              className="absolute top-4 left-4 p-1.5 rounded-lg border-2 border-[#1C1917] bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#1C1917]" />
            </button>
            <div className="pt-8">{renderActivityContent()}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
