import { useEffect, useRef, type FC } from "react";
import type { TypedOptions } from "typed.js";
import TypedJs from "typed.js";

type Props = {
  strings: string[];
  options?: TypedOptions;
};

export const Typed: FC<Props> = ({ strings, options }) => {
  const el = useRef(null);

  const defaultOptions = {
    strings,
    typeSpeed: 5,
    loop: true,
    startDelay: 800,
    backDelay: 3000,
    showCursor: false,
    ...options,
  };

  useEffect(() => {
    const typed = new TypedJs(el.current, { ...defaultOptions });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <span
      ref={el}
      className="px-4 flex flex-wrap place-items-center w-full min-h-16 max-w-screen-lg text-2xl text-center"
    />
  );
};
