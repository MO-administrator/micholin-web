import type { TypedOptions } from "typed.js";
import Typed from "typed.js";

export const getInit = (strings: string[] | null, options: TypedOptions) => () => {
  const defaultOptions = {
    strings: strings || [],
    typeSpeed: 5,
    loop: true,
    startDelay: 1e3,
    backDelay: 3e3,
    showCursor: false,
    ...options,
  };
  const typed = new Typed(document.getElementById("typed"), { ...defaultOptions, ...options });
  return () => typed.destroy();
};
