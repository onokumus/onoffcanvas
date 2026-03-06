# OnoffCanvas

[![Technical Prestige](https://img.shields.io/badge/Design-Technical%20Prestige-050505?style=flat-square)](#design-philosophy)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/onoffcanvas.svg?style=flat-square)](https://www.npmjs.com/package/onoffcanvas)
[![NPM Downloads](https://img.shields.io/npm/dt/onoffcanvas.svg?style=flat-square)](https://www.npmjs.com/package/onoffcanvas)

**OnoffCanvas** is a lightweight, accessible, and high-performance JavaScript offcanvas plugin designed with a "Technical Prestige" aesthetic. It utilizes modern CSS `clip-path` animations and glassmorphism to provide a premium user experience.

> [!WARNING]
> This plugin utilizes modern CSS features and does **not** support Internet Explorer.

---

## ✨ Features

- **🚀 Performance:** Powered by CSS `clip-path` for smooth, hardware-accelerated transitions.
- **🛡️ Accessibility:** Built-in ARIA support, keyboard navigation (`Esc` to close), and focus management.
- **💎 Premium Design:** Glassmorphic drawers with backdrop blur and a titanium-inspired palette.
- **📍 Multiple Positions:** Easily place panels at the `top`, `bottom`, `start` (left), `end` (right), or even `center`.
- **🖱️ Hover Support:** Optional hover-to-reveal functionality for effortless interaction.
- **📦 Zero Dependencies:** Lightweight footprint with no external library requirements.

---

## 📦 Installation

Install via your preferred package manager:

```bash
npm install onoffcanvas
# or
yarn add onoffcanvas
```

### Deno

OnoffCanvas is fully compatible with Deno. You can import it directly from JSR or via an ESM CDN:

```typescript
// From JSR
import OnoffCanvas from "jsr:@onokumus/onoffcanvas";

// Or from esm.sh
import OnoffCanvas from "https://esm.sh/onoffcanvas";
```

> [!NOTE]
> When using in Deno for frontend development, you will still need to include the CSS file in your HTML or via your bundler.

---

### Browser (CDN)

1. Include the StyleSheet:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/onoffcanvas/lib/onoffcanvas.css">
```

2. Include the plugin:
```html
<script src="https://cdn.jsdelivr.net/npm/onoffcanvas/lib/onoffcanvas.js"></script>
```

---

## 🚀 Quick Start

### 1. HTML Markup

Define your offcanvas panel and a trigger element.

```html
<div id="myCanvas" class="onoffcanvas is-start">
  <div class="p-8">
    <h1 class="tracking-widest font-light uppercase">Menu</h1>
    <p>Premium content goes here.</p>
  </div>
</div>
```

### 2. Trigger Options

You can trigger the offcanvas using a link or a button. Ensure you add `data-toggle="onoffcanvas"`.

- **Using a Link:**
```html
<a href="#myCanvas" data-toggle="onoffcanvas">Toggle Menu</a>
```

- **Using a Button:**
```html
<button data-target="#myCanvas" data-toggle="onoffcanvas">Toggle Menu</button>
```

### 3. Initialization

```javascript
import OnoffCanvas from 'onoffcanvas';
import 'onoffcanvas/style';

// Initialize all elements with data-toggle="onoffcanvas"
OnoffCanvas.autoinit();

// Or manual instance
const oc = new OnoffCanvas('#myCanvas', options);
```

---

## 🛠️ API Reference

### Methods

- `OnoffCanvas.autoinit(options?)`: Auto-initializes all `data-toggle="onoffcanvas"` elements.
- `OnoffCanvas.attachTo(element, options?)`: Returns a new instance.
- `show()`: Displays the panel.
- `hide()`: Hides the panel.
- `toggle()`: Toggles the state.
- `destroy()`: Cleans up listeners and removes instance.
- `on(event, handler)`: Event listener helper.

### Events

| Event Type | Description |
| :--- | :--- |
| `show.onoffcanvas` | Fires immediately when `show` is called. |
| `hide.onoffcanvas` | Fires immediately when `hide` is called. |

```javascript
const oc = new OnoffCanvas('#myCanvas');

oc.on('show.onoffcanvas', (event) => {
  console.log('Panel is showing', event.detail.instance);
});

oc.on('hide.onoffcanvas', (event) => {
  console.log('Panel is hiding', event.detail.element);
});
```

### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `createDrawer` | `boolean` | `true` | Whether to create a glassmorphic backdrop. |
| `hideByEsc` | `boolean` | `true` | Close the panel when the `Escape` key is pressed. |

---

## 🎨 Customization

OnoffCanvas is built with CSS Variables for effortless theming:

```css
:root {
  --oc-bg: #050505;
  --oc-color: #f5f5f7;
  --oc-width: 16rem;
  --oc-transition-duration: 0.5s;
  --oc-backdrop-blur: 12px;
  --oc-border-radius: 12px;
}
```

### Canvas Options

#### 1. Position Options
By default, the offcanvas is `absolute`ly positioned. Add `is-fixed` for fixed positioning.

```html
<div class="onoffcanvas is-fixed"></div>
```

#### 2. Direction Options
Control the reveal direction using these classes:
- `is-top`: Reveal from top.
- `is-bottom`: Reveal from bottom.
- `is-start`: Reveal from left (LTR).
- `is-end`: Reveal from right (LTR).
- `is-center`: Center expansion.

```html
<div class="onoffcanvas is-start" id="side-canvas"></div>
```

#### 3. Opened/Closed State
Add `is-open` to have the panel visible by default.

```html
<div class="onoffcanvas is-open" id="side-canvas"></div>
```

#### 4. Hoverable Support
To reveal the offcanvas on hover:
1. Wrap it in a `.onoffcanvas-container`.
2. Add `.is-hoverable` to the offcanvas element.

```html
<div class="onoffcanvas-container">
  <div class="onoffcanvas is-hoverable" id="side-canvas"></div>
</div>
```

---

## 👤 Author

**onokumus**
- [GitHub](https://github.com/onokumus)
- [Twitter](https://twitter.com/onokumus)
- [LinkedIn](https://linkedin.com/in/onokumus)

---

## 📜 License

Distributed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/onokumus">onokumus</a> for the Technical Prestige.
</p>
