(() => {
  "use strict";

  const isMobileLike = () => {
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const touchPoints = (navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0) > 0;
    return coarse || touchPoints || ("ontouchstart" in window);
  };

  if (!isMobileLike()) return;

  const pressed = new Set();
  const keyCodeMap = {
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
    Space: "Space"
  };

  function sendKey(code, down) {
    if (down === pressed.has(code)) return;
    if (down) pressed.add(code);
    else pressed.delete(code);

    document.dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", {
      bubbles: true,
      cancelable: true,
      code,
      key: keyCodeMap[code] || code
    }));
  }

  function releaseMoveKeys() {
    sendKey("ArrowLeft", false);
    sendKey("ArrowRight", false);
    sendKey("ArrowUp", false);
    sendKey("ArrowDown", false);
  }

  function tryLockLandscape() {
    const lock = () => {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {});
      }
    };
    const root = document.documentElement;
    if (root.requestFullscreen && !document.fullscreenElement) {
      root.requestFullscreen().then(lock).catch(lock);
    } else {
      lock();
    }
  }

  function bindHoldButton(button) {
    const code = button.dataset.key;
    const release = () => {
      button.classList.remove("is-pressed");
      sendKey(code, false);
    };

    button.addEventListener("pointerdown", e => {
      e.preventDefault();
      button.setPointerCapture(e.pointerId);
      button.classList.add("is-pressed");
      sendKey(code, true);
    });
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  }

  function bindActionButton(button) {
    button.addEventListener("pointerdown", e => {
      e.preventDefault();
      const code = button.dataset.actionKey;
      sendKey(code, true);
      sendKey(code, false);
    });
  }

  document.querySelectorAll(".mobile-button[data-key]").forEach(bindHoldButton);
  document.querySelectorAll(".mobile-button[data-action-key]").forEach(bindActionButton);

  window.addEventListener("blur", () => {
    releaseMoveKeys();
    sendKey("Space", false);
  });
  window.addEventListener("orientationchange", () => {
    releaseMoveKeys();
    sendKey("Space", false);
  });

  document.addEventListener("touchstart", () => {
    tryLockLandscape();
  }, { passive: true, once: true });
})();
