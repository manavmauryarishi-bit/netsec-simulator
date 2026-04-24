/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "inverse-primary": "#565e74",
        "outline-variant": "#45464d",
        "on-primary": "#283044",
        "surface-variant": "#353436",
        "on-tertiary": "#3e2d11",
        "surface-dim": "#131315",
        "on-background": "#e4e2e4",
        "primary-fixed": "#dae2fd",
        "secondary-fixed-dim": "#bcc7de",
        "primary-container": "#0f172a",
        "surface-container": "#1f1f21",
        "error": "#ffb4ab",
        "secondary": "#bcc7de",
        "surface-tint": "#bec6e0",
        "on-tertiary-container": "#957d5a",
        "on-tertiary-fixed": "#271901",
        "on-error": "#690005",
        "inverse-surface": "#e4e2e4",
        "surface-container-highest": "#353436",
        "on-surface-variant": "#c6c6cd",
        "surface-container-high": "#2a2a2b",
        "surface": "#131315",
        "on-primary-container": "#798098",
        "primary": "#bec6e0",
        "inverse-on-surface": "#303032",
        "on-secondary": "#263143",
        "tertiary-fixed": "#fcdeb5",
        "surface-container-low": "#1b1b1d",
        "tertiary-container": "#231500",
        "tertiary": "#dec29a",
        "on-error-container": "#ffdad6",
        "on-primary-fixed-variant": "#3f465c",
        "secondary-fixed": "#d8e3fb",
        "background": "#131315",
        "surface-bright": "#39393b",
        "error-container": "#93000a",
        "secondary-container": "#3e495d",
        "surface-container-lowest": "#0e0e10",
        "on-surface": "#e4e2e4",
        "on-secondary-fixed-variant": "#3c475a",
        "primary-fixed-dim": "#bec6e0",
        "tertiary-fixed-dim": "#dec29a",
        "on-primary-fixed": "#131b2e",
        "on-secondary-container": "#aeb9d0",
        "outline": "#909097",
        "on-secondary-fixed": "#111c2d",
        "on-tertiary-fixed-variant": "#574425"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "md": "16px",
        "grid-columns": "12",
        "grid-gutter": "20px",
        "xl": "40px",
        "xs": "4px",
        "sm": "8px",
        "unit": "4px",
        "lg": "24px"
      },
      "fontFamily": {
        "body-base": ["Inter", "sans-serif"],
        "data-mono": ["Space Grotesk", "monospace"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-xl": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-caps": ["Space Grotesk", "monospace"]
      },
      "fontSize": {
        "body-base": ["16px", { "lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400" }],
        "data-mono": ["14px", { "lineHeight": "1.5", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-md": ["20px", { "lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-xl": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-sm": ["14px", { "lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700" }]
      }
    }
  },
  plugins: [],
}
