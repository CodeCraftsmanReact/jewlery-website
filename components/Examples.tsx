"use client";
import React from "react";
import { motion } from "framer-motion";
const Examples = () => {
  return (
    <div className="example-container">
      <motion.div className="drag-area" />
      <motion.div
        className="w-16 h-16 bg-gradient-to-tr from-background to-primary rounded-xl"
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
      />
    </div>
  );
};

export default Examples;
