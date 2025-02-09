import { writable, type Subscriber, type Updater } from "svelte/store";

import General from "../profile/views/general/General.svelte";
import Todos from "../profile/views/todos/Todos.svelte";
import Settings from "../profile/views/settings/Settings.svelte";
import type { MouseEventHandler } from "svelte/elements";

class RouteStore {
  readonly route_prefix = "/profile/";
  readonly route_map = new Map([
    [this.route_prefix + "", () => General],
    [this.route_prefix + "todos", () => Todos],
    [this.route_prefix + "settings", () => Settings],
  ]);

  private _active_route = writable(this.route_prefix);

  get activeRoute() {
    const activeRoute = this._active_route;
    return {
      subscribe(run: Subscriber<string>) {
        return activeRoute.subscribe(run);
      },
      update(run: Updater<string>) {
        return activeRoute.update(run);
      },
    };
  }

  get routePrefix() {
    return this.route_prefix;
  }

  get routes() {
    return this.route_map.keys();
  }

  getViewComponent(key: string) {
    return this.route_map.get(key);
  }

  handleUpdateView: MouseEventHandler<HTMLAnchorElement> = event => {
    const targetView = event.currentTarget.href.replace(
      window.location.origin,
      ""
    );
    this.activeRoute.update(() => targetView);
  };
}

export const routeStore = new RouteStore();
