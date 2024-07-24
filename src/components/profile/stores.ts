import { readable, writable } from 'svelte/store';
import General from './components/general/General.svelte';
import Settings from './components/settings/Settings.svelte';

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Session = {
  user?: User;
  expires: string;
};

export const session = writable<Session|null>(null);

export const routePrefix = '/profile/'

export const routeMap = readable(new Map([
  [routePrefix + '', General],
  [routePrefix + 'settings', Settings]
]));

export const activeRoute = writable(routePrefix);
