import { GiWorld } from "react-icons/gi";
import { motion } from "motion/react";
import { Repeat } from "lucide-react";

const Landing = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" pt-30 flex flex-col items-center gap-5 space-y-3 "
    >
      <div className="w-[60%] md:w-[20%] h-10 md:h-10 rounded-full  bg-text-special border border-primary/30  flex flex-row justify-center items-center gap-2 ">
        <GiWorld className="text-primary text-xl inline" />
        <h1 className="text-primary md:text-md text-center">
          Discover 50+ destinations
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-[90%] ">
        <h1 className="text-4xl md:text-6xl text-text-primary text-center font-extrabold">
          Where will you
          <p className="text-5xl md:text-7xl text-primary inline font-bold">
            wander
          </p>
          next?
        </h1>
        <p className="text-text-muted text-lg text-center pt-5">
          Set your budget, pick your vibe, and find the perfect destination for
          your next adventure.
        </p>
      </div>
    </motion.section>
  );
};

export default Landing;
