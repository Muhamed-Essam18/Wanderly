import { GiWorld } from "react-icons/gi";

const Landing = () => {
  return (
    <section className=" pt-30 flex flex-col items-center gap-5 space-y-3 ">
      <div className="w-[70%] md:w-1/3 h-11 md:h-15 rounded-full  bg-text-special border border-primary/30  flex flex-row justify-center items-center gap-2 ">
        <GiWorld className="text-primary text-xl inline" />
        <h1 className="text-primary md:text-xl text-center">
          Discover 50+ destinations
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-[90%] ">
        <h1 className="text-3xl text-text-primary text-center font-extrabold">
          Where will you
          <p className="text-4xl text-primary inline font-bold"> wander </p>
          next?
        </h1>
        <p className="text-text-muted text-lg text-center pt-5">
          Set your budget, pick your vibe, and find the perfect destination for
          your next adventure.
        </p>
      </div>
    </section>
  );
};

export default Landing;
