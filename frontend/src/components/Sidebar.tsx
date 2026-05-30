"use client";

import React from "react";
import { GraduationCap, BarChart2, User, Home, Flame, Globe, Trophy } from "lucide-react";
import { DavidBust } from "./ClassicIllustrations";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xp: number;
  streak: number;
  gems: number;
  activeLanguage: { code: string; name: string; flag: string };
  setShowLangModal: (show: boolean) => void;
  accountName: string;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  xp,
  streak,
  gems,
  activeLanguage,
  setShowLangModal,
  accountName
}: SidebarProps) {
  const menuItems = [
    { id: "home", label: "Trang chủ", icon: Home, color: "bg-pastel-pink" },
    { id: "learn", label: "Thực hành", icon: GraduationCap, color: "bg-pastel-blue" },
    { id: "tasks", label: "Nhiệm vụ", icon: Trophy, color: "bg-pastel-purple" },
    { id: "stats", label: "Thống kê", icon: BarChart2, color: "bg-pastel-green" },
    { id: "user", label: "Cá nhân", icon: User, color: "bg-orange-highlight" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-vintage-cream border-r-3 border-[#1C1917] p-6 sticky top-0 justify-between select-none font-lora">
      {/* Brand Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border-3 border-[#1C1917] shadow-brutal-sm">
          <div className="w-12 h-12 flex-shrink-0">
            <DavidBust className="w-full h-full" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight uppercase leading-none text-teal-primary font-lexend">
              Linguist
            </h1>
            <span className="text-xs uppercase font-black text-gray-500 tracking-wider font-lexend">
              Vintage
            </span>
          </div>
        </div>

        {/* Global Streak & XP indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center bg-white border-3 border-[#1C1917] rounded-xl p-2 shadow-brutal-sm">
            <Flame className="w-5 h-5 text-orange-highlight fill-orange-highlight" />
            <span className="text-xs font-black mt-1 font-lexend">{streak} Ngày</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-3 border-[#1C1917] rounded-xl p-2 shadow-brutal-sm">
            <span className="text-[10px] font-bold text-gray-500 font-lexend">Gems</span>
            <span className="text-xs font-black font-lexend">{gems} 💎</span>
          </div>
        </div>

        {/* Active Language Selector Widget */}
        <button
          onClick={() => setShowLangModal(true)}
          className="flex items-center justify-between w-full bg-[#ffffff] hover:bg-vintage-beige border-3 border-[#1C1917] rounded-xl p-3 shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1917] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1C1917] transition-all font-lexend text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeLanguage.flag}</span>
            <span className="font-extrabold">{activeLanguage.name}</span>
          </div>
          <Globe className="w-4 h-4 text-teal-primary" />
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 w-full p-3 font-lexend text-sm font-extrabold rounded-xl border-3 border-[#1C1917] transition-all ${
                  isActive
                    ? `${item.color} translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_#1C1917]`
                    : "bg-white hover:bg-vintage-beige shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1C1917]"
                }`}
              >
                <div className={`p-1.5 rounded-lg border-2 border-[#1C1917] bg-white`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-gray-500 font-bold font-lexend border-t-2 border-dashed border-gray-300 pt-4">
        &copy; 2026 Linguist Vintage
      </div>
    </aside>
  );
}
