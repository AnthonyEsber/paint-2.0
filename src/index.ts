const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("2D Context not supported");
}

ctx.strokeRect(50, 50, 200, 100);
