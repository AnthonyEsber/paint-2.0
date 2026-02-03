import {
  getRelativeMousePosition,
  isMouseInsideCanvas,
} from "../utils/coords.js";
import type { PointData } from "../utils/types.js";
import type { CanvasRenderOptions } from "./types.js";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private shape: "circle" | "square";

  constructor(options: CanvasRenderOptions) {
    this.canvas = options.canvas;

    const ctx = this.canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas 2D ctx not available");

    this.ctx = ctx;

    this.size = options.size ?? 20;
    this.shape = options.shape ?? "circle";
  }

  handleClick = (evt: MouseEvent) => {
    if (!isMouseInsideCanvas(evt, this.canvas)) return;

    const local = getRelativeMousePosition(evt, this.canvas);
    this.drawShape(local);
  };

  //TODO: finish drawShape func
  private drawShape(p: PointData) {
    const ctx = this.ctx;

    ctx.fillStyle = "#00441c";
    ctx.strokeStyle = "#013718"; //TODO: add into constructor
    ctx.lineWidth = 1.5;

    if (this.shape === "circle") {
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      const half = this.size / 2;
      ctx.beginPath();
      ctx.rect(p.x - half, p.y - half, this.size, this.size);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle;
  }
}
