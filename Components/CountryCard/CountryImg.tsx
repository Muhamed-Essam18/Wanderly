"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CountryImg = ({ code, alt }: { code: string; alt: string }) => {
  const [loading, setLoading] = useState(true); // Loading Handling

  return (
    <div className="relative flex flex-col items-center justify-center">
      {loading && (
        <motion.div
          animate={{
            x: [-20, 20],
            y: [0, -30],
            transition: {
              x: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
              y: { repeat: Infinity, repeatType: "reverse", duration: 0.25 },
            },
          }}
          className="rounded-full bg-white h-2 w-2  z-100 m-auto absolute"
        ></motion.div>
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
