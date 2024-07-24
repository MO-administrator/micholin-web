import type { MouseEventHandler } from 'svelte/elements';
import { activeRoute } from '../../stores';
export { routeMap, routePrefix, activeRoute } from "../../stores";

export const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
  const targetView = event.currentTarget.href.replace(
    window.location.origin,
    ""
  );
  activeRoute.set(targetView);
};
