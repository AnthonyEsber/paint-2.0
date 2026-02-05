import { addClickListener } from "./lib/utils/events.js";
import { CanvasRenderer } from "./lib/render/renderer.js";

export function initCanvas() {
  const DEFAULT_COLOR = "green";
  const DEFAULT_SIZE = 20;
  const DEFAULT_KIND = "rectangle";

  const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
  const toolbar = document.querySelector("nav") as HTMLElement | null;
  if (!canvas || !toolbar) {
    throw new Error("Canvas not found");
  }

  const renderer = new CanvasRenderer(
    canvas,
    DEFAULT_COLOR,
    DEFAULT_SIZE,
    DEFAULT_KIND,
  );

  const clearBtn = document.getElementById("clear-canvas-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      console.log();
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      renderer.clearObjects();
    });
  }

  const removeClickCanvas = addClickListener(
    canvas,
    renderer.handleClickEventCanvas,
  );
  const removeClickToolbar = addClickListener(
    toolbar,
    renderer.handleClickEventToolbar,
  );

  return () => {
    removeClickCanvas();
    removeClickToolbar();
  };
}
