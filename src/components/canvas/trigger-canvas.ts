import explosionPng from "./effects/boom.png";
import explosionSfx from './effects/boom.wav';

type TExplosion = {
  x: number;
  y: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  audio: HTMLAudioElement;
  frame: number;
  totalFrames: number;
  angle: number;
};

class Explosion implements TExplosion {
  x: number;
  y: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  audio: HTMLAudioElement;
  frame: number;
  totalFrames: number;
  angle: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.image = new Image();
    this.image.src = explosionPng.src;
    this.audio = new Audio();
    this.audio.src = explosionSfx;
    this.frame = 0;
    this.totalFrames = 5;
    this.angle = Math.random() * 6.2;
  }

  update(gameFrame: number) {
    if (this.frame === 0) this.audio.play();
    if (gameFrame % 5 === 0) {
      this.frame++;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
  start(ctx: CanvasRenderingContext2D, gameFrame: number) {
    this.update(gameFrame);
    this.draw(ctx);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#trigger-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const CANVAS_WIDTH = (canvas.width = 500);
  const CANVAS_HEIGHT = (canvas.height = 700);
  const CANVAS_POSITION = canvas.getBoundingClientRect();
  const explosions: Explosion[] = [];

  let gameFrame = 0;

  const createAnimation = (e: MouseEvent) => {
    let positionX = e.x - CANVAS_POSITION.left;
    let positionY = e.y - CANVAS_POSITION.top;
    explosions.push(new Explosion(positionX, positionY));
  };
  window.addEventListener("click", createAnimation);

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    explosions.forEach((explosion, index) => {
      explosion.start(ctx, gameFrame);
      if (explosion.frame > explosion.totalFrames) explosions.splice(index);
    });
    gameFrame++;
    requestAnimationFrame(animate);
  }
  animate();
});
