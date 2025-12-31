import { FolderCode } from "lucide-react";
import React from "react";
import FeatureList from "./_components/features/FeatureList";
import { ToastProvider } from "@/components/ui/toast";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Left column */}
      <div
        className="relative flex-1 flex flex-col justify-between px-10 py-8 overflow-hidden
                bg-[#EFF6FFBF]
                "
      >
        {/* Bottom-left ellipse */}
        <div className="absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full bg-[#50A2FF] blur-[200px] pointer-events-none" />

        {/* Top-right ellipse */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#50A2FF] blur-[200px] pointer-events-none" />

        <div className="flex-1 mx-auto flex flex-col py-8 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2">
            <FolderCode className="w-10 h-10 text-blue-600" />
            <h1 className="text-xl font-bold">Exam App</h1>
          </div>

          {/* Features */}
          <div className="flex-1 flex flex-col justify-center pb-24">
            <FeatureList />
          </div>
        </div>
      </div>

      {/* Right column (dynamic content) */}
      <div className="flex-1 flex flex-col p-6 sm:p-10 bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </main>
  );
}
