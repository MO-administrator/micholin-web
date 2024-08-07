import ravenPng from "./enemies/enemy5.png";
import explosionPng from "./effects/boom.png";
import explosionSfx from "./effects/boom.wav";

class Explosion {
  x: number;
  y: number;
  sprite_width: number;
  sprite_height: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  audio: HTMLAudioElement;
  last_frame_played_at: number;
  frame_interval: number;
  frame: number;
  frames: number;
  angle: number;
  marked_for_deletion: boolean;
  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.sprite_width = 200;
    this.sprite_height = 179;
    this.last_frame_played_at = 0;
    this.frame_interval = 200;
    this.frame = 0;
    this.frames = 5;
    this.angle = Math.random() * 6.2;
    this.marked_for_deletion = false;
    this.image = new Image();
    this.image.src = explosionPng.src;
    this.audio = new Audio();
    this.audio.src = explosionSfx;
  }

  update(dTime: number) {
    if (this.frame === 0) this.audio.play();
    this.last_frame_played_at += dTime;
    if (this.last_frame_played_at > this.frame_interval) {
      if (this.frame > this.frames) this.marked_for_deletion = true;
      else this.frame++;
      this.last_frame_played_at = 0;
    }
  }

  draw({ ctx }: { ctx: CanvasRenderingContext2D }) {
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.sprite_width,
      0,
      this.sprite_width,
      this.sprite_height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // ctx.restore();
  }

  start({ ctx }: { ctx: CanvasRenderingContext2D }, dTime: number) {
    this.update(dTime);
    this.draw({ ctx });
  }
}

class Raven {
  image: HTMLImageElement;
  width: number;
  height: number;
  sprite_width: number;
  sprite_height: number;
  size: number;
  canvas: { width: number; height: number };
  frame: number;
  frames: number;
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  marked_for_deletion: boolean;
  last_flap: number;
  flap_interval: number;
  random_colors: number[];
  color: string;
  constructor(canvas: { width: number; height: number }) {
    this.image = new Image();
    this.image.src = ravenPng.src;
    this.sprite_width = 271;
    this.sprite_height = 194;
    this.size = Math.random() * 0.6 + 0.4;
    this.width = this.sprite_width * this.size;
    this.height = this.sprite_height * this.size;
    this.canvas = { width: canvas.width, height: canvas.height };
    this.frame = 0;
    this.frames = 4;
    this.x = this.canvas.width;
    this.y = Math.random() * (this.canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.marked_for_deletion = false;
    this.last_flap = 0;
    this.flap_interval = 100 * this.size;
    this.random_colors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.random_colors.join(", ")})`;
  }
  update(dTime: number, game_over: { value: boolean }) {
    if (this.y < 0 || this.y > this.canvas.height - this.height) {
      this.directionY *= -1;
    }

    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < -this.width) game_over.value = true;

    this.last_flap += dTime;
    if (this.last_flap > this.flap_interval) {
      if (this.frame > this.frames) this.frame = 0;
      else this.frame++;
      this.last_flap = 0;
    }
  }

  draw({
    ctx,
    col_ctx,
  }: {
    ctx: CanvasRenderingContext2D;
    col_ctx: CanvasRenderingContext2D;
  }) {
    col_ctx.fillStyle = this.color;
    col_ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.sprite_width,
      0,
      this.sprite_width,
      this.sprite_height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  start(
    {
      ctx,
      col_ctx,
    }: { ctx: CanvasRenderingContext2D; col_ctx: CanvasRenderingContext2D },
    dTime: number,
    game_over: { value: boolean }
  ) {
    this.update(dTime, game_over);
    this.draw({ ctx, col_ctx });
  }
}

class SignalElement extends HTMLElement {
  subscriber: Function | null = null;

  signal(value?: any) {
    const subscriptions = new Set<Function>();
    let instance = this;
    return {
      get value() {
        if (instance.subscriber) {
          subscriptions.add(instance.subscriber);
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

class ShooterCanvasTemplate extends SignalElement {
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <div class="wrapper">
      <canvas id="collision-canvas"></canvas>
      <canvas id="shooter-canvas"></canvas>
    </div>
    `;
    return t;
  }
  get styles() {
    let s = new CSSStyleSheet();
    s.replaceSync(
      `
      .wrapper {
        position: relative;
        background: linear-gradient(120deg, blue, green, yellow);
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      canvas {
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      #collision-canvas {
        opacity: 0;
      }
      `
    );
    return s;
  }
}

type ShooterCanvasProps = {
  ctx: CanvasRenderingContext2D;
  col_ctx: CanvasRenderingContext2D;
  position: DOMRect;
  width: number;
  height: number;
  enemy_objects: Raven[];
  explosion_objects: Explosion[];
  enemy_number: { value: number };
  game_speed: { value: number };
  game_frame: number;
  stagger_frame: number;
  time_to_spawn: number;
  spawn_interval: number;
  prev_timestamp: number;
  player_score: { value: number };
  game_over: { value: boolean };
};

class ShooterCanvas extends ShooterCanvasTemplate {
  canvas: ShooterCanvasProps;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.adoptedStyleSheets.push(this.styles);
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));

    let canvas = this.shadowRoot?.querySelector(
      "#shooter-canvas"
    ) as HTMLCanvasElement;
    let collision_canvas = this.shadowRoot?.querySelector(
      "#collision-canvas"
    ) as HTMLCanvasElement;

    this.canvas = {
      ctx: canvas.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D,
      col_ctx: collision_canvas.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D,
      position: canvas.getBoundingClientRect(),
      width: 500,
      height: 700,
      enemy_objects: [],
      explosion_objects: [],
      enemy_number: this.signal(1),
      game_speed: this.signal(5),
      game_frame: 0,
      stagger_frame: 5,
      time_to_spawn: 0,
      spawn_interval: 2e3,
      prev_timestamp: 0,
      player_score: this.signal(0),
      game_over: this.signal(false),
    };
    this.canvas.width =
      canvas.width =
      collision_canvas.width =
        window.innerWidth;
    this.canvas.height =
      canvas.height =
      collision_canvas.height =
        window.innerHeight - 16 * 8;
    this.canvas.ctx.font = "50px Impact";
  }

  connectedCallback() {
    let instance = this;
    let numberOfEnemies = this.derived(
      () => instance.canvas.enemy_number.value
    );

    this.effect(() => {
      for (let i = 0; i < numberOfEnemies.value; i++) {
        instance.canvas.enemy_objects = [
          ...instance.canvas.enemy_objects,
          new Raven(instance.canvas),
        ];
      }
    });

    window.addEventListener("click", e => {
      const detectPixelColor = instance.canvas.col_ctx.getImageData(
        e.offsetX,
        e.offsetY,
        1,
        1
      ).data;

      instance.canvas.enemy_objects.forEach(object => {
        let isMatch = detectPixelColor.reduce((result, current, i) => {
          if (result === false) return false;
          if (i === 3) return result;
          return current === object.random_colors[i];
        }, true);

        if (isMatch) {
          object.marked_for_deletion = true;
          instance.canvas.player_score.value++;
          instance.canvas.explosion_objects.push(
            new Explosion(object.x, object.y, object.width)
          );
          if (instance.canvas.game_frame % 1e3 === 0) {
            instance.canvas.enemy_number.value++;
          }
        }
      });
    });

    instance.loop(instance, 0);
  }

  disconnectedCallback() {
    window.removeEventListener("click", () => {});
  }

  loop(instance: ShooterCanvas, timestamp: number) {
    instance.canvas.ctx.clearRect(
      0,
      0,
      instance.canvas.width,
      instance.canvas.height
    );
    instance.canvas.col_ctx.clearRect(
      0,
      0,
      instance.canvas.width,
      instance.canvas.height
    );

    let dTime = timestamp - instance.canvas.prev_timestamp;
    instance.canvas.prev_timestamp = timestamp;
    instance.canvas.time_to_spawn += dTime;

    if (instance.canvas.time_to_spawn > instance.canvas.spawn_interval) {
      instance.canvas.enemy_objects.push(new Raven(instance.canvas));
      instance.canvas.time_to_spawn = 0;
    }

    instance.canvas.enemy_objects = instance.canvas.enemy_objects.filter(
      ({ marked_for_deletion }) => !marked_for_deletion
    );
    instance.canvas.explosion_objects =
      instance.canvas.explosion_objects.filter(
        ({ marked_for_deletion }) => !marked_for_deletion
      );

    instance.canvas.enemy_objects.sort((a, b) => a.size - b.size);

    instance.drawPlayerScore(instance);

    [
      ...instance.canvas.enemy_objects,
      ...instance.canvas.explosion_objects,
    ].forEach(object => {
      let { ctx, col_ctx, game_over } = instance.canvas;
      object.start({ ctx, col_ctx }, dTime, game_over);
    });

    if (!instance.canvas.game_over.value) {
      instance.canvas.game_frame += instance.canvas.game_speed.value;
      requestAnimationFrame(t => instance.loop(instance, t));
    } else {
      instance.drawGameOver(instance);
    }
  }

  drawPlayerScore(instance: ShooterCanvas) {
    instance.canvas.ctx.fillStyle = "#333";
    instance.canvas.ctx.fillText(
      "Score: " + instance.canvas.player_score.value,
      50,
      75
    );
    instance.canvas.ctx.fillText(
      "Game Speed: " + instance.canvas.game_speed.value,
      50,
      139
    );
    instance.canvas.ctx.fillStyle = "#fff";
    instance.canvas.ctx.fillText(
      "Score: " + instance.canvas.player_score.value,
      55,
      80
    );
    instance.canvas.ctx.fillText(
      "Game Speed: " + instance.canvas.game_speed.value,
      55,
      144
    );
  }

  drawGameOver(instance: ShooterCanvas) {
    instance.canvas.ctx.fillStyle = "#333";
    instance.canvas.ctx.fillText(
      "GAME OVER!! Your Score is: " + instance.canvas.player_score.value,
      instance.canvas.width * 0.3 + 6,
      instance.canvas.height * 0.5 + 6
    );
    instance.canvas.ctx.fillStyle = "#fff";
    instance.canvas.ctx.fillText(
      "GAME OVER!! Your Score is: " + instance.canvas.player_score.value,
      instance.canvas.width * 0.3,
      instance.canvas.height * 0.5
    );
  }
}

window.customElements.define("shooter-canvas", ShooterCanvas);
