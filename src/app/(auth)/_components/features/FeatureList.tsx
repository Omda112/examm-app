import FeatureItem from "./FeatureItem";
import { Brain, BookOpenCheck, RectangleEllipsis } from "lucide-react";

export default function FeatureList() {
  return (
    <div className="flex flex-col gap-9">
      {/* Section heading */}
      <h2 className="text-4xl font-heading font-semibold">
        Empower your learning journey <br /> with our smart exam platform.
      </h2>

      {/* Feature item: Track selection feature */}
      <FeatureItem
        icon={Brain}
        title="Tailored Diplomas"
        description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
      />

      {/* Feature item: Focused exams */}
      <FeatureItem
        icon={BookOpenCheck}
        title="Focused Exams"
        description="Access topic-specific tests including HTML, CSS, JavaScript, and more."
      />

      {/* Feature item: Multi-step forms */}
      <FeatureItem
        icon={RectangleEllipsis}
        title="Smart Multi-Step Forms"
        description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
      />
    </div>
  );
}
