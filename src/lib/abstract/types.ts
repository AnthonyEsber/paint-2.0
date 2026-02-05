// pozitie
export interface Point2d {
    x: number;
    y: number;
}

// forma , cerc sau patrat momentan
export type shapeKind = 'circle' | 'square';

// shape types
export interface ShapeOptions {
    kind: shapeKind;
    color: string;
    position: Point2d;
    size: number;
}