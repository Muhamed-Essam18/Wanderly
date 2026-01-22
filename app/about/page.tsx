"use client";
import { Globe2, Target, Users, Compass } from "lucide-react";
import { motion } from "motion/react";
const page = () => {
  return (
    <div className="min-h-screen bg-background mt-15">
      <div className="container pb-16 flex flex-col items-center justify-center m-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="py-12 md:py-16 text-center "
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              About Wanderly
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Your journey starts with a
            <span className="text-primary"> decision</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            We help travelers make informed decisions about their next adventure
            by providing clear, budget-focused insights into destinations
            worldwide.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="py-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface shadow-2xl shadow-black rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-3">
                Our Mission
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                To simplify travel planning by providing transparent budget
                information and helping you find destinations that match your
                travel style.
              </p>
            </div>

            <div className="bg-surface shadow-2xl shadow-black rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-3">
                Our Approach
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                We curate destinations based on real travel costs, local vibes,
                and authentic experiences—not just tourist hotspots.
              </p>
            </div>

            <div className="bg-surface shadow-2xl shadow-black rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-3">
                For Travelers
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Whether you're a budget backpacker or seeking luxury escapes, we
                help you find places that fit your wallet and wanderlust.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="py-12">
          <div className="bg-surface shadow-2xl shadow-black rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
              Why Wanderly?
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Planning a trip shouldn't feel overwhelming. Yet, most travelers
                spend hours researching destinations, comparing costs, and
                trying to figure out if a place fits their budget and style.
              </p>
              <p>
                Wanderly was built to change that. We believe travel decisions
                should be simple, clear, and exciting—not stressful. By
                combining budget insights with travel style preferences, we help
                you discover destinations you'll love.
              </p>
              <p>
                Our goal is to be your trusted companion in the early stages of
                trip planning, giving you the confidence to choose your next
                adventure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
