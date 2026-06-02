"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Award, BookOpen, Lock, Star, Settings } from "lucide-react";
import { DavidBust, AthenaBust, PaintingClassic } from "./ClassicIllustrations";
import SvgIcon from "./SvgIcon";

interface DashboardViewProps {
  xp: number;
  streak: number;
  activeAvatar: string;
  setActiveTab: (tab: string) => void;
  fontSize: "small" | "medium" | "large";
}

export default function DashboardView({
  xp,
  streak,
  activeAvatar,
  setActiveTab,
  fontSize
}: DashboardViewProps) {
  // Demo filter pill selections
  const [activeFilter, setActiveFilter] = useState<string>("target");

  const categories = [
    { id: "common", name: "Thông dụng", progress: 100, icon: "star", completed: true, locked: false, desc: "Từ vựng đàm thoại thông dụng nhất" },
    { id: "travel", name: "Du lịch", progress: 60, icon: "airplane", completed: false, locked: false, desc: "Sân bay, khách sạn, mua sắm" },
    { id: "daily", name: "Hàng ngày", progress: 45, icon: "coffee", completed: false, locked: false, desc: "Giao tiếp sinh hoạt hàng ngày" },
    { id: "business", name: "Thương mại", progress: 30, icon: "briefcase", completed: false, locked: false, desc: "Tiếng Anh công sở & doanh nghiệp" },
    { id: "tech", name: "Công nghệ", progress: 25, icon: "laptop", completed: false, locked: false, desc: "IT, khoa học, thiết bị số" },
    { id: "food", name: "Ẩm thực", progress: 15, icon: "fork-knife", completed: false, locked: false, desc: "Gọi món, món ăn, nhà hàng" },
    { id: "health", name: "Sức khỏe", progress: 10, icon: "stethoscope", completed: false, locked: false, desc: "Y tế, bệnh viện, cơ thể người" },
    { id: "entertainment", name: "Giải trí", progress: 5, icon: "film-reel", completed: false, locked: false, desc: "Phim ảnh, nghệ thuật, âm nhạc" },
    { id: "dialogue", name: "Hội thoại", progress: 0, icon: "lock", completed: false, locked: true, desc: "Hội thoại nâng cao (Cấp độ 5)" }
  ];

  const getAvatarComponent = (name: string) => {
    switch (name) {
      case "david":
        return <DavidBust className="w-full h-full" />;
      case "athena":
        return <AthenaBust className="w-full h-full" />;
      case "classic":
        return <PaintingClassic className="w-full h-full" />;
      default:
        return <DavidBust className="w-full h-full" />;
    }
  };

  return (
    <div className={`p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-4xl mx-auto font-lora text-[#1C1917] ${fontSize === "large" ? "text-lg" : fontSize === "small" ? "text-xs" : "text-sm"}`}>
      {/* Header and Brand */}
      <div className="flex items-center justify-between mb-6 border-b-3 border-[#1C1917] pb-4">
        <div className="flex items-center gap-3">
          <SvgIcon name="dictionary" className="w-7 h-7" />
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight uppercase leading-none font-lexend text-teal-primary">
              Linguist Vintage
            </h1>
            <span className="text-[10px] uppercase font-black text-gray-500 tracking-wider font-lexend">
              Hành trình học tiếng Anh cổ điển
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl border-2 border-[#1C1917] bg-white hover:bg-vintage-cream transition-colors">
            <Star className="w-4 h-4 text-[#1C1917] fill-white" />
          </button>
          <button className="p-2 rounded-xl border-2 border-[#1C1917] bg-white hover:bg-vintage-cream transition-colors">
            <Settings className="w-4 h-4 text-teal-primary" />
          </button>
        </div>
      </div>

      {/* Greeting card */}
      <div className="brutal-card bg-orange-highlight/15 p-6 border-3 border-[#1C1917] shadow-brutal mb-6 relative overflow-hidden">
        <div className="absolute inset-0 dots-grid opacity-25 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          
          {/* Text block & Widgets */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-black font-lexend text-teal-dark mb-1">
              Xin chào!
            </h2>
            <p className="text-sm font-serif italic text-gray-700 mb-5">
              Sẵn sàng học chưa? Hôm nay là một ngày tuyệt vời để học từ mới.
            </p>

            {/* Three horizontal stats widgets */}
            <div className="grid grid-cols-3 gap-3 max-w-md">
              <div className="brutal-card p-3 bg-white border-2 border-[#1C1917] flex flex-col items-center justify-center shadow-brutal-sm">
                <Flame className="w-5 h-5 text-[#1C1917] fill-white mb-1" />
                <span className="text-sm font-black font-lexend leading-none">{streak} days</span>
                <span className="text-[8px] uppercase font-black text-gray-400 mt-1 font-lexend tracking-widest">STREAK</span>
              </div>
              
              <div className="brutal-card p-3 bg-white border-2 border-[#1C1917] flex flex-col items-center justify-center shadow-brutal-sm">
                <Trophy className="w-5 h-5 text-[#1C1917] fill-white mb-1" />
                <span className="text-sm font-black font-lexend leading-none">{xp} XP</span>
                <span className="text-[8px] uppercase font-black text-gray-400 mt-1 font-lexend tracking-widest">XP</span>
              </div>
              
              <div className="brutal-card p-3 bg-white border-2 border-[#1C1917] flex flex-col items-center justify-center shadow-brutal-sm">
                <Award className="w-5 h-5 text-[#1C1917] fill-white mb-1" />
                <span className="text-sm font-black font-lexend leading-none">4 LEVEL</span>
                <span className="text-[8px] uppercase font-black text-gray-400 mt-1 font-lexend tracking-widest">LEVEL</span>
              </div>
            </div>
          </div>

          {/* Profile Bust Frame */}
          <div className="w-24 h-24 md:w-28 md:h-28 relative z-10 flex-shrink-0">
            {getAvatarComponent(activeAvatar)}
          </div>
        </div>
      </div>

      {/* Large button TIẾP TỤC HỌC */}
      <motion.button
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setActiveTab("learn")}
        className="w-full py-4 brutal-btn bg-teal-primary text-white text-base font-black font-lexend tracking-wide flex items-center justify-center gap-2.5 border-3 border-[#1C1917] shadow-brutal mb-6"
      >
        <BookOpen className="w-5 h-5" />
        TIẾP TỤC HỌC
      </motion.button>

      {/* Three minor filter pills */}
      <div className="flex gap-2.5 mb-6 justify-center md:justify-start">
        {[
          { id: "target", icon: "frame-corners", color: "bg-pastel-pink" },
          { id: "trophy", icon: "cup", color: "bg-[#E9A16C]" },
          { id: "medal", icon: "medal", color: "bg-pastel-blue" }
        ].map((pill) => (
          <button
            key={pill.id}
            onClick={() => setActiveFilter(pill.id)}
            className={`w-12 h-10 rounded-xl border-2 border-[#1C1917] flex items-center justify-center text-lg shadow-brutal-sm transition-all active:translate-y-[1px] active:shadow-[1px_1px_0px_#1C1917] ${
              activeFilter === pill.id ? pill.color : "bg-white"
            }`}
          >
            <SvgIcon name={pill.icon} className="w-5 h-5" />
          </button>
        ))}
      </div>

      {/* Grid of Vocabulary Categories (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`brutal-card p-4 flex items-center justify-between border-2 border-[#1C1917] shadow-brutal-sm transition-all ${
              cat.locked ? "bg-gray-100 opacity-60 border-dashed" : "bg-white hover:translate-y-[-1px]"
            }`}
          >
            <div className="flex-grow mr-4">
              <div className="flex items-center gap-2 mb-1.5">
                <SvgIcon name={cat.icon} className="w-5 h-5" />
                <h4 className="font-black text-base font-lexend tracking-tight text-[#1C1917]">
                  {cat.name}
                </h4>
              </div>
              <p className="text-[10px] text-gray-500 font-bold mb-2">{cat.desc}</p>
              
              {!cat.locked ? (
                <div className="w-full h-2.5 bg-gray-100 border border-[#1C1917] rounded-md overflow-hidden">
                  <div
                    className="h-full bg-teal-primary"
                    style={{ width: `${cat.progress}%` }}
                  ></div>
                </div>
              ) : (
                <span className="text-[9px] font-black text-gray-400 font-lexend uppercase tracking-wider">Khóa</span>
              )}
            </div>

            <div className="flex-shrink-0 text-right">
              {!cat.locked ? (
                <div>
                  <span className="font-black font-lexend text-xs text-teal-primary">
                    {cat.progress}%
                  </span>
                  <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">
                    {cat.completed ? "Hoàn thành" : "Đang học"}
                  </p>
                </div>
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
