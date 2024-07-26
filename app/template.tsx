"use client";
import { animatePageIn } from "@/animations";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="transition-element"
        className="w-screen h-screen bg-gradient-to-br from-background to-primary z-100 fixed top-0 left-0"
      ></div>
      {children}
    </div>
  );
}
