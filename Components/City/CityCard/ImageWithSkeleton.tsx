"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        {/* Skeleton shimmer */}
        {loading && (
          <div className="absolute inset-0 skeleton-shimmer bg-gray-300/60 animate-pulse transition-all duration-2000" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </>
  );
}
