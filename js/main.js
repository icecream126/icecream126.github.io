/* ============================================================
   Main — Navigation, publication filter/search, BibTeX copy
   ============================================================ */

(function () {
    "use strict";

    // ---------- Active Section Highlighting ----------
    function initActiveNav() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-links a");

        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        navLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${id}`
                            );
                        });
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "-80px 0px -50% 0px",
            }
        );

        sections.forEach((s) => observer.observe(s));
    }

    // ---------- Hamburger Menu ----------
    function initHamburger() {
        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("nav-links");
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener("click", () => {
            const isOpen = hamburger.classList.toggle("open");
            navLinks.classList.toggle("open");
            hamburger.setAttribute("aria-expanded", isOpen);
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        // Close on link click
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });

        // Close on escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }
        });
    }

    // ---------- Publication Filter ----------
    function initPubFilter() {
        const pills = document.querySelectorAll(".filter-pill");
        const cards = document.querySelectorAll(".pub-card");
        const noResults = document.getElementById("pub-no-results");
        const searchInput = document.getElementById("pub-search");

        let activeFilter = "all";

        function applyFilters() {
            const query = (searchInput?.value || "").toLowerCase().trim();
            let visible = 0;

            cards.forEach((card) => {
                const type = card.dataset.type;
                const text = card.textContent.toLowerCase();

                const matchesFilter = activeFilter === "all" || type === activeFilter;
                const matchesSearch = !query || text.includes(query);

                if (matchesFilter && matchesSearch) {
                    card.hidden = false;
                    visible++;
                } else {
                    card.hidden = true;
                }
            });

            if (noResults) {
                noResults.hidden = visible > 0;
            }
        }

        // Filter pills
        pills.forEach((pill) => {
            pill.addEventListener("click", () => {
                pills.forEach((p) => p.classList.remove("active"));
                pill.classList.add("active");
                activeFilter = pill.dataset.filter;
                applyFilters();
            });
        });

        // Search input
        if (searchInput) {
            searchInput.addEventListener("input", applyFilters);
        }
    }

    // ---------- BibTeX Toggle & Copy ----------
    function initBibtex() {
        // Toggle
        document.addEventListener("click", (e) => {
            const toggleBtn = e.target.closest(".bibtex-toggle-btn");
            if (toggleBtn) {
                const idx = toggleBtn.dataset.index;
                const content = document.getElementById(`bibtex-${idx}`);
                if (content) {
                    const isOpen = content.classList.toggle("open");
                    toggleBtn.setAttribute("aria-expanded", isOpen);
                }
            }
        });

        // Copy
        document.addEventListener("click", (e) => {
            const copyBtn = e.target.closest(".bibtex-copy-btn");
            if (copyBtn) {
                const bibtex = copyBtn.dataset.bibtex;
                if (!bibtex) return;

                navigator.clipboard.writeText(bibtex).then(() => {
                    copyBtn.classList.add("copied");
                    const icon = copyBtn.querySelector("i");
                    if (icon) {
                        icon.className = "fas fa-check";
                        setTimeout(() => {
                            icon.className = "fas fa-copy";
                            copyBtn.classList.remove("copied");
                        }, 2000);
                    }
                }).catch(() => {
                    // Fallback
                    const ta = document.createElement("textarea");
                    ta.value = bibtex;
                    ta.style.position = "fixed";
                    ta.style.opacity = "0";
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand("copy");
                    document.body.removeChild(ta);

                    copyBtn.classList.add("copied");
                    const icon = copyBtn.querySelector("i");
                    if (icon) {
                        icon.className = "fas fa-check";
                        setTimeout(() => {
                            icon.className = "fas fa-copy";
                            copyBtn.classList.remove("copied");
                        }, 2000);
                    }
                });
            }
        });
    }

    // ---------- Smooth scroll for nav links ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                const href = anchor.getAttribute("href");
                if (href === "#") return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                            ? "auto"
                            : "smooth",
                    });
                }
            });
        });
    }

    // ---------- Init ----------
    function init() {
        initActiveNav();
        initHamburger();
        initPubFilter();
        initBibtex();
        initSmoothScroll();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
