// ==UserScript==
// @name         Krunker U$ER 🆘
// @namespace    https://github.com/TheUserSOS/
// @version      1.6.9
// @description  Advanced player visualization and targeting system for Krunker with RGB mode and modern UI
// @author       Solitarian
// @license      All Rights Reserved
// @match        *://krunker.io/*
// @match        *://browserfps.com/*
// @exclude      *://krunker.io/social*
// @exclude      *://krunker.io/editor*
// @icon         https://imgs.search.brave.com/gxbuwhW4MDf4kMmg5OEdn39Rr6wEB73igFjHpZlBbl0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hq/dzg5L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2toZnFzbm0xcG0x/YjEucG5n
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  "use strict";
  const _0x235b55 = [{
    name: "RGB",
    value: "1.0, 0.0, 0.0",
    hex: "#ff0000",
    style: "color: #ff0000"
  }];
  const _0x284513 = {
    targetingEnabled: true,
    visualizationEnabled: true,
    trajectoryLines: true,
    visualizationColor: "1.0, 0.0, 0.0",
    visualizationColorIndex: 0,
    verticalAdjustment: 7.5,
    targetingMode: "crosshairProximity",
    predictionIntensity: 0.85,
    targetingPrecision: 95,
    smoothTargeting: false,
    smoothingFactor: 25,
    uiCollapsed: false,
    lastActivePanel: null,
    isRgbMode: true,
    debug: {
      enabled: true,
      showFPS: true
    },
    interface: {
      rainbowSpeed: 1,
      theme: "dark"
    }
  };
  const _0x49e57d = Object.assign({}, _0x284513, GM_getValue("krunkerEnhancerConfig", {}));
  if (!_0x49e57d.debug) {
    _0x49e57d.debug = _0x284513.debug;
  }
  if (!_0x49e57d.interface) {
    _0x49e57d.interface = _0x284513.interface;
  }
  if (_0x49e57d.interface && !_0x49e57d.interface.theme) {
    _0x49e57d.interface.theme = "dark";
  }
  _0x49e57d.isRgbMode = true;
  _0x49e57d.visualizationColorIndex = 0;
  _0x49e57d.debug.showFPS = true;
  const _0x5663b4 = {
    KeyB: "targetingEnabled",
    KeyN: "visualizationEnabled",
    KeyM: "trajectoryLines",
    BracketLeft: "decreaseVerticalAdjustment",
    BracketRight: "increaseVerticalAdjustment",
    Digit2: "toggleTargetingMode",
    Digit3: "smoothTargeting",
    Backslash: "toggleUI",
    KeyR: "adjustRainbowSpeed",
    KeyD: "toggleDebug",
    KeyT: "toggleTheme"
  };
  let _0x3e11a9;
  let _0x37f518 = null;
  let _0x3901ca = false;
  let _0x2d68c4 = false;
  let _0xf882f = null;
  let _0x1b0a00 = {};
  let _0x525983 = 0;
  let _0xccf09d = 0;
  let _0x3143de = 0;
  let _0x2700f1 = 0;
  let _0x22c731 = 0;
  let _0x2ecf32 = 0;
  const _0x3bb8fb = window.THREE;
  delete window.THREE;
  const _0x1bac78 = {
    window: window,
    document: document,
    querySelector: document.querySelector,
    log: console.log,
    arrayProto: Array.prototype,
    arrayPush: Array.prototype.push,
    requestFrame: window.requestAnimationFrame,
    setTimeout: window.setTimeout
  };
  _0x1bac78.log("Initializing precision enhancement system...");
  const _0x1d9bb7 = function (_0x253d54) {
    try {
      if (typeof _0x253d54 === "object" && typeof _0x253d54.parent === "object" && _0x253d54.parent.type === "Scene" && _0x253d54.parent.name === "Main") {
        _0x1bac78.log("Scene context acquired");
        _0x3e11a9 = _0x253d54.parent;
        _0x1bac78.arrayProto.push = _0x1bac78.arrayPush;
      }
    } catch (_0x300f3a) {}
    return _0x1bac78.arrayPush.apply(this, arguments);
  };
  const _0x35c6cb = new _0x3bb8fb.Vector3();
  const _0x4af915 = new _0x3bb8fb.Vector3();
  const _0x5668b2 = new _0x3bb8fb.Object3D();
  _0x5668b2.rotation.order = "YXZ";
  const _0x39b1af = new _0x3bb8fb.EdgesGeometry(new _0x3bb8fb.BoxGeometry(4.8, 14.8, 4.8).translate(0, 7.4, 0));
  function _0x4214cc(_0x4f2ce4, _0xe22b1e, _0xa73775) {
    let _0x3ec6b1;
    let _0x35d0c0;
    let _0x10dc1a;
    if (_0xe22b1e === 0) {
      _0x3ec6b1 = _0x35d0c0 = _0x10dc1a = _0xa73775;
    } else {
      const _0x3353c8 = (_0xcafbfd, _0x16cf1b, _0x34c82a) => {
        if (_0x34c82a < 0) {
          _0x34c82a += 1;
        }
        if (_0x34c82a > 1) {
          _0x34c82a -= 1;
        }
        if (_0x34c82a < 1 / 6) {
          return _0xcafbfd + (_0x16cf1b - _0xcafbfd) * 6 * _0x34c82a;
        }
        if (_0x34c82a < 1 / 2) {
          return _0x16cf1b;
        }
        if (_0x34c82a < 2 / 3) {
          return _0xcafbfd + (_0x16cf1b - _0xcafbfd) * (2 / 3 - _0x34c82a) * 6;
        }
        return _0xcafbfd;
      };
      const _0x5401fa = _0xa73775 < 0.5 ? _0xa73775 * (1 + _0xe22b1e) : _0xa73775 + _0xe22b1e - _0xa73775 * _0xe22b1e;
      const _0x9ac686 = _0xa73775 * 2 - _0x5401fa;
      _0x3ec6b1 = _0x3353c8(_0x9ac686, _0x5401fa, _0x4f2ce4 + 1 / 3);
      _0x35d0c0 = _0x3353c8(_0x9ac686, _0x5401fa, _0x4f2ce4);
      _0x10dc1a = _0x3353c8(_0x9ac686, _0x5401fa, _0x4f2ce4 - 1 / 3);
    }
    return {
      r: _0x3ec6b1,
      g: _0x35d0c0,
      b: _0x10dc1a,
      cssColor: "rgb(" + Math.round(_0x3ec6b1 * 255) + ", " + Math.round(_0x35d0c0 * 255) + ", " + Math.round(_0x10dc1a * 255) + ")"
    };
  }
  function _0x29ac0f() {
    const _0x546b4f = performance.now();
    const _0x1aee88 = _0x546b4f - _0x22c731;
    _0x22c731 = _0x546b4f;
    _0x2ecf32 = (_0x2ecf32 + _0x1aee88 * 0.0001 * _0x49e57d.interface.rainbowSpeed) % 1;
    return _0x4214cc(_0x2ecf32, 1, 0.5);
  }
  let _0x1d979d = new _0x3bb8fb.RawShaderMaterial({
    vertexShader: "\n            attribute vec3 position;\n            uniform mat4 projectionMatrix;\n            uniform mat4 modelViewMatrix;\n            void main() {\n                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                gl_Position.z = 1.0;\n            }",
    fragmentShader: "\n            void main() {\n                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n            }"
  });
  const _0x1da760 = new _0x3bb8fb.LineSegments(new _0x3bb8fb.BufferGeometry(), _0x1d979d);
  _0x1da760.frustumCulled = false;
  const _0x3efcd8 = new _0x3bb8fb.BufferAttribute(new Float32Array(600), 3);
  _0x1da760.geometry.setAttribute("position", _0x3efcd8);
  function _0x48debc() {
    const _0x354c07 = _0x29ac0f();
    const _0x5df8b5 = "\n            void main() {\n                gl_FragColor = vec4(" + _0x354c07.r.toFixed(3) + ", " + _0x354c07.g.toFixed(3) + ", " + _0x354c07.b.toFixed(3) + ", 1.0);\n            }\n        ";
    _0x1d979d = new _0x3bb8fb.RawShaderMaterial({
      vertexShader: "\n                attribute vec3 position;\n                uniform mat4 projectionMatrix;\n                uniform mat4 modelViewMatrix;\n                void main() {\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                    gl_Position.z = 1.0;\n                }",
      fragmentShader: _0x5df8b5
    });
    _0x1da760.material = _0x1d979d;
    if (_0x3e11a9 && _0x3e11a9.children) {
      for (let _0x40ead2 = 0; _0x40ead2 < _0x3e11a9.children.length; _0x40ead2++) {
        const _0x47b934 = _0x3e11a9.children[_0x40ead2];
        if (_0x47b934.visualizationBox) {
          _0x47b934.visualizationBox.material = _0x1d979d;
        }
      }
    }
    const _0x3a76ba = document.getElementById("precision-color-value");
    if (_0x3a76ba) {
      _0x3a76ba.style.color = _0x354c07.cssColor;
    }
    const _0x137a34 = document.getElementById("precision-color-display");
    if (_0x137a34) {
      _0x137a34.style.backgroundColor = _0x354c07.cssColor;
    }
  }
  function _0x47b1f0() {
    const _0x2c020f = [0.5, 1, 2, 3];
    const _0xd23da3 = _0x2c020f.indexOf(_0x49e57d.interface.rainbowSpeed);
    const _0x8ea0dd = (_0xd23da3 + 1) % _0x2c020f.length;
    _0x49e57d.interface.rainbowSpeed = _0x2c020f[_0x8ea0dd];
    _0x6a669c();
    _0x24c91c();
  }
  function _0x5deab1() {
    Object.assign(_0x49e57d, _0x284513);
    _0x49e57d.isRgbMode = true;
    _0x49e57d.debug.showFPS = true;
    _0x24c91c();
    _0x6a669c();
  }
  function _0x574166(_0x5485ab) {
    if (_0x5485ab.button === 2) {
      _0x3901ca = true;
      _0x2d68c4 = false;
      _0xf882f = null;
    }
  }
  function _0x1af639(_0x4eabc0) {
    if (_0x4eabc0.button === 2) {
      _0x3901ca = false;
      _0x2d68c4 = false;
      _0xf882f = null;
    }
  }
  function _0x24c91c() {
    GM_setValue("krunkerEnhancerConfig", _0x49e57d);
  }
  function _0x5f6861(_0xf5a43d) {
    _0x49e57d[_0xf5a43d] = !_0x49e57d[_0xf5a43d];
    _0x6a669c();
    _0x24c91c();
  }
  function _0x572f71() {
    _0x49e57d.targetingMode = _0x49e57d.targetingMode === "crosshairProximity" ? "distanceProximity" : "crosshairProximity";
    _0x6a669c();
    _0x24c91c();
  }
  function _0x525259() {
    _0x49e57d.uiCollapsed = !_0x49e57d.uiCollapsed;
    const _0x3bbe30 = document.getElementById("precision-controls");
    if (_0x3bbe30) {
      _0x3bbe30.style.display = _0x49e57d.uiCollapsed ? "none" : "block";
    }
    _0x24c91c();
  }
  function _0x40c114() {
    _0x49e57d.debug.enabled = !_0x49e57d.debug.enabled;
    _0x6a669c();
    _0x24c91c();
  }
  function _0x3d1fac() {
    _0x49e57d.interface.theme = _0x49e57d.interface.theme === "dark" ? "light" : "dark";
    _0x25b237();
    _0x24c91c();
  }
  function _0x25b237() {
    const _0x4ce82a = document.getElementById("precision-controls");
    const _0x580c30 = document.querySelector(".precision-fps");
    if (_0x4ce82a) {
      if (_0x49e57d.interface.theme === "dark") {
        _0x4ce82a.classList.remove("light-theme");
        _0x4ce82a.classList.add("dark-theme");
      } else {
        _0x4ce82a.classList.remove("dark-theme");
        _0x4ce82a.classList.add("light-theme");
      }
    }
    if (_0x580c30) {
      if (_0x49e57d.interface.theme === "dark") {
        _0x580c30.classList.remove("light-theme");
        _0x580c30.classList.add("dark-theme");
      } else {
        _0x580c30.classList.remove("dark-theme");
        _0x580c30.classList.add("light-theme");
      }
    }
  }
  function _0xe6f12f() {
    _0x3143de++;
    const _0xe9d2c4 = performance.now();
    const _0x18b8da = _0xe9d2c4 - _0xccf09d;
    if (_0x18b8da >= 1000) {
      _0x2700f1 = Math.round(_0x3143de * 1000 / _0x18b8da);
      _0x3143de = 0;
      _0xccf09d = _0xe9d2c4;
      const _0x27ee37 = document.querySelector(".precision-fps-value");
      if (_0x27ee37) {
        _0x27ee37.textContent = _0x2700f1;
        if (_0x2700f1 >= 100) {
          _0x27ee37.style.color = "#4CAF50";
        } else if (_0x2700f1 >= 60) {
          _0x27ee37.style.color = "#CDDC39";
        } else if (_0x2700f1 >= 30) {
          _0x27ee37.style.color = "#FFC107";
        } else {
          _0x27ee37.style.color = "#F44336";
        }
      }
    }
  }
  function _0x6a669c() {
    const _0xfb13e9 = document.getElementById("precision-status");
    if (_0xfb13e9) {
      _0xfb13e9.textContent = _0x49e57d.targetingEnabled ? "ACTIVE" : "INACTIVE";
      _0xfb13e9.style.color = _0x49e57d.targetingEnabled ? "var(--success-color)" : "var(--error-color)";
    }
    const _0x265eef = {
      "precision-targeting": _0x49e57d.targetingEnabled,
      "precision-visualization": _0x49e57d.visualizationEnabled,
      "precision-trajectories": _0x49e57d.trajectoryLines,
      "precision-smooth": _0x49e57d.smoothTargeting,
      "precision-debug": _0x49e57d.debug.enabled,
      "precision-fps": _0x49e57d.debug.showFPS
    };
    Object.entries(_0x265eef).forEach(([_0x531627, _0x44ee06]) => {
      const _0x51af1b = document.getElementById(_0x531627);
      if (_0x51af1b) {
        _0x51af1b.checked = _0x44ee06;
        const _0x5cb6b1 = _0x51af1b.nextElementSibling;
        if (_0x5cb6b1 && _0x5cb6b1.classList.contains("custom-checkbox")) {
          if (_0x44ee06) {
            _0x5cb6b1.classList.add("checked");
          } else {
            _0x5cb6b1.classList.remove("checked");
          }
        }
      }
    });
    const _0x48f3fe = {
      "precision-vertical": _0x49e57d.verticalAdjustment,
      "precision-prediction": _0x49e57d.predictionIntensity,
      "precision-accuracy": _0x49e57d.targetingPrecision / 100,
      "precision-smoothing": _0x49e57d.smoothingFactor,
      "precision-rainbow-speed": _0x49e57d.interface.rainbowSpeed
    };
    Object.entries(_0x48f3fe).forEach(([_0x56771f, _0x2f77b2]) => {
      const _0x3de83f = document.getElementById(_0x56771f);
      const _0x444ccd = document.getElementById(_0x56771f + "-value");
      if (_0x3de83f) {
        _0x3de83f.value = _0x2f77b2;
      }
      if (_0x444ccd) {
        if (_0x56771f === "precision-prediction" || _0x56771f === "precision-accuracy") {
          _0x444ccd.textContent = Math.round(_0x2f77b2 * 100) + "%";
        } else if (_0x56771f === "precision-vertical") {
          _0x444ccd.textContent = _0x2f77b2.toFixed(1);
        } else if (_0x56771f === "precision-rainbow-speed") {
          _0x444ccd.textContent = _0x2f77b2.toFixed(1) + "x";
        } else {
          _0x444ccd.textContent = _0x2f77b2;
        }
      }
    });
    const _0x2728f9 = document.getElementById("precision-mode-value");
    if (_0x2728f9) {
      _0x2728f9.textContent = _0x49e57d.targetingMode === "crosshairProximity" ? "Crosshair" : "Distance";
    }
    const _0x8a01b = document.querySelector(".precision-fps");
    if (_0x8a01b) {
      _0x8a01b.style.display = "block";
    }
    const _0x523720 = document.getElementById("precision-theme-toggle");
    if (_0x523720) {
      _0x523720.textContent = _0x49e57d.interface.theme === "dark" ? "☀️" : "🌙";
      _0x523720.title = _0x49e57d.interface.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
  }
  function _0x4e5514() {
    const _0x3c40f0 = document.createElement("style");
    _0x3c40f0.textContent = "\n            :root {\n                --dark-bg: rgba(33, 33, 33, 0.95);\n                --dark-border: #444;\n                --dark-text: #fff;\n                --dark-accent: #2196F3;\n                --dark-hover: #444;\n                --dark-slider-bg: #555;\n                --dark-slider-thumb: #2196F3;\n                \n                --light-bg: rgba(245, 245, 245, 0.95);\n                --light-border: #ccc;\n                --light-text: #333;\n                --light-accent: #2196F3;\n                --light-hover: #e0e0e0;\n                --light-slider-bg: #ccc;\n                --light-slider-thumb: #2196F3;\n                \n                --success-color: #4CAF50;\n                --error-color: #F44336;\n                --warning-color: #FFC107;\n                --info-color: #2196F3;\n            }\n            \n            .dark-theme {\n                --bg-color: var(--dark-bg);\n                --border-color: var(--dark-border);\n                --text-color: var(--dark-text);\n                --accent-color: var(--dark-accent);\n                --hover-color: var(--dark-hover);\n                --slider-bg: var(--dark-slider-bg);\n                --slider-thumb: var(--dark-slider-thumb);\n            }\n            \n            .light-theme {\n                --bg-color: var(--light-bg);\n                --border-color: var(--light-border);\n                --text-color: var(--light-text);\n                --accent-color: var(--light-accent);\n                --hover-color: var(--light-hover);\n                --slider-bg: var(--light-slider-bg);\n                --slider-thumb: var(--light-slider-thumb);\n            }\n            \n            #precision-controls {\n                position: fixed;\n                right: 15px;\n                top: 120px;\n                background: var(--bg-color);\n                border: 1px solid var(--border-color);\n                border-radius: 12px;\n                padding: 16px;\n                width: 300px;\n                z-index: 9999;\n                font-family: 'Segoe UI', Arial, sans-serif;\n                color: var(--text-color);\n                box-shadow: 0 4px 10px rgba(0,0,0,0.2);\n                transition: all 0.3s ease;\n                overflow: hidden;\n            }\n            \n            .precision-header {\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n                margin-bottom: 12px;\n                border-bottom: 1px solid var(--border-color);\n                padding-bottom: 8px;\n            }\n            \n            .precision-title {\n                margin: 0;\n                font-size: 18px;\n                font-weight: 600;\n                color: var(--accent-color);\n            }\n            \n            .precision-controls-right {\n                display: flex;\n                gap: 8px;\n            }\n            \n            .precision-icon-button {\n                background: transparent;\n                border: none;\n                color: var(--text-color);\n                font-size: 16px;\n                cursor: pointer;\n                padding: 4px;\n                border-radius: 4px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                transition: all 0.2s ease;\n            }\n            \n            .precision-icon-button:hover {\n                background: var(--hover-color);\n            }\n            \n            .precision-control {\n                margin: 12px 0;\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n            }\n            \n            .precision-control label {\n                font-size: 14px;\n                margin-right: 10px;\n                flex: 1;\n            }\n            \n            .precision-slider-container {\n                display: flex;\n                align-items: center;\n                gap: 8px;\n                flex: 1;\n            }\n            \n            .precision-slider {\n                -webkit-appearance: none;\n                width: 100%;\n                height: 6px;\n                border-radius: 3px;\n                background: var(--slider-bg);\n                outline: none;\n                transition: all 0.2s;\n            }\n            \n            .precision-slider::-webkit-slider-thumb {\n                -webkit-appearance: none;\n                appearance: none;\n                width: 16px;\n                height: 16px;\n                border-radius: 50%;\n                background: var(--slider-thumb);\n                cursor: pointer;\n                transition: all 0.2s;\n            }\n            \n            .precision-slider::-moz-range-thumb {\n                width: 16px;\n                height: 16px;\n                border-radius: 50%;\n                background: var(--slider-thumb);\n                cursor: pointer;\n                transition: all 0.2s;\n            }\n            \n            .precision-slider::-webkit-slider-thumb:hover {\n                transform: scale(1.2);\n            }\n            \n            .precision-slider::-moz-range-thumb:hover {\n                transform: scale(1.2);\n            }\n            \n            .precision-value {\n                font-size: 14px;\n                color: var(--accent-color);\n                min-width: 50px;\n                text-align: right;\n                font-weight: 500;\n            }\n            \n            .precision-status-container {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                margin: 16px 0;\n                padding: 8px;\n                border-radius: 8px;\n                background: rgba(0,0,0,0.1);\n            }\n            \n            #precision-status {\n                font-weight: bold;\n                font-size: 16px;\n            }\n            \n            .precision-button {\n                background: var(--accent-color);\n                border: none;\n                color: white;\n                padding: 8px 12px;\n                border-radius: 6px;\n                cursor: pointer;\n                font-size: 14px;\n                font-weight: 500;\n                transition: all 0.2s;\n                text-transform: uppercase;\n                letter-spacing: 0.5px;\n            }\n            \n            .precision-button:hover {\n                transform: translateY(-2px);\n                box-shadow: 0 2px 5px rgba(0,0,0,0.2);\n            }\n            \n            .precision-button-group {\n                display: flex;\n                justify-content: space-between;\n                gap: 10px;\n                margin-top: 16px;\n            }\n            \n            .precision-button-group button {\n                flex: 1;\n            }\n            \n            /* Custom checkbox styling */\n            .checkbox-container {\n                display: flex;\n                align-items: center;\n            }\n            \n            .precision-checkbox {\n                position: absolute;\n                opacity: 0;\n                cursor: pointer;\n                height: 0;\n                width: 0;\n            }\n            \n            .custom-checkbox {\n                position: relative;\n                height: 20px;\n                width: 20px;\n                background-color: transparent;\n                border: 2px solid var(--accent-color);\n                border-radius: 4px;\n                cursor: pointer;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                transition: all 0.2s;\n            }\n            \n            .custom-checkbox:hover {\n                background-color: rgba(33, 150, 243, 0.1);\n            }\n            \n            .custom-checkbox.checked:after {\n                content: '';\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                background-color: var(--accent-color);\n                border-radius: 2px;\n            }\n            \n            .precision-fps {\n                position: fixed;\n                top: 10px;\n                right: 10px;\n                background: var(--bg-color);\n                padding: 8px 12px;\n                border-radius: 8px;\n                font-family: 'Consolas', monospace;\n                font-size: 14px;\n                display: block; /* Always display FPS */\n                z-index: 10000;\n                align-items: center;\n                gap: 8px;\n                box-shadow: 0 2px 5px rgba(0,0,0,0.2);\n            }\n            \n            .precision-fps-label {\n                font-weight: 500;\n            }\n            \n            .precision-fps-value {\n                font-weight: bold;\n                color: var(--success-color);\n            }\n            \n            /* Clickable values styling */\n            .precision-clickable {\n                cursor: pointer;\n                padding: 4px 8px;\n                border-radius: 4px;\n                transition: all 0.2s;\n            }\n            \n            .precision-clickable:hover {\n                background: var(--hover-color);\n            }\n            \n            /* Collapsible sections */\n            .precision-section {\n                margin: 16px 0;\n                border-bottom: 1px solid var(--border-color);\n                padding-bottom: 16px;\n            }\n            \n            .precision-section-title {\n                font-size: 15px;\n                font-weight: 600;\n                margin-bottom: 12px;\n                color: var(--accent-color);\n            }\n            \n            /* Tooltip */\n            .precision-tooltip {\n                position: relative;\n                display: inline-block;\n            }\n            \n            .precision-tooltip .tooltip-text {\n                visibility: hidden;\n                width: 200px;\n                background-color: var(--bg-color);\n                color: var(--text-color);\n                text-align: center;\n                border-radius: 6px;\n                padding: 8px;\n                position: absolute;\n                z-index: 1;\n                bottom: 125%;\n                left: 50%;\n                margin-left: -100px;\n                opacity: 0;\n                transition: opacity 0.3s;\n                box-shadow: 0 2px 5px rgba(0,0,0,0.2);\n                border: 1px solid var(--border-color);\n                font-size: 12px;\n            }\n            \n            .precision-tooltip:hover .tooltip-text {\n                visibility: visible;\n                opacity: 1;\n            }\n            \n            /* Animation for RGB text */\n            @keyframes rainbow {\n                0% { background-position: 0% 50%; }\n                50% { background-position: 100% 50%; }\n                100% { background-position: 0% 50%; }\n            }\n            \n            .rainbow-text {\n                background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);\n                background-size: 200% auto;\n                color: transparent;\n                -webkit-background-clip: text;\n                background-clip: text;\n                animation: rainbow 3s linear infinite;\n            }\n            \n            /* Color display box */\n            .color-display {\n                width: 20px;\n                height: 20px;\n                border-radius: 4px;\n                margin-right: 8px;\n                border: 1px solid var(--border-color);\n            }\n            \n            .color-display-container {\n                display: flex;\n                align-items: center;\n            }\n        ";
    document.head.appendChild(_0x3c40f0);
    const _0x5d6986 = document.createElement("div");
    _0x5d6986.id = "precision-controls";
    _0x5d6986.className = _0x49e57d.interface.theme === "dark" ? "dark-theme" : "light-theme";
    _0x5d6986.innerHTML = "\n            <div class=\"precision-header\">\n                <h3 class=\"precision-title\">U$ER 🆘</h3>\n                <div class=\"precision-controls-right\">\n                    <button id=\"precision-theme-toggle\" class=\"precision-icon-button\" title=\"" + (_0x49e57d.interface.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode") + "\">\n                        " + (_0x49e57d.interface.theme === "dark" ? "☀️" : "🌙") + "\n                    </button>\n                    <button id=\"precision-toggle-ui\" class=\"precision-icon-button\" title=\"Toggle UI [\\]\">\n                        ✖️\n                    </button>\n                </div>\n            </div>\n            \n            <div class=\"precision-status-container\">\n                <span>Status: </span>\n                <span id=\"precision-status\" style=\"color: " + (_0x49e57d.targetingEnabled ? "var(--success-color)" : "var(--error-color)") + "\">\n                    " + (_0x49e57d.targetingEnabled ? "ACTIVE" : "INACTIVE") + "\n                </span>\n            </div>\n            \n            <div class=\"precision-section\">\n                <div class=\"precision-section-title\">Main Controls</div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-targeting\">Aim Assist [B]:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-targeting\" class=\"precision-checkbox\" " + (_0x49e57d.targetingEnabled ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.targetingEnabled ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-visualization\">Esp Box [N]:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-visualization\" class=\"precision-checkbox\" " + (_0x49e57d.visualizationEnabled ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.visualizationEnabled ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-trajectories\">Esp Lines [M]:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-trajectories\" class=\"precision-checkbox\" " + (_0x49e57d.trajectoryLines ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.trajectoryLines ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-smooth\">Smooth Targeting [3]:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-smooth\" class=\"precision-checkbox\" " + (_0x49e57d.smoothTargeting ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.smoothTargeting ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"precision-section\">\n                <div class=\"precision-section-title\">Targeting Settings</div>\n                \n                <div class=\"precision-control\">\n                    <label>Targeting Mode [2]:</label>\n                    <span class=\"precision-value precision-clickable\" id=\"precision-mode-value\" title=\"Click to change\">\n                        " + (_0x49e57d.targetingMode === "crosshairProximity" ? "Crosshair" : "Distance") + "\n                    </span>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label>Vertical Adjustment:</label>\n                    <div class=\"precision-slider-container\">\n                        <input type=\"range\" id=\"precision-vertical\" class=\"precision-slider\" min=\"-50\" max=\"50\" step=\"0.25\" value=\"" + _0x49e57d.verticalAdjustment + "\">\n                        <span class=\"precision-value\" id=\"precision-vertical-value\">" + _0x49e57d.verticalAdjustment.toFixed(1) + "</span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label>Prediction:</label>\n                    <div class=\"precision-slider-container\">\n                        <input type=\"range\" id=\"precision-prediction\" class=\"precision-slider\" min=\"0\" max=\"1\" step=\"0.01\" value=\"" + _0x49e57d.predictionIntensity + "\">\n                        <span class=\"precision-value\" id=\"precision-prediction-value\">" + Math.round(_0x49e57d.predictionIntensity * 100) + "%</span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label>Accuracy:</label>\n                    <div class=\"precision-slider-container\">\n                        <input type=\"range\" id=\"precision-accuracy\" class=\"precision-slider\" min=\"0.01\" max=\"1\" step=\"0.01\" value=\"" + _0x49e57d.targetingPrecision / 100 + "\">\n                        <span class=\"precision-value\" id=\"precision-accuracy-value\">" + _0x49e57d.targetingPrecision + "%</span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label>Smoothing:</label>\n                    <div class=\"precision-slider-container\">\n                        <input type=\"range\" id=\"precision-smoothing\" class=\"precision-slider\" min=\"1\" max=\"100\" step=\"1\" value=\"" + _0x49e57d.smoothingFactor + "\">\n                        <span class=\"precision-value\" id=\"precision-smoothing-value\">" + _0x49e57d.smoothingFactor + "</span>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"precision-section\">\n                <div class=\"precision-section-title\">RGB Settings</div>\n                \n                <div class=\"precision-control\">\n                    <label>RGB Color:</label>\n                    <div class=\"color-display-container\">\n                        <div id=\"precision-color-display\" class=\"color-display\" style=\"background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); background-size: 200% auto; animation: rainbow 3s linear infinite;\"></div>\n                        <span class=\"precision-value rainbow-text\" id=\"precision-color-value\">\n                            RGB\n                        </span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label>Rainbow Speed [R]:</label>\n                    <div class=\"precision-slider-container\">\n                        <input type=\"range\" id=\"precision-rainbow-speed\" class=\"precision-slider\" min=\"0.1\" max=\"3\" step=\"0.1\" value=\"" + _0x49e57d.interface.rainbowSpeed + "\">\n                        <span class=\"precision-value\" id=\"precision-rainbow-speed-value\">" + _0x49e57d.interface.rainbowSpeed.toFixed(1) + "x</span>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"precision-section\">\n                <div class=\"precision-section-title\">Debug Options</div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-debug\">Debug Mode [D]:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-debug\" class=\"precision-checkbox\" " + (_0x49e57d.debug.enabled ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.debug.enabled ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n                \n                <div class=\"precision-control\">\n                    <label for=\"precision-fps\">Show FPS:</label>\n                    <div class=\"checkbox-container\">\n                        <input type=\"checkbox\" id=\"precision-fps\" class=\"precision-checkbox\" " + (_0x49e57d.debug.showFPS ? "checked" : "") + ">\n                        <span class=\"custom-checkbox " + (_0x49e57d.debug.showFPS ? "checked" : "") + "\"></span>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"precision-button-group\">\n                <button class=\"precision-button\" id=\"precision-reset\">Reset</button>\n                <button class=\"precision-button\" id=\"precision-toggle-theme\" style=\"background: " + (_0x49e57d.interface.theme === "dark" ? "#f8f9fa" : "#343a40") + "; color: " + (_0x49e57d.interface.theme === "dark" ? "#343a40" : "#f8f9fa") + ";\">\n                    " + (_0x49e57d.interface.theme === "dark" ? "Light Mode" : "Dark Mode") + " [T]\n                </button>\n            </div>\n            \n            <div style=\"text-align: center; margin-top: 12px; font-size: 12px; opacity: 0.7;\">\n                v1.6.2 • Press [\\] to toggle UI\n            </div>\n        ";
    document.body.appendChild(_0x5d6986);
    const _0x151486 = document.createElement("div");
    _0x151486.className = "precision-fps " + (_0x49e57d.interface.theme === "dark" ? "dark-theme" : "light-theme");
    _0x151486.innerHTML = "<span class=\"precision-fps-label\">FPS:</span> <span class=\"precision-fps-value\">0</span>";
    document.body.appendChild(_0x151486);
    const _0x19eff7 = () => {
      GM_setValue("krunkerEnhancerConfig", _0x49e57d);
      _0x6a669c();
    };
    document.getElementById("precision-targeting").addEventListener("change", _0x54e9be => {
      _0x49e57d.targetingEnabled = _0x54e9be.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-visualization").addEventListener("change", _0x1e9caf => {
      _0x49e57d.visualizationEnabled = _0x1e9caf.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-trajectories").addEventListener("change", _0x2b1422 => {
      _0x49e57d.trajectoryLines = _0x2b1422.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-smooth").addEventListener("change", _0x1589d1 => {
      _0x49e57d.smoothTargeting = _0x1589d1.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-debug").addEventListener("change", _0x481582 => {
      _0x49e57d.debug.enabled = _0x481582.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-fps").addEventListener("change", _0x23789e => {
      _0x49e57d.debug.showFPS = _0x23789e.target.checked;
      _0x19eff7();
    });
    document.getElementById("precision-vertical").addEventListener("input", _0x12035c => {
      _0x49e57d.verticalAdjustment = parseFloat(_0x12035c.target.value);
      _0x19eff7();
    });
    document.getElementById("precision-prediction").addEventListener("input", _0x856487 => {
      _0x49e57d.predictionIntensity = parseFloat(_0x856487.target.value);
      _0x19eff7();
    });
    document.getElementById("precision-accuracy").addEventListener("input", _0x20fc29 => {
      _0x49e57d.targetingPrecision = Math.round(parseFloat(_0x20fc29.target.value) * 100);
      _0x19eff7();
    });
    document.getElementById("precision-smoothing").addEventListener("input", _0x26131b => {
      _0x49e57d.smoothingFactor = parseInt(_0x26131b.target.value);
      _0x19eff7();
    });
    document.getElementById("precision-rainbow-speed").addEventListener("input", _0x577b86 => {
      _0x49e57d.interface.rainbowSpeed = parseFloat(_0x577b86.target.value);
      _0x19eff7();
    });
    document.getElementById("precision-reset").addEventListener("click", _0x5deab1);
    document.getElementById("precision-toggle-ui").addEventListener("click", _0x525259);
    document.getElementById("precision-theme-toggle").addEventListener("click", _0x3d1fac);
    document.getElementById("precision-toggle-theme").addEventListener("click", _0x3d1fac);
    document.getElementById("precision-mode-value").addEventListener("click", _0x572f71);
    _0x22c731 = performance.now();
    _0x2ecf32 = 0;
    _0x6a669c();
  }
  function _0x5ce2c9() {
    _0x1bac78.requestFrame.call(_0x1bac78.window, _0x5ce2c9);
    _0xe6f12f();
    _0x48debc();
    if (!_0x3e11a9 && !_0x37f518) {
      const _0x273f01 = _0x1bac78.querySelector.call(_0x1bac78.document, "#loadingBg");
      if (_0x273f01 && _0x273f01.style.display === "none") {
        _0x1bac78.log("Starting initialization sequence");
        _0x37f518 = _0x1bac78.setTimeout.call(_0x1bac78.window, () => {
          _0x1bac78.log("System injection complete");
          _0x1bac78.arrayProto.push = _0x1d9bb7;
        }, 2000);
      }
    }
    if (_0x3e11a9 === undefined || !_0x3e11a9.children) {
      return;
    }
    const _0x5d772e = [];
    let _0x432944;
    for (let _0x148139 = 0; _0x148139 < _0x3e11a9.children.length; _0x148139++) {
      const _0x28fb38 = _0x3e11a9.children[_0x148139];
      if (_0x28fb38.type === "Object3D") {
        try {
          if (_0x28fb38.children[0].children[0].type === "PerspectiveCamera") {
            _0x432944 = _0x28fb38;
          } else {
            _0x5d772e.push(_0x28fb38);
          }
        } catch (_0x177f10) {}
      } else if (_0x28fb38.material) {
        _0x28fb38.material.wireframe = false;
      }
    }
    if (!_0x432944) {
      if (_0x49e57d.debug.enabled) {
        _0x1bac78.log("Local player not detected, reinitializing...");
      }
      _0x1bac78.arrayProto.push = _0x1d9bb7;
      return;
    }
    let _0x280793 = 0;
    let _0x38a4ac;
    let _0x3002c9 = Infinity;
    _0x5668b2.matrix.copy(_0x432944.matrix).invert();
    const _0x28a44a = {};
    for (let _0x29d62b = 0; _0x29d62b < _0x5d772e.length; _0x29d62b++) {
      const _0x4c2c2f = _0x5d772e[_0x29d62b];
      _0x28a44a[_0x4c2c2f.id] = _0x4c2c2f.position.clone();
    }
    for (let _0x2ae1d8 = 0; _0x2ae1d8 < _0x5d772e.length; _0x2ae1d8++) {
      const _0x3c0cac = _0x5d772e[_0x2ae1d8];
      if (!_0x3c0cac.visualizationBox) {
        const _0x3d93be = new _0x3bb8fb.LineSegments(_0x39b1af, _0x1d979d);
        _0x3d93be.frustumCulled = false;
        _0x3c0cac.add(_0x3d93be);
        _0x3c0cac.visualizationBox = _0x3d93be;
      }
      if (_0x3c0cac.position.x === _0x432944.position.x && _0x3c0cac.position.z === _0x432944.position.z) {
        _0x3c0cac.visualizationBox.visible = false;
        if (_0x1da760.parent !== _0x3c0cac) {
          _0x3c0cac.add(_0x1da760);
        }
        continue;
      }
      _0x3efcd8.setXYZ(_0x280793++, 0, 10, -5);
      _0x35c6cb.copy(_0x3c0cac.position);
      _0x35c6cb.y += 9;
      _0x35c6cb.applyMatrix4(_0x5668b2.matrix);
      _0x3efcd8.setXYZ(_0x280793++, _0x35c6cb.x, _0x35c6cb.y, _0x35c6cb.z);
      _0x3c0cac.visible = _0x49e57d.visualizationEnabled || _0x3c0cac.visible;
      _0x3c0cac.visualizationBox.visible = _0x49e57d.visualizationEnabled;
      let _0x39100d = _0x3c0cac.position.clone();
      if (_0x1b0a00[_0x3c0cac.id]) {
        const _0x24b072 = new _0x3bb8fb.Vector3().subVectors(_0x28a44a[_0x3c0cac.id], _0x1b0a00[_0x3c0cac.id]);
        _0x39100d.add(_0x24b072.multiplyScalar(_0x49e57d.predictionIntensity));
      }
      if (_0x49e57d.targetingMode === "distanceProximity") {
        const _0x1a53b7 = _0x39100d.x - _0x432944.position.x;
        const _0x4b2b96 = _0x39100d.y - _0x432944.position.y;
        const _0x574ada = _0x39100d.z - _0x432944.position.z;
        const _0x48551a = Math.sqrt(_0x1a53b7 * _0x1a53b7 + _0x4b2b96 * _0x4b2b96 + _0x574ada * _0x574ada);
        if (_0x48551a < _0x3002c9 && !_0x2d68c4) {
          _0x38a4ac = _0x3c0cac;
          _0x3002c9 = _0x48551a;
        }
      } else if (_0x49e57d.targetingMode === "crosshairProximity") {
        _0x35c6cb.copy(_0x39100d);
        _0x35c6cb.y += _0x49e57d.verticalAdjustment;
        const _0xf331fb = _0x432944.children[0].children[0];
        _0x35c6cb.project(_0xf331fb);
        const _0x47dfc3 = _0x35c6cb.x;
        const _0x4bef4e = _0x35c6cb.y;
        const _0x5a1061 = Math.sqrt(_0x47dfc3 * _0x47dfc3 + _0x4bef4e * _0x4bef4e);
        const _0x562727 = new _0x3bb8fb.Vector3(0, 0, -1).applyQuaternion(_0x432944.quaternion);
        const _0x24461b = new _0x3bb8fb.Vector3().subVectors(_0x39100d, _0x432944.position).normalize();
        const _0x13c20c = Math.acos(_0x562727.dot(_0x24461b)) * (180 / Math.PI);
        if (_0x5a1061 < _0x3002c9 && !_0x2d68c4 && _0x13c20c < 90) {
          _0x38a4ac = _0x3c0cac;
          _0x3002c9 = _0x5a1061;
        }
      }
    }
    _0x1b0a00 = _0x28a44a;
    _0x3efcd8.needsUpdate = true;
    _0x1da760.geometry.setDrawRange(0, _0x280793);
    _0x1da760.visible = _0x49e57d.trajectoryLines;
    if (!_0x3901ca || !_0x49e57d.targetingEnabled) {
      return;
    }
    if (!_0x2d68c4) {
      _0xf882f = _0x38a4ac;
      _0x2d68c4 = true;
    }
    if (_0xf882f && !_0x3e11a9.children.includes(_0xf882f)) {
      _0x2d68c4 = false;
      _0xf882f = null;
      return;
    }
    if (_0xf882f === undefined) {
      return;
    }
    const _0x2fcaa5 = performance.now();
    const _0x40d662 = Math.min(50, _0x2fcaa5 - _0x525983) / 1000;
    _0x525983 = _0x2fcaa5;
    if (_0xf882f.children[0] && _0xf882f.children[0].children[0] && _0xf882f.children[0].children[0].type === "PerspectiveCamera") {
      const _0x2c2c37 = new _0x3bb8fb.Vector3();
      _0xf882f.children[0].children[0].getWorldPosition(_0x2c2c37);
      if (_0x1b0a00[_0xf882f.id]) {
        const _0x35790d = new _0x3bb8fb.Vector3().subVectors(_0x28a44a[_0xf882f.id], _0x1b0a00[_0xf882f.id]);
        _0x2c2c37.add(_0x35790d.multiplyScalar(_0x49e57d.predictionIntensity));
      }
      const _0x5963ec = new _0x3bb8fb.Vector3().subVectors(_0x2c2c37, _0x432944.position).normalize();
      if (_0x49e57d.targetingPrecision < 100) {
        const _0x2d5fff = (100 - _0x49e57d.targetingPrecision) / 1000;
        _0x5963ec.x += (Math.random() * 2 - 1) * _0x2d5fff;
        _0x5963ec.y += (Math.random() * 2 - 1) * _0x2d5fff;
        _0x5963ec.z += (Math.random() * 2 - 1) * _0x2d5fff;
        _0x5963ec.normalize();
      }
      const _0x9a91de = new _0x3bb8fb.Quaternion();
      _0x9a91de.setFromUnitVectors(new _0x3bb8fb.Vector3(0, 0, -1), _0x5963ec);
      if (_0x49e57d.smoothTargeting) {
        const _0xdaaf52 = _0x432944.quaternion.clone();
        const _0x48918c = Math.min(1, _0x40d662 * (_0x49e57d.smoothingFactor / 5));
        if (_0xdaaf52.dot(_0x9a91de) < 0) {
          _0x9a91de.negate();
        }
        _0x432944.quaternion.slerp(_0x9a91de, _0x48918c);
      } else {
        _0x432944.quaternion.copy(_0x9a91de);
      }
    } else {
      let _0x22b6af = _0xf882f.position.clone();
      if (_0x1b0a00[_0xf882f.id]) {
        const _0x68c907 = new _0x3bb8fb.Vector3().subVectors(_0x28a44a[_0xf882f.id], _0x1b0a00[_0xf882f.id]);
        _0x22b6af.add(_0x68c907.multiplyScalar(_0x49e57d.predictionIntensity));
      }
      _0x35c6cb.copy(_0x22b6af);
      _0x35c6cb.y += _0x49e57d.verticalAdjustment;
      _0x5668b2.position.copy(_0x432944.position);
      _0x5668b2.lookAt(_0x35c6cb);
      if (_0x49e57d.targetingPrecision < 100) {
        const _0x2eaa1a = (100 - _0x49e57d.targetingPrecision) / 1000;
        _0x5668b2.rotation.x += (Math.random() * 2 - 1) * _0x2eaa1a;
        _0x5668b2.rotation.y += (Math.random() * 2 - 1) * _0x2eaa1a;
      }
      if (_0x49e57d.smoothTargeting) {
        const _0x1559e0 = Math.min(1, _0x40d662 * (_0x49e57d.smoothingFactor / 5));
        const _0x23e2a5 = _0x432944.children[0].rotation.x;
        const _0x15e3d1 = -_0x5668b2.rotation.x;
        _0x432944.children[0].rotation.x = _0x23e2a5 + (_0x15e3d1 - _0x23e2a5) * _0x1559e0;
        const _0x2a60cb = _0x432944.rotation.y;
        const _0x28b4dd = _0x5668b2.rotation.y + Math.PI;
        let _0x356852 = _0x28b4dd - _0x2a60cb;
        if (_0x356852 > Math.PI) {
          _0x356852 -= Math.PI * 2;
        }
        if (_0x356852 < -Math.PI) {
          _0x356852 += Math.PI * 2;
        }
        _0x432944.rotation.y = _0x2a60cb + _0x356852 * _0x1559e0;
      } else {
        _0x432944.children[0].rotation.x = -_0x5668b2.rotation.x;
        _0x432944.rotation.y = _0x5668b2.rotation.y + Math.PI;
      }
    }
  }
  window.addEventListener("DOMContentLoaded", function () {
    _0x4e5514();
  });
  window.addEventListener("pointerdown", _0x574166);
  window.addEventListener("pointerup", _0x1af639);
  window.addEventListener("pointercancel", _0x1af639);
  window.addEventListener("mouseup", _0x1af639);
  window.addEventListener("blur", function () {
    _0x3901ca = false;
    _0x2d68c4 = false;
    _0xf882f = null;
  });
  window.addEventListener("contextmenu", function (_0x3104b1) {
    if (_0x3104b1.button === 2) {
      _0x3104b1.preventDefault();
    }
  });
  window.addEventListener("keydown", function (_0x5ac498) {
    if (_0x1bac78.document.activeElement && _0x1bac78.document.activeElement.value !== undefined) {
      return;
    }
    if (_0x5ac498.code === "BracketLeft") {
      _0x49e57d.verticalAdjustment = Math.max(-50, _0x49e57d.verticalAdjustment - 0.25);
      _0x6a669c();
      _0x24c91c();
    } else if (_0x5ac498.code === "BracketRight") {
      _0x49e57d.verticalAdjustment = Math.min(50, _0x49e57d.verticalAdjustment + 0.25);
      _0x6a669c();
      _0x24c91c();
    }
  });
  window.addEventListener("keyup", function (_0x3bc103) {
    if (_0x1bac78.document.activeElement && _0x1bac78.document.activeElement.value !== undefined) {
      return;
    }
    if (_0x5663b4[_0x3bc103.code]) {
      if (_0x3bc103.code === "Digit2") {
        _0x572f71();
      } else if (_0x3bc103.code === "Backslash") {
        _0x525259();
      } else if (_0x3bc103.code === "KeyR") {
        _0x47b1f0();
      } else if (_0x3bc103.code === "Digit3") {
        _0x5f6861("smoothTargeting");
      } else if (_0x3bc103.code === "KeyD") {
        _0x40c114();
      } else if (_0x3bc103.code === "KeyT") {
        _0x3d1fac();
      } else {
        _0x5f6861(_0x5663b4[_0x3bc103.code]);
      }
    }
  });
  _0x5ce2c9();
  _0x1bac78.log("Precision enhancement system initialized successfully");
  window.krunkerEnhancer = {
    config: _0x49e57d,
    toggleConfiguration: _0x5f6861,
    switchTargetingMode: _0x572f71,
    restoreDefaultConfiguration: _0x5deab1,
    toggleInterface: _0x525259,
    adjustRainbowSpeed: _0x47b1f0,
    toggleDebug: _0x40c114,
    toggleTheme: _0x3d1fac
  };
})();