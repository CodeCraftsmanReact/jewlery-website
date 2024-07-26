import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center min-h-screen flex gap-4 -mt-20 items-center justify-center flex-col">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
