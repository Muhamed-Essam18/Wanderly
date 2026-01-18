import { MouseEventHandler } from "react";

const Backdrop = (props: {
  clicked: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      className="fixed w-full h-screen inset-0 bg-black opacity-40 z-20"
      onClick={props.clicked}
    ></div>
  );
};

export default Backdrop;
