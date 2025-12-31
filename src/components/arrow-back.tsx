"use client";

import { ChevronLeft } from "lucide-react";

export default function ArrowBack() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      aria-label="Go back"
      className="flex items-center justify-center w-10 border border-[#155DFC] bg-white text-[#155DFC]"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}
