"use client";

import React from "react";

interface SvgIconProps {
  name: string;
  className?: string;
}

export default function SvgIcon({ name, className = "w-5 h-5" }: SvgIconProps) {
  return (
    <img
      src={`/svg/${name}.svg`}
      alt=""
      aria-hidden="true"
      className={`inline-block object-contain ${className}`}
    />
  );
}
