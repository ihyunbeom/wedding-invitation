// src/components/AutoHideBar.tsx
import { useEffect, useState } from "react";

interface AutoHideBarProps {
  position?: "top" | "bottom"; // 상단/하단 어디에 쓸건지
  children: React.ReactNode;
}

export function AutoHideBar({ position = "top", children }: AutoHideBarProps) {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 50) {
        // 아래로 스크롤 → 숨기기
        setHidden(true);
      } else {
        // 위로 스크롤 or 맨 위 근처 → 다시 보이기
        setHidden(false);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  const posClass = position === "top" ? "auto-hide-top" : "auto-hide-bottom";

  return (
    <div className={`auto-hide-bar ${posClass} ${hidden ? "hide" : ""}`}>
      {children}
    </div>
  );
}
