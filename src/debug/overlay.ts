(function () {
  const canvas = document.querySelector("canvas");

  console.log(canvas);

  if (!canvas) return;

  const el = document.createElement("div");
  el.className = "paint--debug__overlay";

  document.body.appendChild(el);

  let mouseX = 0;
  let mouseY = 0;
  let rect = canvas.getBoundingClientRect();

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function render() {
    el.textContent = `
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
