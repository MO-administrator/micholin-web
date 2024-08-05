class CounterTemplate extends HTMLElement {
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
      <div class="counter-container">
        <button id="button" class="btn">
          Increment Count: <span id="count"></span>
        </button>
        <button id="reset" class="btn"> Reset Count </button>
      </div>
    `;
    return t;
  }
  get styles() {
    let s = new CSSStyleSheet();
    s.replaceSync(
      `
      .counter-container {
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        place-self: center;
        place-content: center;
      }
      .counter-container button {
        cursor: pointer;
        background-color: #f8f8f8;
        color: #333333;
        padding: 0.25rem 1rem;
        border-radius: 2rem;
        border: 0.25rem solid #333333;
        border-top-color: transparent;
        border-left-color: transparent;
        transition: all 300ms ease-in-out;
      }
      .counter-container button:hover {
        background-color: #333333;
        color: #f8f8f8;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-top: 0.25rem solid #f8f8f8;
        border-left: 0.25rem solid #f8f8f8;
      }
      `
    );
    return s;
  }
}

class SignalCounter extends CounterTemplate {
  subscriber: Function | null;
  count: { value: any };
  constructor() {
    super();
    this.subscriber = null;
    this.count = this.signal(parseInt(this.getAttribute("count") || "0"));
    this.style.display = "grid";
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.adoptedStyleSheets.push(this.styles)
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    let btnEl = this.shadowRoot?.querySelector("#button");
    let countEl = this.shadowRoot?.querySelector("#count");
    let resetEl = this.shadowRoot?.querySelector("#reset");
    if (!btnEl || !countEl || !resetEl) return;

    let instance = this;
    countEl.innerHTML = instance.count.value;

    this.effect(() => {
      countEl.innerHTML = instance.count.value;
    });

    btnEl.addEventListener("click", () => {
      instance.count.value++;
    });
    resetEl.addEventListener("click", () => {
      instance.count.value = parseInt(instance.getAttribute("count") || "0");
    });
  }

  disconnectedCallback() {
    let btnEl = this.shadowRoot?.querySelector("#button");
    let resetEl = this.shadowRoot?.querySelector("#reset");
    if (!btnEl || !resetEl) return;
    let instance = this;
    btnEl.removeEventListener("click", () => {
      instance.count.value++;
    });
    resetEl.removeEventListener("click", () => {
      instance.count.value = 0;
    });
  }

  signal(value?: any) {
    const subscriptions = new Set<Function>();
    let instance = this;

    return {
      get value() {
        let subscriber = instance.subscriber;
        if (subscriber) {
          subscriptions.add(subscriber);
        }
        return value;
      },
      set value(updated) {
        value = updated;
        subscriptions.forEach(fn => fn());
      },
    };
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
window.customElements.define("signal-counter", SignalCounter);
