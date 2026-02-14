/* ============================================================
   Render — Dynamic DOM generation from SITE_CONFIG
   ============================================================ */

(function () {
    "use strict";

    const C = window.SITE_CONFIG;
    if (!C) {
        console.error("SITE_CONFIG not found. Make sure config.js is loaded before render.js.");
        return;
    }

    // ---------- Helpers ----------
    function el(tag, attrs, ...children) {
        const node = document.createElement(tag);
        if (attrs) {
            Object.entries(attrs).forEach(([k, v]) => {
                if (k === "className") node.className = v;
                else if (k === "innerHTML") node.innerHTML = v;
                else if (k.startsWith("data")) node.setAttribute(k.replace(/([A-Z])/g, "-$1").toLowerCase(), v);
                else node.setAttribute(k, v);
            });
        }
        children.forEach((c) => {
            if (typeof c === "string") node.appendChild(document.createTextNode(c));
            else if (c) node.appendChild(c);
        });
        return node;
    }

    // ---------- Update Meta ----------
    function renderMeta() {
        document.title = C.siteTitle || `${C.name} — ${C.title}`;
        const setMeta = (sel, val) => {
            const m = document.querySelector(sel);
            if (m && val) m.setAttribute("content", val);
        };
        setMeta('meta[name="description"]', C.siteDescription);
        setMeta('meta[name="author"]', C.name);
        setMeta('meta[property="og:title"]', C.siteTitle);
        setMeta('meta[property="og:description"]', C.siteDescription);
        setMeta('meta[property="og:url"]', C.siteUrl);
        setMeta('meta[property="og:image"]', C.profilePhoto ? `${C.siteUrl}/${C.profilePhoto}` : "");
    }

    // ---------- Nav Logo ----------
    function renderNavLogo() {
        const logo = document.querySelector(".nav-logo");
        if (logo) logo.textContent = C.firstName || C.name.split(" ")[0];
    }

    // ---------- Hero ----------
    function renderHero() {
        const heroText = document.getElementById("hero-text");
        const heroPhoto = document.getElementById("hero-photo");
        if (!heroText || !heroPhoto) return;

        // Text side
        heroText.innerHTML = "";
        heroText.appendChild(el("p", { className: "hero-greeting" }, "Hello, I'm"));
        const nameEl = el("h1", { className: "hero-name", id: "typed-name" });
        nameEl.innerHTML = `<span class="name-text"></span><span class="typing-cursor"></span>`;
        heroText.appendChild(nameEl);
        heroText.appendChild(el("p", { className: "hero-title" }, C.title));

        const affLink = el("p", { className: "hero-affiliation" });
        if (C.affiliationUrl) {
            affLink.innerHTML = `<a href="${C.affiliationUrl}">${C.affiliation}</a>`;
        } else {
            affLink.textContent = C.affiliation;
        }
        heroText.appendChild(affLink);

        // Social links
        const socialRow = el("div", { className: "hero-social" });
        const socialItems = buildSocialLinks();
        socialItems.forEach((a) => socialRow.appendChild(a));
        heroText.appendChild(socialRow);

        // Photo side
        heroPhoto.innerHTML = "";
        const wrapper = el("div", { className: "profile-photo-wrapper" });
        const img = el("img", {
            src: C.profilePhoto,
            alt: `Photo of ${C.name}`,
            loading: "lazy",
        });
        wrapper.appendChild(img);
        heroPhoto.appendChild(wrapper);
    }

    // ---------- Social Links builder ----------
    function buildSocialLinks() {
        const links = [];
        const s = C.social || {};

        if (s.email) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: `mailto:${s.email}`,
                    "aria-label": "Email",
                    title: "Email",
                }, el("i", { className: "fas fa-envelope" }))
            );
        }
        if (s.github) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: s.github,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "GitHub",
                    title: "GitHub",
                }, el("i", { className: "fab fa-github" }))
            );
        }
        if (s.linkedin) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: s.linkedin,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "LinkedIn",
                    title: "LinkedIn",
                }, el("i", { className: "fab fa-linkedin-in" }))
            );
        }
        if (s.googleScholar) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: s.googleScholar,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Google Scholar",
                    title: "Google Scholar",
                }, el("i", { className: "ai ai-google-scholar" }))
            );
        }
        if (s.twitter) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: s.twitter,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Twitter",
                    title: "Twitter",
                }, el("i", { className: "fab fa-twitter" }))
            );
        }
        if (s.semanticScholar) {
            links.push(
                el("a", {
                    className: "social-link",
                    href: s.semanticScholar,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Semantic Scholar",
                    title: "Semantic Scholar",
                }, el("i", { className: "ai ai-semantic-scholar" }))
            );
        }
        return links;
    }

    // ---------- About ----------
    function renderAbout() {
        const container = document.getElementById("about-content");
        if (!container || !C.bio) return;
        container.innerHTML = `<p class="reveal">${C.bio}</p>`;
    }

    // ---------- News ----------
    function renderNews() {
        const timeline = document.getElementById("news-timeline");
        if (!timeline || !C.news) return;
        timeline.innerHTML = "";

        C.news.forEach((item) => {
            const entry = el("div", { className: "timeline-item reveal" });
            entry.appendChild(el("span", { className: "timeline-date" }, item.date));
            const text = el("p", { className: "timeline-text" });
            text.innerHTML = item.text;
            entry.appendChild(text);
            timeline.appendChild(entry);
        });
    }

    // ---------- Publications ----------
    function renderPublications() {
        const list = document.getElementById("pub-list");
        if (!list || !C.publications) return;
        list.innerHTML = "";

        C.publications.forEach((pub, idx) => {
            const card = el("div", {
                className: "pub-card reveal",
                "data-type": pub.type,
                "data-year": String(pub.year),
            });

            // Header: badge + title
            const header = el("div", { className: "pub-card-header" });
            header.appendChild(
                el("span", { className: `pub-venue-badge ${pub.type}` }, pub.venueShort)
            );
            header.appendChild(el("span", { className: "pub-title" }, pub.title));
            card.appendChild(header);

            // Authors
            const authorsP = el("p", { className: "pub-authors" });
            authorsP.innerHTML = pub.authors
                .map((a) =>
                    a === pub.highlightAuthor
                        ? `<span class="highlight">${a}</span>`
                        : a
                )
                .join(", ");
            card.appendChild(authorsP);

            // Venue
            card.appendChild(
                el("p", { className: "pub-venue" }, `${pub.venue}, ${pub.year}`)
            );

            // Links
            const linksDiv = el("div", { className: "pub-links" });
            if (pub.links) {
                if (pub.links.pdf) {
                    linksDiv.appendChild(
                        el("a", {
                            className: "pub-link-btn",
                            href: pub.links.pdf,
                            target: "_blank",
                            rel: "noopener noreferrer",
                        },
                            el("i", { className: "fas fa-file-pdf" }),
                            "PDF"
                        )
                    );
                }
                if (pub.links.code) {
                    linksDiv.appendChild(
                        el("a", {
                            className: "pub-link-btn",
                            href: pub.links.code,
                            target: "_blank",
                            rel: "noopener noreferrer",
                        },
                            el("i", { className: "fab fa-github" }),
                            "Code"
                        )
                    );
                }
                if (pub.links.project) {
                    linksDiv.appendChild(
                        el("a", {
                            className: "pub-link-btn",
                            href: pub.links.project,
                            target: "_blank",
                            rel: "noopener noreferrer",
                        },
                            el("i", { className: "fas fa-globe" }),
                            "Project"
                        )
                    );
                }
            }

            // BibTeX toggle button
            if (pub.bibtex) {
                const bibtexBtn = el("button", {
                    className: "pub-link-btn bibtex-toggle-btn",
                    "data-index": String(idx),
                    "aria-expanded": "false",
                });
                bibtexBtn.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
                linksDiv.appendChild(bibtexBtn);
            }
            card.appendChild(linksDiv);

            // BibTeX content
            if (pub.bibtex) {
                const bw = el("div", { className: "bibtex-wrapper" });
                const bc = el("div", {
                    className: "bibtex-content",
                    id: `bibtex-${idx}`,
                });
                const pre = el("pre");
                pre.textContent = pub.bibtex;
                bc.appendChild(pre);
                const copyBtn = el("button", {
                    className: "bibtex-copy-btn",
                    "data-bibtex": pub.bibtex,
                    "aria-label": "Copy BibTeX",
                    title: "Copy BibTeX",
                });
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                bc.appendChild(copyBtn);
                bw.appendChild(bc);
                card.appendChild(bw);
            }

            list.appendChild(card);
        });
    }

    // ---------- CV ----------
    function renderCV() {
        const container = document.getElementById("cv-content");
        if (!container) return;
        container.innerHTML = "";

        // Download button
        if (C.cvPath) {
            const dlDiv = el("div", { className: "cv-download reveal" });
            const dlBtn = el("a", {
                className: "btn btn-primary",
                href: C.cvPath,
                target: "_blank",
                rel: "noopener noreferrer",
            });
            dlBtn.innerHTML = '<i class="fas fa-download"></i> Download CV (PDF)';
            dlDiv.appendChild(dlBtn);
            container.appendChild(dlDiv);
        }

        // Education
        if (C.education && C.education.length) {
            const section = el("div", { className: "cv-subsection reveal" });
            const title = el("h3", { className: "cv-subsection-title" });
            title.innerHTML = '<i class="fas fa-graduation-cap"></i> Education';
            section.appendChild(title);

            C.education.forEach((e) => {
                const entry = el("div", { className: "cv-entry" });
                const main = el("div", { className: "cv-entry-main" });
                main.appendChild(el("div", { className: "cv-entry-role" }, e.degree));
                main.appendChild(el("div", { className: "cv-entry-org" }, e.institution));
                if (e.description) {
                    main.appendChild(el("div", { className: "cv-entry-desc" }, e.description));
                }
                entry.appendChild(main);
                entry.appendChild(el("div", { className: "cv-entry-period" }, e.period));
                section.appendChild(entry);
            });
            container.appendChild(section);
        }

        // Experience
        if (C.experience && C.experience.length) {
            const section = el("div", { className: "cv-subsection reveal" });
            const title = el("h3", { className: "cv-subsection-title" });
            title.innerHTML = '<i class="fas fa-briefcase"></i> Experience';
            section.appendChild(title);

            C.experience.forEach((e) => {
                const entry = el("div", { className: "cv-entry" });
                const main = el("div", { className: "cv-entry-main" });
                main.appendChild(el("div", { className: "cv-entry-role" }, e.role));
                main.appendChild(el("div", { className: "cv-entry-org" }, e.organization));
                if (e.description) {
                    main.appendChild(el("div", { className: "cv-entry-desc" }, e.description));
                }
                entry.appendChild(main);
                entry.appendChild(el("div", { className: "cv-entry-period" }, e.period));
                section.appendChild(entry);
            });
            container.appendChild(section);
        }
    }

    // ---------- Footer ----------
    function renderFooter() {
        const container = document.getElementById("footer-content");
        if (!container) return;
        container.innerHTML = "";

        const inner = el("div", { className: "footer-inner" });

        // Social row
        const socialRow = el("div", { className: "footer-social" });
        buildSocialLinks().forEach((a) => socialRow.appendChild(a));
        inner.appendChild(socialRow);

        // Copyright
        const year = new Date().getFullYear();
        const copy = el("p", { className: "footer-text" });
        copy.innerHTML = `&copy; ${year} ${C.name}. All rights reserved.`;
        inner.appendChild(copy);

        // Fork link
        const fork = el("p", { className: "footer-text" });
        fork.innerHTML = `<a href="https://github.com/icecream126/icecream126.github.io" target="_blank" rel="noopener noreferrer"><i class="fas fa-code-branch"></i> Fork this template</a>`;
        inner.appendChild(fork);

        container.appendChild(inner);
    }

    // ---------- Init ----------
    function init() {
        renderMeta();
        renderNavLogo();
        renderHero();
        renderAbout();
        renderNews();
        renderPublications();
        renderFooter();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
