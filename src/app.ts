import { addClickListener } from "./lib/utils/events.js";
import { CanvasRenderer } from "./lib/render/renderer.js";

export function initCanvas() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const renderer = new CanvasRenderer(canvas);

  const removeClick = addEventListener('click', () => {
    const result = renderer.placeShape({kind: 'circle', color: 'green', size: 20, position:{x:20, y:30}})
  });


}


