let subscriber: Function | null = null;

export function signal(value?: any) {
  const subscriptions = new Set<Function>();

  return {
    get value() {
      if(subscriber) {
        subscriptions.add(subscriber);
      }
      return value;
    },
    set value(updated) {
      value = updated;
      subscriptions.forEach((fn) => fn())
    }
  }
}

export function effect(fn: Function) {
  subscriber = fn;
  fn();
  subscriber = null;
}

export function derived(fn: Function) {
  const derived = signal();
  effect(() => {
    derived.value = fn();
  });
  return derived;
}

export class Signal {
  subscriber: Function | null = null;

  signal(value?: any) {
    const subscriber = this.subscriber;
    const subscriptions = new Set<Function>();

    return {
      get value() {
        if(subscriber) {
          subscriptions.add(subscriber);
        }
        return value;
      },
      set value(updated) {
        value = updated;
        subscriptions.forEach((fn) => fn());
      }
    }
  }

  effect(fn: Function) {
    this.subscriber = fn;
    fn();
    this.subscriber = null;
  }

  derived(fn: Function) {
    const derived = this.signal();
    this.effect(() => {
      derived.value = fn();
    });
    return derived;
  }
}
