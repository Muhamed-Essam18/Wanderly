import { ExternalLink, Star } from "lucide-react";
import { TimelinePlace } from "@/types/journey";

type PlaceCardProps = {
  place: TimelinePlace | null;
  title: string;
  note?: string;
};

export default function PlaceCard({ place, title, note }: PlaceCardProps) {
  if (!place) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-text-muted">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">{title}</p>
        <p className="mt-2">No selection available.</p>
        {note ? <p className="mt-2 text-xs text-white/50">{note}</p> : null}
      </div>
    );
  }

  const imageSrc = place.photoName
    ? `/api/cities/image?photoName=${encodeURIComponent(place.photoName)}`
    : "/imgs/logo1.png";
  const openingSummary = place.openingHours?.weekdayDescriptions?.[0] || null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="relative h-32 overflow-hidden bg-black/20">
        <img src={imageSrc} alt={place.name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary">{title}</p>
        <h4 className="text-base font-semibold text-white">{place.name}</h4>
        <p className="text-xs text-white/60">{place.address}</p>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Star className="h-4 w-4 text-yellow-400" />
          {place.rating.toFixed(1)}
        </div>
        {openingSummary ? <p className="text-xs text-white/55">{openingSummary}</p> : null}
        {note ? <p className="text-xs text-white/55">{note}</p> : null}
        {place.mapsUrl ? (
          <a
            href={place.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary"
          >
            View on Maps
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
