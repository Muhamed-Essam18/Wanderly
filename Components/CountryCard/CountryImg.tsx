"use client";
import Image from "next/image";
import { useState } from "react";

const CountryImg = ({ code, alt }: { code: string; alt: string }) => {
  const [loading, setLoading] = useState(true); // Loading Handling

  return (
    <div className="relative flex items-center justify-center">
      {loading && (
        <div className="absolute w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin bg-red-600"></div>
      )}

      <img
        src={code}
        alt={alt}
        sizes="40px"
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() =>
          setTimeout(() => {
            setLoading(false);
          }, 10)
        }
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default CountryImg;
