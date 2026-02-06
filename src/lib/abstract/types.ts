// pozitie
export interface Point2d {
  x: number;
  y: number;
}

// shape types
export interface ShapeOptions {
  kind: "circle" | "rectangle";
  color: string;
  position: Point2d;
  size: number;
}

export type ShapeKind = ShapeOptions["kind"];

export type ToolBarState = {
  tool?: string;
  shape?: string;
  color?: string;
  size?: number;
};
