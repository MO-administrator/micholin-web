import bgLayer1 from "./backgroundLayers/layer-1.png";
import bgLayer2 from "./backgroundLayers/layer-2.png";
import bgLayer3 from "./backgroundLayers/layer-3.png";
import bgLayer4 from "./backgroundLayers/layer-4.png";
import bgLayer5 from "./backgroundLayers/layer-5.png";

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

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
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
  slider.addEventListener("change", e => {
    //@ts-ignore
    gameSpeed = e.currentTarget.value;
    showSpeedEl.innerText = gameSpeed.toString();
  });

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

    constructor(image: HTMLImageElement, speedModifier: number) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new BackgroundLayer(backgroundLayer1, 0.2);
  const layer2 = new BackgroundLayer(backgroundLayer2, 0.4);
  const layer3 = new BackgroundLayer(backgroundLayer3, 0.6);
  const layer4 = new BackgroundLayer(backgroundLayer4, 0.8);
  const layer5 = new BackgroundLayer(backgroundLayer5, 1);

  let gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(layer => {
      layer.update();
      layer.draw();
    });
    gameFrame--;
    requestAnimationFrame(animate);
  }
  animate();
});
