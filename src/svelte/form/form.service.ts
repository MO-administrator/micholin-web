import type { CollectionEntry } from "astro:content";
import {
  type Subscriber,
  type Updater,
  type Writable,
  get,
  writable,
} from "svelte/store";

let instance: FormStore;

class FormStore {
  private _forms: Writable<CollectionEntry<"forms">[]>;

  constructor() {
    if(instance) {
      throw new Error('Only one instance is allowed.');
    }
    instance = this;
    this._forms = writable([]);
    this.fetchForms();
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
