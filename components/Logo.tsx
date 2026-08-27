import React from "react";

export default function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="#14141A"
          stroke="url(#gp)"
          strokeWidth="2"
        />
        <path
          d="M32 14l3.2 9.8H46l-8.4 6.1 3.2 9.8L32 33.6l-8.8 6.1 3.2-9.8L18 23.8h10.8L32 14z"
          fill="url(#gp)"
        />
        <path
          d="M20 46h24"
          stroke="url(#gp)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gp" x1="12" y1="12" x2="52" y2="52">
            <stop stopColor="#E8C547" />
            <stop offset="0.5" stopColor="#C9A227" />
            <stop offset="1" stopColor="#8A6D1A" />
          </linearGradient>
        </defs>
      </svg>
      {showWordmark && (
        <span className="font-display text-xl tracking-tight text-cream">
          Fame<span className="text-gold-light">Pass</span>
        </span>
      )}
    </span>
  );
}
