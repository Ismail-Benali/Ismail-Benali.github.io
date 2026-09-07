"use client";

import { useState } from "react";

interface PlatformLogoProps {
  name: string;
  logo?: string;
  initial: string;
  color: string;
  className?: string;
  small?: boolean;
}

export function PlatformLogo({
  name,
  logo,
  initial,
  color,
  className,
  small,
}: PlatformLogoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(logo) && !failed;

  return (
    <div
      className={`rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform overflow-hidden ${
        className ?? ""
      }`}
      style={{ backgroundColor: showImage ? "#fff" : color }}
    >
      {showImage ? (
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`w-full h-full object-contain ${small ? "p-px" : "p-1.5"}`}
        />
      ) : (
        <span
          className={`font-bold text-white ${small ? "text-[8px]" : "text-lg"}`}
        >
          {initial}
        </span>
      )}
    </div>
  );
}