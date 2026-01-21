import { Country } from "@/Data/Data";
import { Bed, Building, Landmark, MapPin, Utensils, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CountryDetailsProps {
  country: Country;
  onClose: () => void;
}

const Modal = ({ country, onClose }: CountryDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",

        duration: 0.6,
      }}
      exit={{ opacity: 0, y: 40 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 "
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 50, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, y: 0, backdropFilter: "blur(4px)" }}
        transition={{
          type: "spring",
          backdropFilter: { duration: 0.4, ease: "linear" },
          duration: 0.6,
        }}
        exit={{ opacity: 0, y: 40 }}
        className="absolute inset-0 bg-black/80 "
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-surface text-white shadow-2xl shadow-secondary"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center justify-center rounded-full bg-black/70 p-2 hover:bg-black/90 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero */}
        <div className="relative h-48 md:h-56">
          <img
            src={country.heroImage}
            alt={country.name}
            className="h-full w-full object-cover"
          />

          {/* Shadow fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />

          {/* Title */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
            <span className="text-3xl">
              <img
                src={`https://flagcdn.com/w40/${country.flag}.png`}
                alt={country.name}
              />
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{country.name}</h2>
              <p className="text-sm text-white/70">
                ${country.weeklyBudget.min} – ${country.weeklyBudget.max} / week
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-14rem)] overflow-y-auto p-6 space-y-6">
          <p className="text-white/70 leading-relaxed">{country.description}</p>

          {/* Costs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-text-muted/5 shadow-black/40 shadow-2xl bg-surface p-4">
              <div className="mb-1 flex items-center gap-2 text-xs uppercase text-primary ">
                <Utensils className="h-4 w-4 text-primary" />
                Avg. Food Cost
              </div>
              <p className="text-2xl font-bold">
                ${country.avgFoodCost}
                <span className="text-sm font-normal text-text-muted">
                  /day
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-text-muted/5 bg-surface p-4 shadow-black/40 shadow-2xl">
              <div className=" mb-1 flex items-center gap-2 text-xs uppercase text-primary">
                <Bed className="h-4 w-4 text-primary " />
                Avg. Stay Cost
              </div>
              <p className="text-2xl font-bold">
                ${country.avgAccommodationCost}
                <span className="text-sm font-normal text-text-muted">
                  /night
                </span>
              </p>
            </div>
          </div>

          {/* Cities */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Building className="h-4 w-4 text-primary" />
              Popular Cities
            </div>
            <div className="flex flex-wrap gap-2">
              {country.cities.map((city) => (
                <span
                  key={city}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Landmarks */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Landmark className="h-4 w-4 text-white/70" />
              Top Landmarks
            </div>
            <div className="space-y-2">
              {country.landmarks.map((landmark) => (
                <div
                  key={landmark}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-secondary/40 px-4 py-3 text-sm"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-white/70" />
                  {landmark}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {country.travelStyles.map((style) => (
              <span
                key={style}
                className="rounded-full bg-text-special text-primary px-3 py-1 text-xs"
              >
                {style}
              </span>
            ))}
            {country.vibe.map((v) => (
              <span
                key={v}
                className="rounded-full bg-text-special text-primary px-3 py-1 text-xs capitalize"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
