"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LockKeyhole } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function Page() {
  const container = useRef<HTMLElement | any>();
  const router = useRouter();
  useEffect(() => {
    const rose = container.current.querySelectorAll(".img");
    gsap.to(rose, {
      duration: 3,
      y: 0,
      opacity: 1,
    });
  }, []);
  return (
    <div className="flex ">
      <div
        ref={container}
        className="w-[50%] max-h-screen overflow-hidden flex justify-center"
      >
        <Image
          src="/red-rose.jpg"
          alt="red rose"
          width={0}
          height={0}
          className="w-full img translate-y-[300px]"
          sizes="100vh"
          style={{ opacity: 0 }}
        />
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className="mb-8 grid place-items-center">
          <Avatar className=" bg-primary grid place-items-center">
            <LockKeyhole />
          </Avatar>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Administrator Login
          </h1>
        </div>
        <div className="w-[80%] flex gap-4 flex-col justify-center items-center">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
