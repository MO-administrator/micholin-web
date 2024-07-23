import { useEffect, useRef, type FC } from "react";
import type { TypedOptions } from "typed.js";
import TypedJs from "typed.js";

type Props = {
  strings: string[] | null;
  options?: TypedOptions;
};

export const Typed: FC<Props> = ({ strings, options }) => {
  const el = useRef(null);

  const defaultOptions = {
    strings: strings || [],
    typeSpeed: 5,
    loop: true,
    startDelay: 1e3,
    backDelay: 3e3,
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
