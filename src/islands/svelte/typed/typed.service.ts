import type { TypedOptions } from "typed.js";
import Typed from "typed.js";

export const getInit = (strings: string[] | null, options: TypedOptions) => () => {
  let typed: Typed;
  const defaultOptions = {
    strings: strings || [],
    typeSpeed: 5,
    loop: true,
    startDelay: 1e3,
    backDelay: 3e3,
    showCursor: false,
    ...options,
  };
  const element = document.getElementById("typed");
  typed = new Typed(element, { ...defaultOptions, ...options });
  typed.start();
  return () => {
    typed?.destroy();
  };
};
