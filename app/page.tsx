import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <h1 className="text-6xl font-bold text-center">Let&apos;s build an AI agent</h1>
        <p className="text-2xl text-center">This is a simple AI agent that can help you with your tasks</p>
        <div className="mt-2.5">
          <Link href="/login">
            <Button variant="default" className="px-8 py-5 text-lg cursor-pointer">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
