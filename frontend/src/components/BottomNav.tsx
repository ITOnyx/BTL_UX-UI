"use client";

import React from "react";
import { GraduationCap, BarChart2, User, Home, Trophy } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const menuItems = [
    { id: "home", label: "HOME", icon: Home, color: "bg-pastel-pink" },
    { id: "learn", label: "LEARN", icon: GraduationCap, color: "bg-pastel-blue" },
    { id: "tasks", label: "TASKS", icon: Trophy, color: "bg-pastel-purple" },
    { id: "stats", label: "STATS", icon: BarChart2, color: "bg-pastel-green" },
    { id: "user", label: "USER", icon: User, color: "bg-orange-highlight" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-vintage-cream border-t-3 border-[#1C1917] flex items-center justify-around px-2 z-50 rounded-t-2xl shadow-[0px_-4px_0px_rgba(28,25,23,0.06)] select-none">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 transition-all ${
              isActive
                ? `${item.color} border-2 border-[#1C1917] shadow-[2px_2px_0px_#1C1917] rounded-xl -translate-y-1`
                : "text-gray-600 hover:text-[#1C1917]"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-black tracking-wider font-lexend uppercase">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
