window.addEventListener("DOMContentLoaded", () => {
  class ToastTemplate extends HTMLElement {
    get template() {
      let t = document.createElement("template");
      t.innerHTML = `
      <div class="toast-wrapper slide-in-right">
        <div class="toast-wrapper__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59
              8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10
              0 0 0 12 2m-1 15h2v-6h-2z"
            />
          </svg>
        </div>
        <div class="toast-wrapper__body">
          <article>
            <h4 id="toast-title">
              <slot name="toast-title" />
            </h4>
            <p id="toast-message">
              <slot name="toast-message" />
            </p>
          </article>
        </div>
      </div>
    `;
      return t;
    }

    get styles() {
      let s = new CSSStyleSheet();
      s.replaceSync(
        `
      .toast-wrapper {
        position: absolute;
        z-index: 1124;
        top: 1rem;
        right: 1rem;
        padding: 0.125rem 0.5rem;
        display: grid;
        grid-template-columns: 0.25fr 1fr;
        place-content: center;
        background-color: #383838;
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        max-width: 320px;
        max-height: 80px;
        overflow: hidden;
        aspect-ratio: 16/4;
      }
      .toast-wrapper__icon {
        place-self: center;
        fill: #f139dd;
      }
      .toast-wrapper__body {
        display: grid;
        place-self: start;
      }
      .toast-wrapper__body article h4,
      .toast-wrapper__body article p {
        margin: 0;
      }
      .toast-wrapper__body article p {
        max-width: 240px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .slide-in-right {
        animation: slide_in_right 0.3s linear forwards;
      }
      .slide-out-top {
        animation: slide_out_top 0.3s linear forwards;
      }
      .slide-in-right:hover, .slide-out-top:hover {
        animation-play-state: paused;
      }

      @keyframes slide_in_right {
        0% {
          transform: translateX(110%);
        }

        75% {
          transform: translateX(-10%);
        }

        100% {
          transform: translateX(0%);
        }
      }

      @keyframes  slide_out_top {
        0% {
          transform: scaleY(100%);
        }
        15% {
          transform: scaleY(110%) translateY(-25%);
        }
        100% {
          transform: scaleY(0%);
        }
      }
    `
      );
      return s;
    }
  }

  class SignalToast extends ToastTemplate {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      let shadowDOM = this.shadowRoot;
      if (shadowDOM) {
        shadowDOM.adoptedStyleSheets.push(this.styles);
        shadowDOM.appendChild(this.template.content.cloneNode(true));
        let titleEl = shadowDOM.querySelector("#toast-title");
        if (titleEl && this.hasAttribute("title")) {
          titleEl.textContent = this.getAttribute("title");
        }
        let messageEl = shadowDOM.querySelector("#toast-message");
        if (messageEl && this.hasAttribute("message")) {
          messageEl.textContent = this.getAttribute("message");
        }
      }
    }

    connectedCallback() {
      let instance = this;
      let titleEl = this.shadowRoot?.querySelector("#toast-title");
      let messageEl = this.shadowRoot?.querySelector("#toast-message");
      if (!titleEl || !messageEl || !this) return;

      let wrapperEl = instance.shadowRoot?.querySelector(".toast-wrapper");
      if (wrapperEl) {
        wrapperEl.addEventListener("click", () => {
          wrapperEl.classList.replace("slide-in-right", "slide-out-top");
        });
        setTimeout(() => {
          wrapperEl.classList.replace("slide-in-right", "slide-out-top");
        }, 6e3);
      }
    }
  }
  window.customElements.define("signal-toast", SignalToast);
});
