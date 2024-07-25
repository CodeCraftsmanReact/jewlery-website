"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "@/animations";

export default function TransitionLink({
  href,
  label,
  children,
}: {
  href: string;
  label?: string;
  children: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <button className="" onClick={handleClick}>
      {children}
    </button>
  );
}
