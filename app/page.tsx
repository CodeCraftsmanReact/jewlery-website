import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background min-h-screen bg-gradient-to-tr from-background to-primary p-24">
      <ModeToggle />
      {/* <TransitionLink href="/about" label="About ->" /> */}
    </main>
  );
}
