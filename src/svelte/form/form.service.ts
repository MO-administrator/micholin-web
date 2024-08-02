import type { CollectionEntry } from "astro:content";
import {
  type Subscriber,
  type Updater,
  type Writable,
  get,
  writable,
} from "svelte/store";

class FormStore {
  private _forms: Writable<CollectionEntry<"forms">[]>;

  constructor() {
    this._forms = writable([]);
  }

  subscribe(run: Subscriber<CollectionEntry<"forms">[]>) {
    return this._forms.subscribe(run);
  }

  update(run: Updater<CollectionEntry<"forms">[]>) {
    return this._forms.update(run);
  }

  async fetchForms() {
    const forms = get(this._forms);
    if (!forms.length) {
      const url = `${window.location.origin}/api/forms-meta`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
      };
      const response = await fetch(url, options);
      const data: CollectionEntry<"forms">[] = await response.json();
      this._forms.set(data);
    }
  }
}

export const formStore = new FormStore();
