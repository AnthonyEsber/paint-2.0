import { createshape } from "../abstract/createShape.js";
import { type Shape } from "../abstract/Shape.js";
import type { ShapeOptions } from "../abstract/types.js";
import {
  getRelativeMousePosition,
  isMouseInsideCanvas,
} from "../utils/coords.js";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private dpr = 1;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = canvasEl;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) {
      throw new Error("cant get context from canvas");
    }
    this.ctx = ctx;

    this.resize();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => this.resize());
    };

    window.addEventListener("resize", onResize);
  }

  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;

    const rect = this.canvas.getBoundingClientRect();
    const cssWidth = Math.max(0, Math.floor(rect.width));
    const cssHeight = Math.max(0, Math.floor(rect.height));

    const targetW = Math.max(1, Math.round(cssWidth * dpr));
    const targetH = Math.max(1, Math.round(cssHeight * dpr));
    if (this.canvas.width !== targetW) this.canvas.width = targetW;
    if (this.canvas.height !== targetH) this.canvas.height = targetH;

    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;

    if (typeof (this.ctx as any).resetTransform === "function") {
      (this.ctx as any).resetTransform();
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.redraw();
  }

  placeShape(
    options: Partial<ShapeOptions> & { kind: ShapeOptions["kind"] },
  ): Shape | null {
    const full: ShapeOptions = {
      kind: options.kind,
      position: options.position ?? {
        x: this.getWidth() / 2,
        y: this.getHeight() / 2,
      },
      color: options.color ?? "#b82f6",
      size: options.size ?? 40,
    };
    const shape = createshape(full);

    this.shapes.push(shape);
    this.redraw();
    return shape;
  }

  handleClickEvent = (evt: MouseEvent) => {
    if (!isMouseInsideCanvas(evt, this.canvas)) return;

    const localCoordinates = getRelativeMousePosition(evt, this.canvas);

    this.placeShape({
      kind: "circle",
      color: "green",
      size: 20,
      position: localCoordinates,
    });
  };

  getWidth(): number {
    return Math.floor(this.canvas.getBoundingClientRect().width);
  }
  getHeight(): number {
    return Math.floor(this.canvas.getBoundingClientRect().height);
  }

  clearObjects() {
    this.shapes = []
  }

  private redraw(): void {
    const w = this.getWidth();
    const h = this.getHeight();
    this.ctx.clearRect(0, 0, w, h);

    for (const shape of this.shapes) {
      shape.draw(this.ctx);
    }
  }
}
