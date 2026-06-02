/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Check, Settings, Moon, Sun, Bell, Type, UserCheck } from "lucide-react";
import { DavidBust, AthenaBust, PaintingClassic } from "./ClassicIllustrations";
import SvgIcon from "./SvgIcon";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  icon: string;
  type: "powerup" | "avatar" | "theme";
  equipped?: boolean;
  bought: boolean;
}

interface UserViewProps {
  xp: number;
  gems: number;
  shopItems: ShopItem[];
  buyItem: (id: string) => void;
  equipItem: (id: string) => void;
  activeAvatar: string;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
  notifications: boolean;
  setNotifications: (notif: boolean) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  achievements: { id: string; title: string; desc: string; icon: string; xpRequired: number; unlocked: boolean }[];
}

export default function UserView({
  xp,
  gems,
  shopItems,
  buyItem,
  equipItem,
  activeAvatar,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  notifications,
  setNotifications,
  accountName,
  setAccountName,
  achievements
}: UserViewProps) {
  type UserSubTab = "profile" | "shop" | "settings";
  const [activeSubTab, setActiveSubTab] = useState<UserSubTab>("profile");
  const [editNameInput, setEditNameInput] = useState(accountName);
  const [showSaveMsg, setShowSaveMsg] = useState(false);

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

  const handleSaveProfile = () => {
    if (editNameInput.trim() !== "") {
      setAccountName(editNameInput);
      setShowSaveMsg(true);
      setTimeout(() => setShowSaveMsg(false), 2000);
    }
  };

  return (
    <div className={`p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-4xl mx-auto font-lora text-[#1C1917] ${fontSize === "large" ? "text-lg" : fontSize === "small" ? "text-xs" : "text-sm"}`}>
      {/* Upper Navigation Tabs inside User View */}
      <div className="flex gap-3 mb-6 select-none">
        {(["profile", "shop", "settings"] as UserSubTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 font-lexend font-black uppercase text-xs rounded-xl border-2 border-[#1C1917] shadow-brutal-sm transition-all active:translate-y-[1px] active:shadow-[1px_1px_0px_#1C1917] ${
              activeSubTab === tab
                ? "bg-teal-primary text-white"
                : "bg-white text-gray-700 hover:bg-vintage-cream"
            }`}
          >
            {tab === "profile" ? "Hồ Sơ & Danh Hiệu" : tab === "shop" ? "Cửa Hàng Gem" : "Cài Đặt"}
          </button>
        ))}
      </div>

      {activeSubTab === "profile" && (
        <div className="flex flex-col gap-6">
          {/* Profile Section */}
          <div className="brutal-card bg-white p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden border-3 border-[#1C1917]">
            <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>

            {/* Big Avatar Frame */}
            <div className="w-28 h-28 md:w-32 md:h-32 relative z-10 flex-shrink-0">
              {getAvatarComponent(activeAvatar)}
              <div className="absolute -bottom-2 right-2 brutal-badge bg-orange-highlight text-[9px] font-black font-lexend py-0.5 px-2 border-2 border-[#1C1917] uppercase">
                LVL 4
              </div>
            </div>

            {/* Profile Stats */}
            <div className="flex-grow z-10 text-center md:text-left">
              <div className="inline-flex brutal-badge bg-pastel-pink text-xs text-[#1C1917] mb-2 font-black uppercase font-lexend">
                Linguistics Scholar
              </div>
              <h2 className="text-3xl font-extrabold mb-1 font-lexend uppercase tracking-tight text-teal-dark">
                {accountName}
              </h2>
              <p className="text-xs text-gray-500 font-bold mb-3 italic">
                "Hành trình vạn dặm bắt đầu từ việc học một từ mới mỗi ngày."
              </p>
              
              {/* Level Progress */}
              <div className="max-w-md">
                <div className="flex justify-between items-center text-xs font-bold font-lexend text-gray-600 mb-1.5">
                  <span>Tiến độ cấp độ: 75%</span>
                  <span>750 / 1000 XP</span>
                </div>
                <div className="w-full h-5 bg-gray-100 border-2 border-[#1C1917] rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-teal-primary border-r-2 border-[#1C1917]"
                    style={{ width: "75%", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(28,25,23,0.06) 6px, rgba(28,25,23,0.06) 12px)" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Balances */}
            <div className="flex flex-col gap-3 self-stretch md:self-auto min-w-[130px]">
              <div className="brutal-card p-3 bg-vintage-cream border-2 border-[#1C1917] flex flex-col items-center justify-center text-center shadow-brutal-sm">
                <span className="text-[9px] uppercase font-extrabold font-lexend text-gray-500 mb-0.5">Tích lũy XP</span>
                <span className="text-xl font-black font-lexend text-teal-primary">{xp} XP</span>
              </div>
              <div className="brutal-card p-3 bg-[#C7E7FF] border-2 border-[#1C1917] flex flex-col items-center justify-center text-center shadow-brutal-sm">
                <span className="text-[9px] uppercase font-extrabold font-lexend text-gray-500 mb-0.5">Gems sở hữu</span>
                <span className="text-xl font-black font-lexend text-[#1E465A] inline-flex items-center gap-1">
                  {gems} <SvgIcon name="cube" className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="mt-4">
            <h3 className="font-black text-xl uppercase tracking-wider font-lexend mb-3 text-[#1C1917] border-b-2 border-[#1C1917] pb-1">
              <span className="inline-flex items-center gap-2">
                <SvgIcon name="cup" className="w-6 h-6" />
                Achievements Preview (Danh hiệu đạt được)
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className={`brutal-card p-4 flex gap-4 items-center border-2 border-[#1C1917] shadow-brutal-sm ${
                    item.unlocked ? "bg-white" : "bg-gray-100 opacity-60 border-dashed"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full border-2 border-[#1C1917] flex items-center justify-center text-xl flex-shrink-0 shadow-[2px_2px_0px_#1C1917] ${item.unlocked ? "bg-pastel-pink" : "bg-gray-300"}`}>
                    {item.unlocked ? <SvgIcon name={item.icon} className="w-6 h-6" /> : <SvgIcon name="lock" className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wide font-lexend leading-tight text-[#1C1917]">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-gray-500 font-bold leading-normal mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "shop" && (
        <div className="flex flex-col gap-6">
          {/* Shop Header */}
          <div className="brutal-card bg-[#C7E7FF] p-5 flex justify-between items-center border-2 border-[#1C1917]">
            <div>
              <h3 className="font-black text-lg uppercase tracking-wide font-lexend text-teal-dark mb-0.5">
                <span className="inline-flex items-center gap-2">
                  <SvgIcon name="storefront" className="w-6 h-6" />
                  Cửa Hàng Gem
                </span>
              </h3>
              <p className="text-xs text-gray-600 font-bold">Quy đổi đá quý Gems thu được từ việc hoàn thành nhiệm vụ lấy bổ trợ</p>
            </div>
            <div className="brutal-badge bg-white font-lexend text-sm font-black py-2 px-4">
              Số Gems: {gems} <SvgIcon name="cube" className="w-4 h-4" />
            </div>
          </div>

          {/* Shop Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shopItems.map((item) => {
              const isEquipped = activeAvatar === item.icon;
              return (
                <div
                  key={item.id}
                  className="brutal-card bg-white p-4 flex justify-between items-center gap-4 border-2 border-[#1C1917] shadow-brutal-sm"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-pastel-purple border-2 border-[#1C1917] flex items-center justify-center text-xl flex-shrink-0 shadow-[2px_2px_0px_#1C1917]">
                      <SvgIcon name={item.type === "avatar" ? "palette" : item.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-black text-sm uppercase tracking-wide font-lexend text-[#1C1917]">
                        {item.name}
                      </h5>
                      <p className="text-[10px] text-gray-500 font-bold leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  {item.bought ? (
                    item.type === "avatar" ? (
                      <button
                        onClick={() => equipItem(item.icon)}
                        className={`brutal-btn py-2 px-3 text-xs font-lexend ${
                          isEquipped ? "bg-pastel-green text-[#1C1917]" : "bg-white"
                        }`}
                      >
                        {isEquipped ? "Đang dùng" : "Trang bị"}
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">Đã sở hữu</span>
                    )
                  ) : (
                    <button
                      onClick={() => buyItem(item.id)}
                      disabled={gems < item.cost}
                      className={`brutal-btn py-2.5 px-4 text-xs font-lexend ${
                        gems < item.cost
                          ? "bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none"
                          : "bg-teal-primary text-white"
                      }`}
                    >
                      {item.cost} <SvgIcon name="cube" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === "settings" && (
        <div className="brutal-card bg-white p-6 border-3 border-[#1C1917] shadow-brutal flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b-2 border-[#1C1917] pb-3 mb-1">
            <Settings className="w-6 h-6 text-teal-primary" />
            <h3 className="font-black text-lg uppercase tracking-wide font-lexend">Cài Đặt Ứng Dụng</h3>
          </div>

          {/* Theme Settings */}
          <div className="flex flex-col gap-2.5">
            <label className="font-black text-sm uppercase font-lexend text-gray-700 flex items-center gap-2">
              <Sun className="w-4 h-4" /> Giao diện hiển thị
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`py-3 rounded-xl border-2 border-[#1C1917] font-lexend font-extrabold flex justify-center items-center gap-2 shadow-brutal-sm active:translate-y-[1px] ${
                  theme === "light" ? "bg-orange-highlight text-[#1C1917]" : "bg-white"
                }`}
              >
                <Sun className="w-4 h-4" /> Sáng (Retro Cream)
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`py-3 rounded-xl border-2 border-[#1C1917] font-lexend font-extrabold flex justify-center items-center gap-2 shadow-brutal-sm active:translate-y-[1px] ${
                  theme === "dark" ? "bg-teal-dark text-white" : "bg-white"
                }`}
              >
                <Moon className="w-4 h-4" /> Tối (Midnight Library)
              </button>
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="flex flex-col gap-2.5">
            <label className="font-black text-sm uppercase font-lexend text-gray-700 flex items-center gap-2">
              <Type className="w-4 h-4" /> Cỡ chữ hiển thị
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-2.5 rounded-xl border-2 border-[#1C1917] font-lexend font-black uppercase text-xs shadow-brutal-sm active:translate-y-[1px] ${
                    fontSize === size ? "bg-pastel-purple text-[#1C1917]" : "bg-white"
                  }`}
                >
                  {size === "small" ? "Nhỏ" : size === "medium" ? "Vừa" : "Lớn"}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Notifications */}
          <div className="flex justify-between items-center p-3 rounded-xl border-2 border-[#1C1917] bg-vintage-cream/30">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-teal-primary" />
              <div>
                <p className="font-black text-sm font-lexend">Nhắc nhở học tập hàng ngày</p>
                <p className="text-[10px] text-gray-500 font-bold">Gửi thông báo đẩy để duy trì Streak của bạn</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full border-2 border-[#1C1917] relative transition-colors ${
                notifications ? "bg-pastel-green" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white border border-[#1C1917] absolute top-[2px] transition-all ${
                  notifications ? "right-[2px]" : "left-[2px]"
                }`}
              ></div>
            </button>
          </div>

          {/* Account Profile Edit */}
          <div className="flex flex-col gap-2.5">
            <label className="font-black text-sm uppercase font-lexend text-gray-700 flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Quản lý tài khoản
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={editNameInput}
                onChange={(e) => setEditNameInput(e.target.value)}
                placeholder="Tên học giả của bạn..."
                className="flex-grow bg-[#F5F2E9] border-2 border-[#1C1917] rounded-xl px-4 py-2 font-black font-lexend text-sm focus:outline-none focus:bg-white"
              />
              <button
                onClick={handleSaveProfile}
                className="brutal-btn bg-teal-primary text-white text-xs px-5 py-2.5"
              >
                Cập nhật
              </button>
            </div>
            {showSaveMsg && (
              <p className="text-xs font-black text-pastel-green bg-teal-dark px-3 py-1 border-2 border-[#1C1917] rounded-lg inline-block self-start font-lexend">
                <Check className="w-4 h-4" /> Đã cập nhật tên tài khoản thành công!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
