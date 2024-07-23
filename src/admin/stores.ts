import { writable } from 'svelte/store';

type Session = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
};

export const sessionStore = writable<Session|null>(null);
