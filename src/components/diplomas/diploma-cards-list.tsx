"use client";
import { useState, useRef, useEffect } from "react";
import DiplomaCard from "@/components/diplomas/diploma-card";

interface DiplomaCardsListProps {
  allDiplomas: Diploma[];
}

export default function DiplomaCardsList({
  allDiplomas,
}: DiplomaCardsListProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/\-+/g, "-")
      .replace(/^\-+|\-+$/g, "");
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        setVisibleCount((prev) => Math.min(prev + 6, allDiplomas.length));
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [allDiplomas.length]);

  return (
    <>
      {allDiplomas.slice(0, visibleCount).map((d) => {
        const slug = slugify(d.name);
        const href = `/${slug}-${d._id}/exams`;
        return (
          <DiplomaCard key={d._id} title={d.name} img={d.icon} href={href} />
        );
      })}

      {visibleCount < allDiplomas.length && (
        <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
      )}
    </>
  );
}
