/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
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

interface ShopViewProps {
  xp: number;
  shopItems: ShopItem[];
  buyItem: (id: string) => void;
  equipItem: (id: string) => void;
  activeAvatar: string;
}

export default function ShopView({
  xp,
  shopItems,
  buyItem,
  equipItem,
  activeAvatar,
}: ShopViewProps) {
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
    <div className="flex flex-col gap-6 p-4 md:p-8 pb-20 lg:pb-8 w-full max-w-6xl mx-auto font-lora">
      {/* Profile Section */}
      <div className="brutal-card bg-white p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 dots-grid opacity-20 pointer-events-none"></div>

        {/* Big Avatar Frame */}
        <div className="w-28 h-28 md:w-32 md:h-32 relative z-10 flex-shrink-0">
          {getAvatarComponent(activeAvatar)}
        </div>

        {/* Profile Stats */}
        <div className="flex-grow z-10 text-center md:text-left">
          <div className="inline-flex brutal-badge bg-pastel-pink text-xs text-[#1C1917] mb-2 font-black uppercase font-lexend">
            Học giả Danh dự
          </div>
          <h2 className="text-3xl font-extrabold mb-1 font-lexend uppercase tracking-tight text-[#1C1917]">
            Marcus Aurelius
          </h2>
          <p className="text-sm font-serif italic text-gray-500 mb-3">
            "Mọi thứ chúng ta nghe thấy đều là ý kiến, không phải sự thật."
          </p>
          
          {/* Level Progress */}
          <div className="max-w-md">
            <div className="flex justify-between items-center text-xs font-bold font-lexend text-gray-600 mb-1.5">
              <span>Cấp học giả: 5</span>
              <span>Tiến độ cấp: 80%</span>
            </div>
            <div className="w-full h-5 bg-gray-100 border-2 border-[#1C1917] rounded-lg overflow-hidden relative">
              <div
                className="h-full bg-orange-highlight border-r-2 border-[#1C1917]"
                style={{ width: "80%", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(28,25,23,0.06) 6px, rgba(28,25,23,0.06) 12px)" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Balance Stat Card */}
        <div className="brutal-card p-4 bg-vintage-cream border-3 border-[#1C1917] flex flex-col items-center justify-center text-center self-stretch md:self-auto min-w-[140px]">
          <span className="text-xs uppercase font-extrabold font-lexend text-gray-500 mb-1">XP Sở Hữu</span>
          <span className="text-3xl font-black font-lexend text-teal-primary">{xp} XP</span>
        </div>
      </div>

      {/* Shop items grids divided by categories */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-black text-xl uppercase tracking-wider font-lexend mb-1 text-[#1C1917]">
            Cửa Hàng Cổ Điển
          </h3>
          <p className="text-xs text-gray-500 font-bold">Quy đổi điểm kinh nghiệm (XP) lấy vật phẩm học thuật</p>
        </div>

        {/* Section: Powerups */}
        <div>
          <h4 className="font-extrabold text-sm uppercase tracking-wide font-lexend text-teal-primary mb-3">
            Vật Phẩm Hỗ Trợ (Power-ups)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shopItems
              .filter((item) => item.type === "powerup")
              .map((item) => (
                <div
                  key={item.id}
                  className="brutal-card bg-white p-4 flex justify-between items-center gap-4 hover:translate-y-[-1px] transition-all"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-pastel-purple border-2 border-[#1C1917] flex items-center justify-center text-xl flex-shrink-0 shadow-[2px_2px_0px_#1C1917]">
                      <SvgIcon name={item.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-black text-sm uppercase tracking-wide font-lexend text-[#1C1917]">
                        {item.name}
                      </h5>
                      <p className="text-[10px] text-gray-500 font-bold leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => buyItem(item.id)}
                    disabled={xp < item.cost && !item.bought}
                    className={`brutal-btn py-2 px-4 text-xs font-lexend ${
                      item.bought
                        ? "bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed"
                        : xp < item.cost
                        ? "bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none"
                        : "bg-teal-primary text-white"
                    }`}
                  >
                    {item.bought ? "Đã mua" : `${item.cost} XP`}
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Section: Classical Avatars */}
        <div>
          <h4 className="font-extrabold text-sm uppercase tracking-wide font-lexend text-orange-highlight mb-3">
            Bức Tượng & Tranh Vẽ Minh Họa
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shopItems
              .filter((item) => item.type === "avatar")
              .map((item) => {
                const isEquipped = activeAvatar === item.icon;
                return (
                  <div
                    key={item.id}
                    className="brutal-card bg-white p-4 flex flex-col justify-between items-center text-center gap-4 hover:translate-y-[-1px] transition-all"
                  >
                    <div className="w-24 h-24 relative rounded-full border-2 border-[#1C1917] overflow-hidden">
                      {getAvatarComponent(item.icon)}
                    </div>

                    <div>
                      <h5 className="font-black text-sm uppercase tracking-wide font-lexend text-[#1C1917]">
                        {item.name}
                      </h5>
                      <p className="text-[9px] text-gray-500 font-bold mt-0.5">{item.desc}</p>
                    </div>

                    {/* Action buttons (Buy / Equip) */}
                    {item.bought ? (
                      <button
                        onClick={() => equipItem(item.icon)}
                        className={`w-full py-2 brutal-btn text-xs font-lexend ${
                          isEquipped ? "bg-pastel-green text-[#1c1917]" : "bg-white"
                        }`}
                      >
                        {isEquipped ? "Đang sử dụng" : "Trang bị"}
                      </button>
                    ) : (
                      <button
                        onClick={() => buyItem(item.id)}
                        disabled={xp < item.cost}
                        className={`w-full py-2 brutal-btn text-xs font-lexend ${
                          xp < item.cost
                            ? "bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none"
                            : "bg-teal-primary text-white"
                        }`}
                      >
                        Mua: {item.cost} XP
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
