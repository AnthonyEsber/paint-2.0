// pozitie
export interface Point2d {
  x: number;
  y: number;
}

// forma , cerc sau patrat momentan
export type shapeKind = "circle" | "rectangle";

// shape types
export interface ShapeOptions {
  kind: shapeKind;
  color: string;
  position: Point2d;
  size: number;
}

export type ToolBarState = {
  tool?: string;
  shape?: string;
  color?: string;
  size?: number;
};
