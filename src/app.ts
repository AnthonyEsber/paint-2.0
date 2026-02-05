import { addClickListener } from "./lib/utils/events.js";
import { CanvasRenderer } from "./lib/render/renderer.js";

export function initCanvas() {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const renderer = new CanvasRenderer({
    canvas,
    size: 25,
    shape: "square",
  });

  const removeClick = addClickListener(canvas, renderer.handleClick);

  return () => removeClick();
}
