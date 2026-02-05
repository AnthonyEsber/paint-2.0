import { addClickListener } from "./lib/utils/events.js";
import { CanvasRenderer } from "./lib/render/renderer.js";

export function initCanvas() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const renderer = new CanvasRenderer(canvas);

  const clearBtn = document.getElementById('clear-canvas-btn')
  if(clearBtn) {
    clearBtn.addEventListener("click", () => {
      console.log()
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      renderer.clearObjects()
    })
  }

  const removeClick = addClickListener(canvas, renderer.handleClickEvent);

  return () => removeClick();
}
