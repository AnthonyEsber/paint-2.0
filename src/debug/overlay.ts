(function () {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const overlay = document.createElement("div");
  overlay.className = "paint--debug__overlay";
  document.body.appendChild(overlay);

  const info = document.createElement("div");
  overlay.appendChild(info);

  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.textContent = "Clear Canvas";
  overlay.appendChild(clearBtn);

  clearBtn.addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, rect.width, rect.height);
    }
  });

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
