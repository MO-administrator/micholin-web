import { writable } from 'svelte/store';
import type { CollectionEntry } from 'astro:content';
import General from './profile/views/general/General.svelte';
import Todos from './profile/views/todos/Todos.svelte';
import Settings from './profile/views/settings/Settings.svelte';

export type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Session = {
  id: string;
  user?: User;
  expires: string;
};

export const session = writable<Session>();

export const routePrefix = '/profile/'

export const routeMap = new Map([
  [routePrefix + "", () => General],
  [routePrefix + "todos", () => Todos],
  [routePrefix + "settings", () => Settings],
]);

export const activeRoute = writable(routePrefix);

export const formStore = writable<CollectionEntry<'forms'>[]|undefined>(undefined);
