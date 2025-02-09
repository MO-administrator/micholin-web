import {
  type Subscriber,
  type Updater,
  type Writable,
  get,
  writable,
} from "svelte/store";

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

let __session_instance__: SessionStore;

export class SessionStore {
  private session: Writable<Session>;

  constructor(newSession: Session) {
    if (__session_instance__) {
      throw new Error("Only one session instance is allowed");
    }
    __session_instance__ = this;
    this.session = writable(newSession);
  }

  subscribe(run: Subscriber<Session>) {
    return this.session.subscribe(run);
  }

  update(run: Updater<Session>) {
    return this.session.update(run);
  }

  getSession() {
    let session = get(this.session);
    return session;
  }
}
