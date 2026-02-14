/* ============================================================
   Animations — Scroll reveals, typing, particles, progress bar
   All respect prefers-reduced-motion.
   ============================================================ */

(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- Scroll Reveal via Intersection Observer ----------
    function initScrollReveal() {
        const reveals = document.querySelectorAll(".reveal");
        if (!reveals.length) return;

        if (prefersReducedMotion) {
            reveals.forEach((el) => el.classList.add("revealed"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        reveals.forEach((el) => observer.observe(el));
    }

    // ---------- Typing Animation ----------
    function initTypingAnimation() {
        const nameSpan = document.querySelector(".name-text");
        const cursor = document.querySelector(".typing-cursor");
        if (!nameSpan) return;

        const C = window.SITE_CONFIG;
        const fullName = (C && C.name) || "Your Name";

        if (prefersReducedMotion) {
            nameSpan.textContent = fullName;
            if (cursor) cursor.style.display = "none";
            return;
        }

        let i = 0;
        const speed = 80;

        function type() {
            if (i < fullName.length) {
                nameSpan.textContent += fullName.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after a delay
                setTimeout(() => {
                    if (cursor) cursor.style.opacity = "0";
                    setTimeout(() => {
                        if (cursor) cursor.style.display = "none";
                    }, 500);
                }, 2000);
            }
        }

        // Start after a brief delay
        setTimeout(type, 500);
    }

    // ---------- Particle Canvas Background ----------
    function initParticles() {
        const canvas = document.getElementById("particle-canvas");
        if (!canvas || prefersReducedMotion) return;

        const ctx = canvas.getContext("2d");
        let particles = [];
        let animId;
        const COUNT = 50;
        const CONNECT_DIST = 120;

        function resize() {
            const hero = document.getElementById("hero");
            if (!hero) return;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 1,
            };
        }

        function initParticleArray() {
            particles = [];
            for (let i = 0; i < COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function getParticleColor() {
            const style = getComputedStyle(document.documentElement);
            const rgb = style.getPropertyValue("--color-primary-rgb").trim();
            return rgb || "99, 102, 241";
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const rgb = getParticleColor();

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const alpha = (1 - dist / CONNECT_DIST) * 0.15;
                        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                ctx.fillStyle = `rgba(${rgb}, 0.3)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
            });

            animId = requestAnimationFrame(draw);
        }

        resize();
        initParticleArray();
        draw();

        window.addEventListener("resize", () => {
            resize();
            initParticleArray();
        });

        // Pause when not visible
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(animId);
            } else {
                draw();
            }
        });
    }

    // ---------- Scroll Progress Bar ----------
    function initScrollProgress() {
        const bar = document.getElementById("scroll-progress");
        if (!bar) return;

        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = percent + "%";
        }

        window.addEventListener("scroll", update, { passive: true });
        update();
    }

    // ---------- Scroll to Top Button ----------
    function initScrollToTop() {
        const btn = document.getElementById("scroll-top");
        if (!btn) return;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        }, { passive: true });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
    }

    // ---------- Init ----------
    function init() {
        initScrollReveal();
        initTypingAnimation();
        initParticles();
        initScrollProgress();
        initScrollToTop();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
