import type { MouseEventHandler } from 'svelte/elements';
export { routeMap, routePrefix, activeRoute } from "@islands/svelte/stores";
import { activeRoute } from './menu.service';

export const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
  const targetView = event.currentTarget.href.replace(
    window.location.origin,
    ""
  );
  activeRoute.set(targetView);
};

export const logoutItemProps = {
  item: "/api/auth/signout",
  name: "logout",
  preventDefault: false,
};
