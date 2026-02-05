import type { Point2d } from "../abstract/types.js";


export function isMouseInsideCanvas(
  evt: MouseEvent,
  element: HTMLElement,
): boolean {
  const rect = element.getBoundingClientRect();
  return (
    evt.clientX >= rect.left &&
    evt.clientX <= rect.right &&
    evt.clientY >= rect.top &&
    evt.clientY <= rect.bottom
  );
}

export function getRelativeMousePosition(
  evt: MouseEvent,
  element: HTMLElement,
): Point2d {
  const rect = element.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
