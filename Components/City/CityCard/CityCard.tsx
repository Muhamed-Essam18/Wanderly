"use client";

import { motion } from "motion/react";
import ImageWithSkeleton from "./ImageWithSkeleton";

type CityCardProps = {
  name: string;
  adress: string;
  rating: number;
  picUrl?: string | null;
  place?: string;
  mapsUrl: string;
};
const ratingQuality = (rating: number) => {
  if (rating >= 4) {
    return "text-green-600";
  }
  if (rating >= 3 && rating < 4) {
    return "text-yellow-600";
  }
  if (rating < 3) {
    return "text-red-600";
  }
};
const spaceLess = (word: string) => {
  return word.replaceAll(/[^A-Z]  /gi, " ");
};
export const CityCard = (props: CityCardProps) => {
  const imgSrc = props.picUrl
    ? props.picUrl.startsWith("data:")
      ? props.picUrl
      : `/api/cities/image?photoName=${encodeURIComponent(props.picUrl)}`
    : "/imgs/logo1.png";

  return (
    <>
      <motion.a
        href={props.mapsUrl}
       
      >
        <div className="relative h-50 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent" />
          <ImageWithSkeleton src={imgSrc} alt={props.name}></ImageWithSkeleton>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className=" text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
              {props.name}
            </h3>
            <span className="text-sm  whitespace-nowrap text-text-muted">
              {spaceLess(decodeURIComponent(props?.place!).slice(0, -1))}
            </span>
          </div>

          {/* Travel Style Tags */}
          <div className={`flex flex-wrap gap-1.5 shadow-teal-200 font-bold`}>
            Rating:{" "}
            <span className={`${ratingQuality(props.rating!)}`}>
              {props.rating}
            </span>
          </div>

          {/* Quick Stats */}

          <div className="flex items-center gap-4 text-sm text-text-muted mt-6 pt-2 border-t opacity-70">
            <span> {props.adress}</span>
          </div>
        </div>
      </motion.a>
    </>
  );
};
