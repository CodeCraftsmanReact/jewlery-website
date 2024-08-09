"use client";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <section className="flex flex-col justify-center items-center">
      <Button onClick={() => setIsOpen(!isOpen)}>Show navigation</Button>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {children}
    </section>
  );
}
