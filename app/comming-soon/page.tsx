"use client";
import {
  Sparkles,
  MapPin,
  Building2,
  UtensilsCrossed,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
const upcomingFeatures = [
  {
    icon: MapPin,
    title: "City & Landmark Details",
    description:
      "Dive deep into each city with detailed guides, must-see landmarks, local tips, and neighborhood breakdowns to help you plan your perfect itinerary.",
    status: "In Development",
  },
  {
    icon: Building2,
    title: "Hotel Previews & Pricing",
    description:
      "Browse popular hotels in each destination with real pricing, photos, amenities, and user ratings—all in one place to simplify your booking decisions.",
    status: "Coming Soon",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Discovery",
    description:
      "Explore the best restaurants and local eateries with menu previews, price ranges, and cuisine types to satisfy every foodie's appetite.",
    status: "Coming Soon",
  },
  {
    icon: Star,
    title: "Personalized Recommendations",
    description:
      "Get AI-powered destination suggestions based on your travel history, preferences, and budget to discover hidden gems tailored just for you.",
    status: "Planned",
  },
];

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background w-[90%] md:w-full m-auto flex flex-col justify-center items-center">
      <div className="container pt-10 pb-10 ">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="py-12 md:py-16 text-center "
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary ">What's Next</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Exciting features <span className="text-primary">coming soon</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            We're working hard to bring you more tools to make your travel
            planning even easier. Here's a sneak peek at what's on the horizon.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
          className=" pb-20"
        >
          <div className="grid md:grid-cols-2 gap-6 justify-center ">
            {upcomingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface rounded-2xl shadow-2xl shadow-black p-8 group hover:border-primary/30 "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 ">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-md md:text-xl font-semibold text-text-primary">
                        {feature.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full  ${
                          feature.status === "In Development"
                            ? "bg-primary/20 text-primary"
                            : feature.status === "Coming Soon"
                            ? "bg-surface shadow-sm shadow-black text-text-primary"
                            : "bg-text-muted/20 text-text-muted"
                        }`}
                      >
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
        >
          <div className="bg-surface p-8 md:p-12 text-center max-w-2xl mx-auto  rounded-2xl ">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Stay in the loop
            </h2>
            <p className="text-text-muted mb-6">
              Want to be the first to know when new features launch? We'll keep
              you updated on our progress.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <span>More updates coming soon</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ComingSoon;
