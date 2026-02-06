import { type Point2d,type ShapeKind } from "./types.js";

export abstract class Shape {
    position: Point2d;
    color: string;
    size: number;
    readonly kind: ShapeKind;

    constructor(options: {
    position: Point2d;
    color: string;
    size: number;
    kind: ShapeKind;
  }) {
    this.position = { x: options.position.x, y: options.position.y };
    this.color = options.color;
    this.size = options.size;
    this.kind = options.kind;
  }

    // functie pt render in canvas
  abstract draw(ctx: CanvasRenderingContext2D): void;

}
