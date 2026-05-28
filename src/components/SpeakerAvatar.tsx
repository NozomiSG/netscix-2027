"use client";

import Image from "next/image";
import { useState } from "react";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Renders the speaker photo when available, falling back to initials if no
// src is given or the image fails to load — so missing files never break layout.
export default function SpeakerAvatar({
  src,
  name,
  className,
  textClassName,
}: {
  src?: string;
  name: string;
  className: string;
  textClassName: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = src && !failed;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100 ${className}`}
    >
      {showPhoto ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="160px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={`absolute inset-0 flex items-center justify-center font-serif font-bold text-ink/50 ${textClassName}`}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}
