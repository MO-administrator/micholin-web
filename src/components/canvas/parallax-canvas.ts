import bgLayer1 from "./backgrounds/city_background/layer-1.png";
import bgLayer2 from "./backgrounds/city_background/layer-2.png";
import bgLayer3 from "./backgrounds/city_background/layer-3.png";
import bgLayer4 from "./backgrounds/city_background/layer-4.png";
import bgLayer5 from "./backgrounds/city_background/layer-5.png";

let backgroundLayer1 = new Image();
backgroundLayer1.src = bgLayer1.src;
let backgroundLayer2 = new Image();
backgroundLayer2.src = bgLayer2.src;
let backgroundLayer3 = new Image();
backgroundLayer3.src = bgLayer3.src;
let backgroundLayer4 = new Image();
backgroundLayer4.src = bgLayer4.src;
let backgroundLayer5 = new Image();
backgroundLayer5.src = bgLayer5.src;

type TBackgroundLayer = {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;
};

class BackgroundLayer implements TBackgroundLayer {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor(image: HTMLImageElement, speedModifier: number, gameSpeed: number = 5) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update(gameFrame: number, gameSpeed: number) {
    this.speed = gameSpeed * this.speedModifier;
    this.x = (gameFrame * this.speed) % this.width;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
  start(ctx: CanvasRenderingContext2D, gameFrame: number, gameSpeed: number){
    this.update(gameFrame, gameSpeed);
    this.draw(ctx);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById(
    "parallax-canvas"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const CANVAS_WIDTH = (canvas.width = 800);
  const CANVAS_HEIGHT = (canvas.height = 700);

  const showSpeedEl = document.getElementById(
    "show_game_speed"
  ) as HTMLSpanElement;
  const slider = document.getElementById("slider") as HTMLInputElement;

  let gameSpeed = 5;
  let gameFrame = 0;

  showSpeedEl.innerText = gameSpeed.toString();
  slider.value = gameSpeed.toString();

  const layer1 = new BackgroundLayer(backgroundLayer1, 0.2, gameSpeed);
  const layer2 = new BackgroundLayer(backgroundLayer2, 0.4, gameSpeed);
  const layer3 = new BackgroundLayer(backgroundLayer3, 0.6, gameSpeed);
  const layer4 = new BackgroundLayer(backgroundLayer4, 0.8, gameSpeed);
  const layer5 = new BackgroundLayer(backgroundLayer5, 1, gameSpeed);

  let gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(layer => {
      layer.start(ctx, gameFrame, gameSpeed);
    });
    gameFrame--;
    requestAnimationFrame(animate);
  }
  animate();

  const handleSliderChange = (e: Event) => {
    //@ts-ignore
    gameSpeed = e.currentTarget.value;
    showSpeedEl.innerText = gameSpeed.toString();
  };
  slider.addEventListener("change", handleSliderChange);
});
