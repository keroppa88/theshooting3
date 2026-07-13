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

  let base = null;
  let orientation = null;
  let motion = null;
  let source = null;
  let controlsEnabled = false;

  function orientationAngle() {
    if (screen.orientation && typeof screen.orientation.angle === "number") return screen.orientation.angle;
    if (typeof window.orientation === "number") return (window.orientation + 360) % 360;
    return 90;
  }

  function rawTilt() {
    const angle = orientationAngle();
    if (orientation) {
      if (angle === 270 || angle === -90) {
        return { source: "orientation", x: -orientation.beta, y: orientation.gamma, sx: 12, sy: 14 };
      }
      return { source: "orientation", x: orientation.beta, y: -orientation.gamma, sx: 12, sy: 14 };
    }
    if (motion) {
      if (angle === 270 || angle === -90) {
        return { source: "motion", x: motion.y, y: motion.x, sx: 1.7, sy: 2.0 };
      }
      return { source: "motion", x: -motion.y, y: -motion.x, sx: 1.7, sy: 2.0 };
    }
    return null;
  }

  function applyTilt() {
    if (!controlsEnabled) return;
    const raw = rawTilt();
    if (!raw) return;
    if (!base || source !== raw.source) {
      source = raw.source;
      base = { x: raw.x, y: raw.y };
    }

    const dx = raw.x - base.x;
    const dy = raw.y - base.y;
    const deadX = raw.sx * 0.35;
    const deadY = raw.sy * 0.35;

    sendKey("ArrowLeft", dx < -deadX);
    sendKey("ArrowRight", dx > deadX);
    sendKey("ArrowUp", dy > deadY);
    sendKey("ArrowDown", dy < -deadY);
  }

  function onDeviceOrientation(e) {
    if (e.beta === null && e.gamma === null) return;
    orientation = { beta: e.beta || 0, gamma: e.gamma || 0 };
    applyTilt();
  }

  function onDeviceMotion(e) {
    const a = e.accelerationIncludingGravity;
    if (!a || (a.x === null && a.y === null)) return;
    motion = { x: a.x || 0, y: a.y || 0 };
    applyTilt();
  }

  function addSensorListeners() {
    window.addEventListener("deviceorientation", onDeviceOrientation, true);
    window.addEventListener("devicemotion", onDeviceMotion, true);
  }

  let permissionRequested = false;
  function enableSensors() {
    if (permissionRequested) return;
    permissionRequested = true;
    const requests = [];
    const DOE = window.DeviceOrientationEvent;
    const DME = window.DeviceMotionEvent;

    try {
      if (DOE && typeof DOE.requestPermission === "function") requests.push(DOE.requestPermission());
      if (DME && typeof DME.requestPermission === "function") requests.push(DME.requestPermission());
      if (requests.length > 0) {
        Promise.allSettled(requests).then(results => {
          if (results.some(r => r.status === "fulfilled" && r.value === "granted")) addSensorListeners();
        }).catch(() => {});
      } else {
        addSensorListeners();
      }
    } catch (err) {
      addSensorListeners();
    }
  }

  function enableControls() {
    controlsEnabled = true;
  }


  function isSideTouch(touch) {
    const stage = document.getElementById("stage");
    if (!stage) return false;
    const rect = stage.getBoundingClientRect();
    return touch.clientX < rect.left || touch.clientX > rect.right;
  }

  function updateFire(e) {
    if (!controlsEnabled) return;
    const firing = Array.from(e.touches || []).some(isSideTouch);
    sendKey("Space", firing);
  }

  function resetCalibration() {
    base = null;
    source = null;
    releaseMoveKeys();
  }

  window.addEventListener("blur", () => {
    releaseMoveKeys();
    sendKey("Space", false);
  });
  window.addEventListener("orientationchange", resetCalibration);

  document.addEventListener("touchstart", enableSensors, { passive: true, once: true });
  document.addEventListener("pointerup", enableControls, { passive: true, once: true });
  document.addEventListener("touchstart", updateFire, { passive: true });
  document.addEventListener("touchmove", updateFire, { passive: true });
  document.addEventListener("touchend", updateFire, { passive: true });
  document.addEventListener("touchcancel", updateFire, { passive: true });
})();
