import type { ShapeOptions } from "./types.js";
import { Shape } from "./Shape.js";
import { Rectangle } from "../shapes/Rectangle.js";
import { Circle } from "../shapes/Circle.js"; 


export function createshape(options: ShapeOptions): Shape {
  const base = {
    position: options.position,
    color: options.color,
    size: options.size,
    kind: options.kind,
  };

  if (options.kind === "circle") {
    return new Circle(base);
  } else {
    return new Rectangle(base);
  }
}
