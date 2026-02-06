import { createshape } from "../abstract/createShape.js";
import { type Shape } from "../abstract/Shape.js";
import type { ShapeOptions } from "../abstract/types.js";
import {
  isMouseInsideCanvas,
} from "../utils/coords.js";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private dpr = 1;
  private elemColor: string;
  private size: number;
  private kind: "circle" | "rectangle"; //TODO: add triangle when impl
  private raf = 0;
  private boundOnResize: () => void;

  constructor(
    canvasEl: HTMLCanvasElement,
    elemColor: string,
    size: number,
    kind: "circle" | "rectangle", //TODO: add triangle when impl
  ) {
    this.elemColor = elemColor;
    this.size = size;
    this.kind = kind;
    this.canvas = canvasEl;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) {
      throw new Error("cant get context from canvas");
    }
    this.ctx = ctx;

    this.resize();

    this.boundOnResize = () => {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this.resize());
    }

    window.addEventListener("resize", this.boundOnResize);
  }

  destroy(): void {
    window.removeEventListener("resize", this.boundOnResize);
    cancelAnimationFrame(this.raf);
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

  handleClickEventCanvas = (evt: MouseEvent) => {
    if (!isMouseInsideCanvas(evt, this.canvas)) return;

    const rect = this.canvas.getBoundingClientRect();
    const w = this.getWidth();
    const h = this.getHeight();
    const localCoordinates = {
      x: ((evt.clientX - rect.left) / rect.width) * w,
      y: ((evt.clientY - rect.top) / rect.height) * h,
    };

    this.placeShape({
      kind: this.kind,
      color: this.elemColor,
      size: this.size,
      position: localCoordinates,
    });
  };

  handleClickEventToolbar = (evt: MouseEvent) => {
    const btn = (evt.target as HTMLElement).closest(
      "button[data-tool]",
    ) as HTMLButtonElement | null;

    if (!btn) return;

    const tool = btn.dataset.tool;

    if (tool === "rect") {
      this.kind = "rectangle";
    } else if (tool === "circle") {
      this.kind = "circle";
    }

    const toolbar = btn.closest("nav");
    if (!toolbar) return;

    const shapeBtns = toolbar.querySelectorAll(
      "button[data-tool='rect'], button[data-tool='circle']",
    );
    shapeBtns.forEach((btn) => btn.classList.remove("is-active"));

    btn.classList.add("is-active");
  };

  getWidth(): number {
    return Math.floor(this.canvas.width / this.dpr);
  }
  getHeight(): number {
    return Math.floor(this.canvas.height / this.dpr);
  }

  clearObjects() {
    this.shapes = [];
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
