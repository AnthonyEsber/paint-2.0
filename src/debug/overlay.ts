(function () {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();

  const overlay = document.createElement("div");
  overlay.className = "paint--debug__overlay";
  document.body.appendChild(overlay);

  const info = document.createElement("div");
  overlay.appendChild(info);

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

function render() {
    info.textContent = `
    canvas:
    css: ${Math.round(rect.width)} x ${Math.round(rect.height)}
    dpr: ${window.devicePixelRatio}
    

    mouse (canvas):
    x=${Math.round(mouseX)}
    y=${Math.round(mouseY)}
`.trim();
    requestAnimationFrame(render);
  }
  render();
})();
