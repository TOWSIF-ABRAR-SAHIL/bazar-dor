"use client";

import { useState } from "react";

// Emoji ke Twemoji CDN image URL e convert kore — jate emoji font na thakleo sob device e dekhay
export function emojiToImageUrl(emoji: string): string {
  const code = [...emoji]
    .map((c) => c.codePointAt(0)?.toString(16))
    .filter((h) => h && h !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${code}.png`;
}

export default function EmojiImage({
  emoji,
  className = "w-6 h-6",
}: {
  emoji: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const safe = emoji || "🛒";

  // CDN e image na thakle ager moto emoji character dekhabe
  if (failed) {
    return <span className={className}>{safe}</span>;
  }

  return (
    <img
      src={emojiToImageUrl(safe)}
      alt=""
      draggable={false}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-contain shrink-0`}
    />
  );
}
