"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, Target, BookOpen, Mic, FileText, Headphones } from "lucide-react";
import SvgIcon from "./SvgIcon";

interface StatsViewProps {
  xp: number;
  streak: number;
  fontSize: "small" | "medium" | "large";
}

export default function StatsView({ fontSize }: StatsViewProps) {
  // 1. Weekly XP Data (matching the mockup visual columns)
  const weeklyXP = [
    { day: "T2", xp: 35, color: "bg-teal-primary" },
    { day: "T3", xp: 55, color: "bg-teal-primary" },
    { day: "T4", xp: 42, color: "bg-teal-primary" },
    { day: "T5", xp: 75, color: "bg-orange-highlight" }, // Highlighted today/T5 column
    { day: "T6", xp: 62, color: "bg-teal-primary" },
    { day: "T7", xp: 28, color: "bg-teal-primary" },
    { day: "CN", xp: 85, color: "bg-pastel-pink" }
  ];
  
  const maxWeeklyXP = 90;

  // 2. Skill Radar Coordinates (for a 5-axis chart in 200x200 SVG)
  // Center is (100, 100). Radius is 70.
  // Axis angles: Vocab (top: -Math.PI / 2), Speak (right-ish), Grammar (bottom-right-ish), Listen (bottom-left-ish), Write (left-ish)
  const skills = [
    { name: "VOCAB", value: 0.85, angle: -Math.PI / 2 },
    { name: "SPEAK", value: 0.65, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { name: "GRAMMAR", value: 0.75, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { name: "LISTEN", value: 0.45, angle: -Math.PI / 2 + (6 * Math.PI) / 5 }, // Needs improvement
    { name: "WRITE", value: 0.60, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  // Calculate coordinates for skills polygon
  const getRadarPoints = () => {
    return skills
      .map((s) => {
        const r = 70 * s.value;
        const x = 100 + r * Math.cos(s.angle);
        const y = 100 + r * Math.sin(s.angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Generate background ring coordinates
  const getGridPoints = (level: number) => {
    return skills
      .map((s) => {
        const r = 70 * level;
        const x = 100 + r * Math.cos(s.angle);
        const y = 100 + r * Math.sin(s.angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // 3. Monthly Progress Line Chart curves
  // 6 months (T1 to T6)
  // curves for Vocab (purple), Grammar (blue), Listen (green), Speak (orange)
  const months = ["T1", "T2", "T3", "T4", "T5", "T6"];
  const progressLines = [
    {
      name: "Vocab",
      color: "#DDD6FE", // purple
      stroke: "#9F7AEA",
      points: [25, 38, 55, 70, 95, 110]
    },
    {
      name: "Grammar",
      color: "#C7E7FF", // blue
      stroke: "#4299E1",
      points: [15, 25, 45, 50, 68, 85]
    },
    {
      name: "Listen",
      color: "#A7F3D0", // green
      stroke: "#48BB78",
      points: [8, 12, 18, 22, 28, 30]
    },
    {
      name: "Speak",
      color: "#E9A16C", // orange
      stroke: "#DD6B20",
      points: [40, 52, 48, 65, 82, 105]
    }
  ];

  const getLinePath = (points: number[]) => {
    return points
      .map((val, idx) => {
        const x = 30 + idx * 48;
        const y = 110 - (val / 120) * 85;
        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className={`p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-4xl mx-auto font-lora text-[#1C1917] ${fontSize === "large" ? "text-lg" : fontSize === "small" ? "text-xs" : "text-sm"}`}>
      {/* Title */}
      <div className="flex flex-col gap-1.5 mb-6 text-center">
        <h2 className="font-extrabold text-3xl tracking-tight uppercase font-lexend text-teal-primary">
          Linguist Vintage
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider font-lexend">
          Hành trình chinh phục ngôn ngữ qua những con số
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Card 1: Weekly XP Bar Chart */}
        <div className="brutal-card bg-white p-5 flex flex-col justify-between border-3 border-[#1C1917] shadow-brutal-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-lg uppercase tracking-wide font-lexend flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-primary" />
              Weekly XP
            </h3>
            <span className="brutal-badge bg-vintage-cream text-[9px] font-black font-lexend uppercase">
              TUẦN NÀY
            </span>
          </div>

          {/* Bar Chart Display with dashed line overlay */}
          <div className="relative h-44 border-b-3 border-[#1C1917] flex justify-between items-end px-2 pt-6">
            
            {/* Dashed trendline overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 320 176">
              <path
                d="M 22 130 Q 68 115 114 125 T 206 72 T 298 52"
                fill="none"
                stroke="#E9A16C"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            </svg>

            {weeklyXP.map((dayXP, idx) => {
              const heightPercent = (dayXP.xp / maxWeeklyXP) * 100;
              return (
                <div key={dayXP.day} className="flex flex-col items-center w-8 relative z-10 group">
                  <div className="relative w-full bg-gray-50 border-x-2 border-t-2 border-[#1C1917] rounded-t-md overflow-hidden flex items-end" style={{ height: "115px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                      className={`w-full ${dayXP.color} border-t-2 border-[#1C1917]`}
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(28,25,23,0.06) 4px, rgba(28,25,23,0.06) 8px)"
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-black font-lexend text-gray-700 mt-2">{dayXP.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Skill Radar Chart */}
        <div className="brutal-card bg-white p-5 flex flex-col items-center justify-between border-3 border-[#1C1917] shadow-brutal-sm text-center">
          <div className="w-full text-left mb-2">
            <h3 className="font-black text-lg uppercase tracking-wide font-lexend flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-highlight" />
              Skill Radar
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase font-lexend mt-0.5">Biểu đồ ngũ giác năng lực</p>
          </div>

          {/* SVG Radar */}
          <div className="w-48 h-48 relative my-1">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              {/* Concentric Grid lines */}
              <polygon points={getGridPoints(1)} fill="none" stroke="#1C1917" strokeWidth="1.5" />
              <polygon points={getGridPoints(0.7)} fill="none" stroke="#1C1917" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points={getGridPoints(0.4)} fill="none" stroke="#1C1917" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Axis Web lines */}
              {skills.map((s, idx) => {
                const x = 100 + 70 * Math.cos(s.angle);
                const y = 100 + 70 * Math.sin(s.angle);
                return (
                  <line key={idx} x1="100" y1="100" x2={x} y2={y} stroke="#1C1917" strokeWidth="1.5" />
                );
              })}

              {/* Data Area Polygon */}
              <motion.polygon
                points={getRadarPoints()}
                fill="rgba(42,93,119,0.25)"
                stroke="#2A5D77"
                strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                style={{ transformOrigin: "100px 100px" }}
              />

              {/* Skill Labels */}
              {skills.map((s, idx) => {
                const offset = 85;
                const x = 100 + offset * Math.cos(s.angle);
                const y = 100 + offset * Math.sin(s.angle);
                let anchor: "inherit" | "end" | "middle" | "start" = "middle";
                if (Math.abs(Math.cos(s.angle)) > 0.3) {
                  anchor = Math.cos(s.angle) > 0 ? "start" : "end";
                }
                return (
                  <text
                    key={idx}
                    x={x}
                    y={y + 3}
                    textAnchor={anchor}
                    fill="#1C1917"
                    className="font-lexend font-black text-[9px] tracking-wider"
                  >
                    {s.name}
                  </text>
                );
              })}
            </svg>
          </div>

          <p className="text-[10px] font-black text-coral-highlight uppercase tracking-wider font-lexend mt-2">
            <span className="inline-flex items-center gap-1">
              <SvgIcon name="ear" className="w-4 h-4" />
              Kỹ năng nghe cần cải thiện.
            </span>
          </p>
        </div>
      </div>

      {/* Sub-cards: 4 Skills detailed metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Từ vựng", value: "1.2k", change: "+12%", icon: BookOpen, color: "bg-pastel-pink", dashed: false },
          { title: "Nói", value: "45h", change: "+5%", icon: Mic, color: "bg-orange-highlight/25", dashed: false },
          { title: "Ngữ pháp", value: "88%", change: "ỔN ĐỊNH", icon: FileText, color: "bg-[#DDD6FE]/30", dashed: false },
          { title: "Nghe", value: "12h", change: "-2%", icon: Headphones, color: "bg-white", dashed: true }
        ].map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={idx}
              className={`brutal-card p-3 flex flex-col justify-between items-center text-center border-2 border-[#1C1917] h-24 ${
                skill.dashed ? "border-dashed bg-gray-50 shadow-none" : `${skill.color} shadow-brutal-sm`
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-teal-dark" />
                <span className="text-[10px] font-black font-lexend uppercase text-gray-500">{skill.title}</span>
              </div>
              <h4 className="text-xl font-black font-lexend text-teal-dark leading-none">{skill.value}</h4>
              <span className={`text-[8px] font-black font-lexend uppercase tracking-wider ${
                skill.change.includes("+") ? "text-green-600" : skill.change.includes("-") ? "text-red-500" : "text-gray-400"
              }`}>
                {skill.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Monthly Progress curves */}
      <div className="brutal-card bg-white p-5 border-3 border-[#1C1917] shadow-brutal mb-8">
        <h3 className="font-black text-lg uppercase tracking-wide font-lexend flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-teal-primary" />
          Tiến độ tháng
        </h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase font-lexend mb-4">Lịch sử tích lũy các kỹ năng năm nay</p>

        {/* SVG Line Chart */}
        <div className="w-full px-2 my-2 h-40">
          <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
            {/* Grid meshes */}
            <line x1="20" y1="10" x2="280" y2="10" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="20" y1="50" x2="280" y2="50" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="20" y1="90" x2="280" y2="90" stroke="#1C1917" strokeWidth="2" />
            
            {/* Progress Lines */}
            {progressLines.map((line, idx) => (
              <motion.path
                key={idx}
                d={getLinePath(line.points)}
                fill="none"
                stroke={line.stroke}
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: idx * 0.1 }}
              />
            ))}

            {/* Labels */}
            {months.map((m, idx) => {
              const x = 30 + idx * 48;
              return (
                <text key={idx} x={x} y="112" textAnchor="middle" fill="#4B5563" className="font-lexend font-black text-[9px]">{m}</text>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center flex-wrap mt-3 border-t border-dashed border-gray-300 pt-3">
          {progressLines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs font-bold font-lexend">
              <span className="w-3 h-3 rounded border border-[#1C1917]" style={{ backgroundColor: line.stroke }}></span>
              <span>{line.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4: Ancient Bookworm / Mọt Sách Cổ */}
      <div className="brutal-card p-6 bg-[#8C6D4F] text-white border-3 border-[#1C1917] shadow-brutal flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden">
        <div className="absolute inset-0 dots-grid opacity-15 pointer-events-none"></div>
        <div className="w-16 h-16 rounded-full bg-orange-highlight border-3 border-[#1C1917] flex items-center justify-center text-3xl shadow-brutal-sm flex-shrink-0 animate-bounce">
          <SvgIcon name="medal" className="w-9 h-9" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-black font-lexend uppercase tracking-wide">Mọt Sách Cổ</h3>
          <p className="text-xs text-orange-highlight font-black font-lexend mt-0.5">Bạn đã duy trì chuỗi 30 ngày!</p>
        </div>
        <button className="brutal-btn bg-[#1C1917] text-white text-xs py-2.5 px-6 font-lexend">
          XEM TẤT CẢ
        </button>
      </div>

    </div>
  );
}
