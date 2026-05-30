"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import DashboardView from "@/components/DashboardView";
import LearnView from "@/components/LearnView";
import TasksView from "@/components/TasksView";
import StatsView from "@/components/StatsView";
import UserView from "@/components/UserView";
import { Flame, Star, X } from "lucide-react";

const LANGUAGES = [
  { code: "en_comm", name: "Anh giao tiếp", flag: "🇺🇸" },
  { code: "en_ielts", name: "IELTS Academic", flag: "🇬🇧" },
  { code: "en_toeic", name: "TOEIC Đọc Nghe", flag: "💼" },
  { code: "en_kids", name: "English for Kids", flag: "🧸" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [xp, setXp] = useState(1250);
  const [gems, setGems] = useState(1450);
  const [streak, setStreak] = useState(5);
  const [activeLanguage, setActiveLanguage] = useState(LANGUAGES[0]);
  const [showLangModal, setShowLangModal] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState("david");

  // Settings State
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [notifications, setNotifications] = useState(true);
  const [accountName, setAccountName] = useState("Professor Julian");

  // Shop items state using gems
  const [shopItems, setShopItems] = useState([
    {
      id: "power_1",
      name: "Streak Freeze",
      desc: "Giữ nguyên chuỗi học tập ngay cả khi bạn bỏ lỡ một ngày học.",
      cost: 200,
      icon: "⏳",
      type: "powerup" as const,
      bought: false,
    },
    {
      id: "power_2",
      name: "Double XP",
      desc: "Nhân đôi toàn bộ XP nhận được trong vòng 15 phút tiếp theo.",
      cost: 500,
      icon: "⚡️",
      type: "powerup" as const,
      bought: false,
    },
    {
      id: "avatar_athena",
      name: "Tượng thần Athena",
      desc: "Mở khóa avatar Athena với vòng hào quang tri thức thiêng liêng.",
      cost: 1200,
      icon: "athena",
      type: "avatar" as const,
      bought: false,
    },
    {
      id: "avatar_painting",
      name: "Văn chương Thư viện",
      desc: "Mở khóa avatar Renaissance với cuộn sách và bút lông quý tộc.",
      cost: 2000,
      icon: "classic",
      type: "avatar" as const,
      bought: false,
    },
  ]);

  // Shop actions using Gems
  const buyItem = (id: string) => {
    const item = shopItems.find((i) => i.id === id);
    if (!item || item.bought || gems < item.cost) return;

    setGems((prev) => prev - item.cost);
    setShopItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, bought: true } : i))
    );
  };

  const equipItem = (iconName: string) => {
    setActiveAvatar(iconName);
  };

  // Achievements dataset derived dynamically
  const achievements = [
    {
      id: "ach_1",
      title: "Beginner",
      desc: "Bắt đầu hành trình bằng việc đạt 20 XP học tập.",
      icon: "📚",
      xpRequired: 20,
      unlocked: xp >= 20,
    },
    {
      id: "ach_2",
      title: "Word Master",
      desc: "Tích lũy đạt 500 từ vựng để bước vào học viện chuyên sâu.",
      icon: "🦉",
      xpRequired: 500,
      unlocked: xp >= 500,
    },
    {
      id: "ach_3",
      title: "Polyglot",
      desc: "Mở khóa danh hiệu học giả đa ngôn ngữ khi đạt cấp độ 5.",
      icon: "🏛️",
      xpRequired: 2000,
      unlocked: xp >= 2000,
    },
  ];

  // Increment Quest progress helper
  const incrementQuestProgress = (id: string, amount = 1) => {
    // Simply grants a mini bonus to XP and Gems
    setXp((p) => p + amount * 5);
    setGems((g) => g + amount * 2);
  };

  // Render correct view component based on activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return (
          <DashboardView
            xp={xp}
            streak={streak}
            gems={gems}
            activeAvatar={activeAvatar}
            setActiveTab={setActiveTab}
            fontSize={fontSize}
          />
        );
      case "learn":
        return (
          <LearnView
            xp={xp}
            setXp={setXp}
            gems={gems}
            setGems={setGems}
            incrementQuestProgress={incrementQuestProgress}
            fontSize={fontSize}
          />
        );
      case "tasks":
        return (
          <TasksView
            xp={xp}
            setXp={setXp}
            gems={gems}
            setGems={setGems}
            streak={streak}
            setStreak={setStreak}
            fontSize={fontSize}
          />
        );
      case "stats":
        return (
          <StatsView
            xp={xp}
            streak={streak}
            fontSize={fontSize}
          />
        );
      case "user":
        return (
          <UserView
            xp={xp}
            setXp={setXp}
            gems={gems}
            setGems={setGems}
            shopItems={shopItems}
            buyItem={buyItem}
            equipItem={equipItem}
            activeAvatar={activeAvatar}
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            notifications={notifications}
            setNotifications={setNotifications}
            accountName={accountName}
            setAccountName={setAccountName}
            achievements={achievements}
          />
        );
      default:
        return <div className="p-8">Đang tải trang...</div>;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${
      theme === "dark" ? "bg-[#1E465A] text-white" : "bg-vintage-beige text-[#1C1917]"
    } overflow-x-hidden`}>
      
      {/* Global Sidebar (Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        streak={streak}
        gems={gems}
        activeLanguage={activeLanguage}
        setShowLangModal={setShowLangModal}
        accountName={accountName}
      />

      {/* Mobile Header */}
      <header className="lg:hidden w-full bg-vintage-cream border-b-3 border-[#1C1917] p-4 flex items-center justify-between z-40 sticky top-0 text-[#1C1917]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          <h1 className="font-extrabold text-sm uppercase tracking-wider text-teal-primary font-lexend">
            Linguist Vintage
          </h1>
        </div>
        
        {/* Streak Widget Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLangModal(true)}
            className="flex items-center gap-1 bg-white border-2 border-[#1C1917] px-2.5 py-1 rounded-lg text-xs font-bold font-lexend"
          >
            <span>{activeLanguage.flag}</span>
            <span>{activeLanguage.name}</span>
          </button>
          
          <div className="flex items-center gap-1 bg-white border-2 border-[#1C1917] px-2.5 py-1 rounded-lg text-xs font-black font-lexend">
            <Flame className="w-3.5 h-3.5 text-orange-highlight fill-orange-highlight" />
            <span>{streak}d</span>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-grow w-full overflow-y-auto min-h-screen flex flex-col pt-2 lg:pt-0 pb-16 lg:pb-0">
        {/* Switch transitions with Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + activeLanguage.code + theme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-grow w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Language / Course Selection Modal */}
      <AnimatePresence>
        {showLangModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="brutal-card bg-vintage-cream w-full max-w-sm p-6 relative overflow-hidden text-[#1C1917]"
            >
              <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setShowLangModal(false)}
                className="absolute top-4 right-4 p-1 rounded-md border-2 border-[#1C1917] bg-white hover:bg-red-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-black text-lg uppercase tracking-wide font-lexend text-[#1C1917] mb-1">
                Lọc Khóa Học Anh Ngữ
              </h3>
              <p className="text-xs text-gray-500 font-bold mb-4">Chọn chương trình học tiếng Anh phù hợp với mục tiêu</p>

              <div className="flex flex-col gap-3">
                {LANGUAGES.map((lang) => {
                  const isSelected = activeLanguage.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setActiveLanguage(lang);
                        setShowLangModal(false);
                      }}
                      className={`flex items-center justify-between w-full p-3 font-lexend font-extrabold rounded-xl border-3 border-[#1C1917] transition-all text-sm ${
                        isSelected
                          ? "bg-teal-primary text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_#1C1917]"
                          : "bg-white hover:bg-vintage-beige shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1C1917]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {isSelected && <Star className="w-4 h-4 fill-white text-white" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
