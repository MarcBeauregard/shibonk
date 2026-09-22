"use client";

import { useEffect, useRef } from "react";

/**
 * Bounces content up as it scrolls into view. Transform only, never opacity:
 * the content is readable without JavaScript and in link previews.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={`reveal ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}
