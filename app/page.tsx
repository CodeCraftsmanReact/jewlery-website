import Examples from "@/components/Examples";
import LineDrawing from "@/components/LineDrawing";
import { MotionPath } from "@/components/MotionPath";
import ScrollLinked from "@/components/ScrollLinked";
import MorphSvg from "@/components/MorphSvg";
export default function Home() {
  return (
    <main className="bg-background min-h-screen bg-gradient-to-tr from-background to-primary grid place-items-center p-24">
      <LineDrawing />
    </main>
  );
}
