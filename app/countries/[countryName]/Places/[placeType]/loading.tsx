import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="text-center m-auto text-xl text-white bg-black/30 inset-0 absolute w-screen h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-15 h-15 text-primary duration-1000" />
    </div>
  );
};

export default loading;
