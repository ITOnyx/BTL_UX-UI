"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, Award, Flame, Gift, CheckCircle, RefreshCw } from "lucide-react";

interface TasksViewProps {
  xp: number;
  setXp: (xp: number | ((prev: number) => number)) => void;
  gems: number;
  setGems: (gems: number | ((prev: number) => number)) => void;
  streak: number;
  setStreak: (streak: number | ((prev: number) => number)) => void;
  fontSize: "small" | "medium" | "large";
}

export default function TasksView({
  xp,
  setXp,
  gems,
  setGems,
  streak,
  setStreak,
  fontSize
}: TasksViewProps) {
  // Tasks state
  const [dailyTasks, setDailyTasks] = useState([
    { id: "dt_1", text: "Luyện học thuộc 10 từ vựng", current: 6, target: 10, xpReward: 20, gemsReward: 5, completed: false, claimed: false },
    { id: "dt_2", text: "Đạt từ 80% trở lên ở bài Kiểm tra", current: 0, target: 1, xpReward: 30, gemsReward: 10, completed: false, claimed: false },
    { id: "dt_3", text: "Hoàn thành 3 câu luyện nghe chính tả", current: 3, target: 3, xpReward: 15, gemsReward: 5, completed: true, claimed: false },
    { id: "dt_4", text: "Thực hành luyện nói trôi chảy 2 câu", current: 1, target: 2, xpReward: 25, gemsReward: 5, completed: false, claimed: false }
  ]);

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: "wt_1", text: "Duy trì chuỗi học tập đạt 5 ngày", current: 4, target: 5, xpReward: 100, gemsReward: 50, completed: false, claimed: false },
    { id: "wt_2", text: "Hoàn thành tổng cộng 50 từ vựng mới", current: 32, target: 50, xpReward: 80, gemsReward: 30, completed: false, claimed: false },
    { id: "wt_3", text: "Đạt mốc tích lũy 300 XP tuần này", current: 180, target: 300, xpReward: 120, gemsReward: 40, completed: false, claimed: false }
  ]);

  // Handle task claim
  const claimTask = (id: string, isWeekly = false) => {
    const list = isWeekly ? weeklyTasks : dailyTasks;
    const setList = isWeekly ? setWeeklyTasks : setDailyTasks;

    const task = list.find(t => t.id === id);
    if (!task || !task.completed || task.claimed) return;

    // Award rewards
    setXp(p => p + task.xpReward);
    setGems(g => g + task.gemsReward);

    setList(prev => prev.map(t => t.id === id ? { ...t, claimed: true } : t));
  };

  // Toggle state helper for demo (so user can play with completing them)
  const toggleTaskDemo = (id: string, isWeekly = false) => {
    const setList = isWeekly ? setWeeklyTasks : setDailyTasks;
    setList(prev => prev.map(t => {
      if (t.id === id) {
        const completed = !t.completed;
        const current = completed ? t.target : 0;
        return { ...t, completed, current, claimed: completed ? t.claimed : false };
      }
      return t;
    }));
  };

  // Streak roadmap representation (7 days)
  const roadmap = [
    { day: "Thứ 2", active: true, completed: true, label: "T2" },
    { day: "Thứ 3", active: true, completed: true, label: "T3" },
    { day: "Thứ 4", active: true, completed: true, label: "T4" },
    { day: "Thứ 5", active: true, completed: true, label: "T5" },
    { day: "Thứ 6", active: true, completed: false, label: "T6" }, // Today / Active streak
    { day: "Thứ 7", active: false, completed: false, label: "T7" },
    { day: "Chủ nhật", active: false, completed: false, label: "CN" }
  ];

  return (
    <div className={`p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-4xl mx-auto font-lora text-[#1C1917] ${fontSize === "large" ? "text-lg" : fontSize === "small" ? "text-xs" : "text-sm"}`}>
      {/* Header card */}
      <div className="brutal-card bg-white p-5 flex items-center justify-between border-3 border-[#1C1917] relative mb-6">
        <div className="absolute inset-0 dots-grid opacity-25 pointer-events-none"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-orange-highlight border-2 border-[#1C1917] flex items-center justify-center">
            <Award className="w-5 h-5 text-[#1C1917]" />
          </div>
          <div>
            <h2 className="font-extrabold text-2xl tracking-tight uppercase leading-none font-lexend text-teal-dark">
              Nhiệm Vụ Học Tập
            </h2>
            <span className="text-[10px] uppercase font-black text-gray-500 tracking-wider font-lexend">
              Thử thách nâng cấp kỹ năng hàng ngày & hàng tuần
            </span>
          </div>
        </div>
        <div className="brutal-badge bg-pastel-pink font-lexend text-xs font-extrabold">
          🎯 Quests Center
        </div>
      </div>

      {/* Streak Roadmap timeline card */}
      <div className="brutal-card bg-vintage-cream p-5 md:p-6 border-3 border-[#1C1917] shadow-brutal mb-8 relative overflow-hidden">
        <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-[#1C1917] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-[#1C1917] fill-white animate-pulse" />
            <div>
              <h3 className="font-black text-lg font-lexend">Lộ Trình Streak 7 Ngày</h3>
              <p className="text-xs text-gray-600 font-bold">Duy trì học tập mỗi ngày để nhận rương kho báu cuối tuần!</p>
            </div>
          </div>
          <div className="brutal-badge bg-white font-lexend font-black text-sm text-teal-dark">
            Chuỗi: {streak} ngày liên tiếp
          </div>
        </div>

        {/* Timeline roadmap visualization */}
        <div className="grid grid-cols-7 gap-2 md:gap-4 relative py-2">
          {/* Connector line behind */}
          <div className="absolute top-[40%] left-[8%] right-[8%] h-1.5 bg-gray-300 border-2 border-[#1C1917] z-0"></div>
          
          {roadmap.map((day, index) => {
            const isToday = index === 4; // Simulated today is Friday
            return (
              <div key={day.day} className="flex flex-col items-center gap-2 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-[#1C1917] flex items-center justify-center font-black font-lexend text-xs md:text-sm shadow-brutal-sm cursor-pointer transition-colors ${
                    day.completed
                      ? "bg-pastel-green text-[#1C1917]"
                      : isToday
                      ? "bg-orange-highlight text-[#1C1917] animate-pulse"
                      : "bg-white text-gray-400"
                  }`}
                  onClick={() => {
                    if (isToday && !day.completed) {
                      setStreak(p => p + 1);
                      day.completed = true;
                    }
                  }}
                >
                  {day.completed ? "✓" : day.label}
                </motion.div>
                <span className="text-[9px] md:text-xs font-black font-lexend text-gray-700">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quests Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Quests Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-extrabold text-xl uppercase tracking-wider font-lexend border-b-3 border-[#1C1917] pb-2">
            Nhiệm Vụ Hàng Ngày
          </h3>
          <div className="flex flex-col gap-4">
            {dailyTasks.map((task) => {
              const progressPercent = Math.min((task.current / task.target) * 100, 100);
              return (
                <div
                  key={task.id}
                  className={`brutal-card p-4 flex flex-col justify-between border-3 border-[#1C1917] shadow-brutal-sm hover:translate-y-[-1px] transition-all bg-white`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskDemo(task.id, false)}
                      className="mt-1 text-teal-primary hover:scale-105 transition-transform"
                    >
                      {task.completed ? <CheckSquare className="w-5 h-5 fill-white text-[#1C1917]" /> : <Square className="w-5 h-5" />}
                    </button>
                    <div className="flex-grow">
                      <p className={`font-black font-lexend text-sm ${task.completed ? "line-through text-gray-400" : ""}`}>
                        {task.text}
                      </p>
                      
                      <div className="w-full h-3 bg-gray-100 border-2 border-[#1C1917] rounded-md overflow-hidden mt-2">
                        <div className="bg-teal-primary h-full" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mt-1.5">
                        <span>Tiến độ: {task.current}/{task.target}</span>
                        <span className="text-teal-primary font-black font-lexend">+{task.xpReward} XP / +{task.gemsReward} Gems</span>
                      </div>
                    </div>
                  </div>

                  {task.completed && (
                    <button
                      onClick={() => claimTask(task.id, false)}
                      disabled={task.claimed}
                      className={`w-full mt-3 brutal-btn py-1.5 text-xs font-lexend ${
                        task.claimed
                          ? "bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed"
                          : "bg-pastel-green text-[#1C1917]"
                      }`}
                    >
                      {task.claimed ? "Đã nhận thưởng" : "Nhận phần thưởng!"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Quests Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-extrabold text-xl uppercase tracking-wider font-lexend border-b-3 border-[#1C1917] pb-2">
            Nhiệm Vụ Hàng Tuần
          </h3>
          <div className="flex flex-col gap-4">
            {weeklyTasks.map((task) => {
              const progressPercent = Math.min((task.current / task.target) * 100, 100);
              return (
                <div
                  key={task.id}
                  className="brutal-card p-4 flex flex-col justify-between border-3 border-[#1C1917] shadow-brutal-sm bg-white"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskDemo(task.id, true)}
                      className="mt-1 text-teal-primary"
                    >
                      {task.completed ? <CheckSquare className="w-5 h-5 fill-white text-[#1C1917]" /> : <Square className="w-5 h-5" />}
                    </button>
                    <div className="flex-grow">
                      <p className={`font-black font-lexend text-sm ${task.completed ? "line-through text-gray-400" : ""}`}>
                        {task.text}
                      </p>
                      
                      <div className="w-full h-3 bg-gray-100 border-2 border-[#1C1917] rounded-md overflow-hidden mt-2">
                        <div className="bg-orange-highlight h-full" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mt-1.5">
                        <span>Tiến độ: {task.current}/{task.target}</span>
                        <span className="text-teal-primary font-black font-lexend">+{task.xpReward} XP / +{task.gemsReward} Gems</span>
                      </div>
                    </div>
                  </div>

                  {task.completed && (
                    <button
                      onClick={() => claimTask(task.id, true)}
                      disabled={task.claimed}
                      className={`w-full mt-3 brutal-btn py-1.5 text-xs font-lexend ${
                        task.claimed
                          ? "bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed"
                          : "bg-pastel-purple text-[#1C1917]"
                      }`}
                    >
                      {task.claimed ? "Đã nhận thưởng" : "Nhận phần thưởng lớn!"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
