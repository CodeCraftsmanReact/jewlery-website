"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollLinked = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="h-[200vh]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[10px] bg-red-500 origin-[0%]"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollLinked;
