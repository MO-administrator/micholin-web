import { getRandomItem } from "@/utils/get-random-item";
import enemy1Png from "./enemies/enemy1.png";
import enemy2Png from "./enemies/enemy2.png";
import enemy3Png from "./enemies/enemy3.png";
import enemy4Png from "./enemies/enemy4.png";

const enemyType1 = new Image();
enemyType1.src = enemy1Png.src;
enemyType1.height = 157;
enemyType1.width = 293;
enemyType1.dataset.frames = "6";

const enemyType2 = new Image();
enemyType2.src = enemy2Png.src;
enemyType2.height = 188;
enemyType2.width = 267;
enemyType2.dataset.frames = "6";

const enemyType3 = new Image();
enemyType3.src = enemy3Png.src;
enemyType3.height = 183;
enemyType3.width = 218;
enemyType3.dataset.frames = "6";

const enemyType4 = new Image();
enemyType4.src = enemy4Png.src;
enemyType4.height = 207;
enemyType4.width = 212;
enemyType4.dataset.frames = "9";

const enemyTypes = [enemyType1, enemyType2, enemyType3, enemyType4];
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 800;


type TEnemy = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: HTMLImageElement;
  flapSpeed: number;
  angle: number;
  angleSpeed: number;
};

class Enemy implements TEnemy {
  x: number;
  y: number;
  width: number;
  height: number;
  spriteWidth: number;
  spriteHeight: number;
  frames: number;
  frame: number;
  type: HTMLImageElement;
  flapSpeed: number;
  angle: number;
  angleSpeed: number;

  constructor(type: HTMLImageElement) {
    this.spriteWidth = type.width;
    this.spriteHeight = type.height;
    this.width = this.spriteWidth * 0.25;
    this.height = this.spriteHeight * 0.25;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frames = +(type.dataset.frames || "6");
    this.frame = 0;
    this.type = type;
    this.flapSpeed = Math.floor(Math.random() * 0.25 + 5.5);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.25 + 0.25;
  }
  update(gameFrame: number) {
    this.x =
      (CANVAS_WIDTH / 3.5) * Math.sin((this.angle * Math.PI) / 360) +
      (CANVAS_WIDTH - this.width) / 2.5;
    this.y =
      (CANVAS_HEIGHT / 3.5) * Math.cos((this.angle * Math.PI) / 90) +
      (CANVAS_HEIGHT - this.height) / 2.5;
    this.angle += this.angleSpeed;

    if (this.x < -CANVAS_WIDTH) this.x = CANVAS_WIDTH;
    if (this.y > CANVAS_HEIGHT) this.y = -this.width;

    if (gameFrame % this.flapSpeed === 0) {
      this.frame == this.frames - 1 ? (this.frame = 0) : this.frame++;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.type,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  start(ctx: CanvasRenderingContext2D, gameFrame: number) {
    this.update(gameFrame);
    this.draw(ctx);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("enemy-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 500;
  canvas.height = 800;

  let gameFrame = 0;
  let numberOfEnemies = 5;
  let enemyObjects: Enemy[] = [];


  for (let i = 0; i < numberOfEnemies; i++) {
    let randomEnemyType: HTMLImageElement = getRandomItem(enemyTypes);
    let newEnemy = new Enemy(randomEnemyType);
    enemyObjects.push(newEnemy);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemyObjects.forEach(enemyObject => {
      enemyObject.start(ctx, gameFrame);
    });
    gameFrame++;
    requestAnimationFrame(animate);
  }
  animate();
});
