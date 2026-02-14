/* ============================================================
   Theme — Light / Dark / Custom switching + localStorage
   ============================================================ */

(function () {
    "use strict";

    const STORAGE_KEY = "site-theme";
    const CUSTOM_COLORS_KEY = "site-custom-colors";
    const root = document.documentElement;

    const C = window.SITE_CONFIG;
    const defaults = (C && C.customColors) || {
        primary: "#6366f1",
        background: "#ffffff",
        text: "#1e293b",
        accent: "#8b5cf6",
    };

    // ---------- Helpers ----------
    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
        const n = parseInt(hex, 16);
        return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    }

    function lighten(hex, amt) {
        hex = hex.replace("#", "");
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = Math.min(255, r + amt);
        g = Math.min(255, g + amt);
        b = Math.min(255, b + amt);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function darken(hex, amt) {
        return lighten(hex, -amt);
    }

    function mixWithWhite(hex, ratio) {
        hex = hex.replace("#", "");
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = Math.round(r + (255 - r) * ratio);
        g = Math.round(g + (255 - g) * ratio);
        b = Math.round(b + (255 - b) * ratio);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function isLightColor(hex) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 128;
    }

    // ---------- Apply custom colors to CSS variables ----------
    function applyCustomColors(colors) {
        const s = root.style;
        const light = isLightColor(colors.background);

        s.setProperty("--custom-primary", colors.primary);
        s.setProperty("--custom-primary-rgb", hexToRgb(colors.primary));
        s.setProperty("--custom-primary-light", lighten(colors.primary, 30));
        s.setProperty("--custom-primary-dark", darken(colors.primary, 30));

        s.setProperty("--custom-accent", colors.accent);
        s.setProperty("--custom-accent-rgb", hexToRgb(colors.accent));

        s.setProperty("--custom-bg", colors.background);
        s.setProperty("--custom-bg-rgb", hexToRgb(colors.background));
        s.setProperty("--custom-bg-secondary", light ? darken(colors.background, 8) : lighten(colors.background, 12));
        s.setProperty("--custom-bg-tertiary", light ? darken(colors.background, 16) : lighten(colors.background, 24));

        s.setProperty("--custom-text", colors.text);
        s.setProperty("--custom-text-rgb", hexToRgb(colors.text));
        s.setProperty("--custom-text-secondary", light ? lighten(colors.text, 60) : darken(colors.text, 60));
        s.setProperty("--custom-text-muted", light ? lighten(colors.text, 120) : darken(colors.text, 120));

        s.setProperty("--custom-border", light ? darken(colors.background, 24) : lighten(colors.background, 40));
        s.setProperty("--custom-border-light", light ? darken(colors.background, 12) : lighten(colors.background, 20));
    }

    // ---------- Set theme ----------
    function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        const icon = btn.querySelector("i");
        if (!icon) return;

        const isDark =
            theme === "dark" ||
            (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

        icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }

    // ---------- Init on load ----------
    function init() {
        // Restore theme
        const saved = localStorage.getItem(STORAGE_KEY);
        const defaultTheme = (C && C.defaultTheme) || "system";
        const theme = saved || defaultTheme;
        setTheme(theme);

        // Restore custom colors
        const savedColors = localStorage.getItem(CUSTOM_COLORS_KEY);
        if (savedColors) {
            try {
                const colors = JSON.parse(savedColors);
                applyCustomColors(colors);
                // Update color inputs
                updateColorInputs(colors);
            } catch (e) { /* ignore */ }
        } else {
            applyCustomColors(defaults);
        }

        // Theme toggle (light <-> dark)
        const toggleBtn = document.getElementById("theme-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                const current = root.getAttribute("data-theme");
                let next;
                if (current === "dark") next = "light";
                else if (current === "light") next = "dark";
                else if (current === "custom") next = "light";
                else {
                    // system — detect current and flip
                    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    next = sysDark ? "light" : "dark";
                }
                setTheme(next);
            });
        }

        // Palette toggle — open/close custom panel
        const paletteBtn = document.getElementById("palette-toggle");
        const panel = document.getElementById("theme-panel");
        const panelClose = document.getElementById("theme-panel-close");

        if (paletteBtn && panel) {
            paletteBtn.addEventListener("click", () => {
                const isOpen = !panel.hidden;
                panel.hidden = isOpen;
            });
        }
        if (panelClose && panel) {
            panelClose.addEventListener("click", () => {
                panel.hidden = true;
            });
        }

        // Close panel on outside click
        document.addEventListener("click", (e) => {
            if (panel && !panel.hidden) {
                if (!panel.contains(e.target) && e.target !== paletteBtn && !paletteBtn.contains(e.target)) {
                    panel.hidden = true;
                }
            }
        });

        // Apply custom theme button
        const applyBtn = document.getElementById("apply-custom-theme");
        if (applyBtn) {
            applyBtn.addEventListener("click", () => {
                const colors = readColorInputs();
                applyCustomColors(colors);
                localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(colors));
                setTheme("custom");
            });
        }

        // Live preview on color input change
        ["color-primary", "color-background", "color-text", "color-accent"].forEach((id) => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("input", () => {
                    const colors = readColorInputs();
                    applyCustomColors(colors);
                    // If already custom, update live
                    if (root.getAttribute("data-theme") === "custom") {
                        localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(colors));
                    }
                });
            }
        });

        // Reset custom theme
        const resetBtn = document.getElementById("reset-custom-theme");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                localStorage.removeItem(CUSTOM_COLORS_KEY);
                applyCustomColors(defaults);
                updateColorInputs(defaults);
                setTheme("light");
            });
        }

        // System preference change listener
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            const current = root.getAttribute("data-theme");
            if (current === "system") updateToggleIcon("system");
        });
    }

    function readColorInputs() {
        return {
            primary: document.getElementById("color-primary")?.value || defaults.primary,
            background: document.getElementById("color-background")?.value || defaults.background,
            text: document.getElementById("color-text")?.value || defaults.text,
            accent: document.getElementById("color-accent")?.value || defaults.accent,
        };
    }

    function updateColorInputs(colors) {
        const ids = { primary: "color-primary", background: "color-background", text: "color-text", accent: "color-accent" };
        Object.entries(ids).forEach(([key, id]) => {
            const input = document.getElementById(id);
            if (input && colors[key]) input.value = colors[key];
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
