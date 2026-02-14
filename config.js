// ============================================================
// SITE_CONFIG — Edit this file to customize your homepage.
// No HTML editing needed. Just update the values below.
// ============================================================

var SITE_CONFIG = {
    // ---- Personal Info ----
    name: "Hyomin Kim",
    firstName: "Hyomin",
    lastName: "Kim",
    title: "Ph.D. Student in AI",
    affiliation: "KAIST",
    affiliationUrl: "https://www.kaist.ac.kr",
    bio: `I'm a second-year PhD student at KAIST in
          <a href="https://sungsoo-ahn.github.io/sungsooahn0215">Structured and Probabilistic Machine Learning (SPML) Lab</a>,
          advised by <a href="https://sungsoo-ahn.github.io/sungsooahn0215">Sungsoo Ahn</a>.
          My main research areas include AI4Science, large language models (AI agent),
          geometric deep learning, generative models, and implicit neural representations.
          I'm highly interested in research fields that learn scientific &amp; continuous
          real-world problems and solve them via language models.<br><br>
          I'm always eager to connect with researchers in artificial intelligence.
          Feel free to reach out for discussions, collaborations, or just to share interesting ideas.`,
    profilePhoto: "assets/img/profile.jpeg",

    // ---- Social Links ----
    social: {
        email: "hyomin126@kaist.ac.kr",
        github: "https://github.com/icecream126",
        linkedin: "https://www.linkedin.com/in/hyomin-kim-27a004179/",
        googleScholar: "https://scholar.google.com/citations?user=ntYoi6EAAAAJ",
        twitter: "https://twitter.com/hyomin126",
        semanticScholar: "",
    },

    // ---- CV ----
    cvPath: "assets/cv/cv.pdf",

    // ---- News ----
    news: [
        {
            date: "Feb 2026",
            text: 'Two preprints on biological perturbation prediction released: <strong>"Progressive Multi-Agent Reasoning for Biological Perturbation Prediction"</strong> and <strong>"Learning Adaptive Perturbation-Conditioned Contexts for Robust Transcriptional Response Prediction"</strong>.',
        },
        {
            date: "Jan 2026",
            text: 'New preprint <strong>"DNAChunker: Learnable Tokenization for DNA Language Models"</strong> is now available on arXiv!',
        },
        {
            date: "Oct 2025",
            text: "Started research internship at <strong>HITS</strong>, working on LLMs for discovering mechanisms of action in cell perturbation.",
        },
        {
            date: "Sep 2025",
            text: 'Paper <strong>"MT-Mol: Multi Agent System with Tool-based Reasoning for Molecular Optimization"</strong> accepted at <strong>EMNLP 2025 Findings</strong>!',
        },
        {
            date: "Feb 2025",
            text: "Started Ph.D. at <strong>KAIST Kim Jaechul Graduate School of AI</strong>, advised by Sungsoo Ahn.",
        },
        {
            date: "May 2024",
            text: 'Paper <strong>"Hybrid Neural Representations for Spherical Data"</strong> accepted at <strong>ICML 2024</strong>!',
        },
    ],

    // ---- Publications ----
    publications: [
        {
            title: "Progressive Multi-Agent Reasoning for Biological Perturbation Prediction",
            authors: ["Hyomin Kim", "Sang-Yeon Hwang", "Jaechang Lim", "Yinhua Piao", "Yunhak Oh", "Woo Youn Kim", "Chanyoung Park", "Sungsoo Ahn", "Junhyeok Jeon"],
            highlightAuthor: "Hyomin Kim",
            venue: "Preprint",
            venueShort: "Preprint",
            year: 2026,
            type: "preprint",
            links: {
                pdf: "https://arxiv.org/abs/2602.07408",
                code: "https://github.com/icecream126/LINCSQA-PBIOAGENT/tree/main",
                project: "",
            },
            bibtex: `@article{kim2026progressive,
  title={Progressive Multi-Agent Reasoning for Biological Perturbation Prediction},
  author={Hyomin Kim and Sang-Yeon Hwang and Jaechang Lim and Yinhua Piao and Yunhak Oh and Woo Youn Kim and Chanyoung Park and Sungsoo Ahn and Junhyeok Jeon},
  journal={arXiv preprint arXiv:2602.07408},
  year={2026}
}`,
        },
        {
            title: "Learning Adaptive Perturbation-Conditioned Contexts for Robust Transcriptional Response Prediction",
            authors: ["Yinhua Piao", "Hyomin Kim", "Seonghwan Kim", "Yunhak Oh", "Junhyeok Jeon", "Sang-Yeon Hwang", "Jaechang Lim", "Woo Youn Kim", "Chanyoung Park", "Sungsoo Ahn"],
            highlightAuthor: "Hyomin Kim",
            venue: "Preprint",
            venueShort: "Preprint",
            year: 2026,
            type: "preprint",
            links: {
                pdf: "",
                code: "",
                project: "",
            },
            bibtex: `@article{piao2026learning,
  title={Learning Adaptive Perturbation-Conditioned Contexts for Robust Transcriptional Response Prediction},
  author={Yinhua Piao and Hyomin Kim and Seonghwan Kim and Yunhak Oh and Junhyeok Jeon and Sang-Yeon Hwang and Jaechang Lim and Woo Youn Kim and Chanyoung Park and Sungsoo Ahn},
  journal={arXiv preprint},
  year={2026}
}`,
        },
        {
            title: "DNAChunker: Learnable Tokenization for DNA Language Models",
            authors: ["Taewon Kim", "Jihwan Shin", "Hyomin Kim", "Youngmok Jung", "Jonghoon Lee", "Won-Chul Lee", "Insu Han", "Sungsoo Ahn"],
            highlightAuthor: "Hyomin Kim",
            venue: "Preprint",
            venueShort: "Preprint",
            year: 2026,
            type: "preprint",
            links: {
                pdf: "https://arxiv.org/pdf/2601.03019v1",
                code: "",
                project: "",
            },
            bibtex: `@article{kim2026dnachunker,
  title={DNAChunker: Learnable Tokenization for DNA Language Models},
  author={Taewon Kim and Jihwan Shin and Hyomin Kim and Youngmok Jung and Jonghoon Lee and Won-Chul Lee and Insu Han and Sungsoo Ahn},
  journal={arXiv preprint arXiv:2601.03019},
  year={2026}
}`,
        },
        {
            title: "MT-Mol: Multi Agent System with Tool-based Reasoning for Molecular Optimization",
            authors: ["Hyomin Kim", "Yunhui Jang", "Sungsoo Ahn"],
            highlightAuthor: "Hyomin Kim",
            venue: "EMNLP 2025 Findings",
            venueShort: "EMNLP",
            year: 2025,
            type: "conference",
            links: {
                pdf: "https://arxiv.org/abs/2505.20820",
                code: "https://github.com/icecream126/mt_mol",
                project: "",
            },
            bibtex: `@inproceedings{kim2025mtmol,
  title={MT-Mol: Multi Agent System with Tool-based Reasoning for Molecular Optimization},
  author={Hyomin Kim and Yunhui Jang and Sungsoo Ahn},
  booktitle={Findings of the Association for Computational Linguistics: EMNLP 2025},
  year={2025}
}`,
        },
        {
            title: "Hybrid Neural Representations for Spherical Data",
            authors: ["Hyomin Kim", "Yunhui Jang", "Jaeho Lee", "Sungsoo Ahn"],
            highlightAuthor: "Hyomin Kim",
            venue: "International Conference on Machine Learning (ICML) 2024",
            venueShort: "ICML",
            year: 2024,
            type: "conference",
            links: {
                pdf: "https://proceedings.mlr.press/v235/kim24i.html",
                code: "https://github.com/icecream126/HNeR-S/tree/main",
                project: "",
            },
            bibtex: `@inproceedings{kim2024hybrid,
  title={Hybrid Neural Representations for Spherical Data},
  author={Hyomin Kim and Yunhui Jang and Jaeho Lee and Sungsoo Ahn},
  booktitle={International Conference on Machine Learning},
  year={2024}
}`,
        },
        {
            title: "Riemannian Neural SDE: Learning Stochastic Representations on Manifolds",
            authors: ["Sungwoo Park", "Hyomin Kim", "Hyeseong Kim", "Junseok Kwon"],
            highlightAuthor: "Hyomin Kim",
            venue: "Neural Information Processing Systems (NeurIPS) 2022",
            venueShort: "NeurIPS",
            year: 2022,
            type: "conference",
            links: {
                pdf: "https://proceedings.neurips.cc/paper_files/paper/2022/file/098491b37deebbe6c007e69815729e09-Paper-Conference.pdf",
                code: "",
                project: "",
            },
            bibtex: `@inproceedings{park2022riemannian,
  title={Riemannian Neural SDE: Learning Stochastic Representations on Manifolds},
  author={Sungwoo Park and Hyomin Kim and Hyeseong Kim and Junseok Kwon},
  booktitle={Advances in Neural Information Processing Systems},
  year={2022}
}`,
        },
    ],

    // ---- Education ----
    education: [
        {
            degree: "Ph.D. in Artificial Intelligence",
            institution: "KAIST (Kim Jaechul Graduate School of AI)",
            period: "2025 — Present",
            description: "Advised by Prof. Sungsoo Ahn. Research: AI4Science, LLM agents, generative models.",
        },
        {
            degree: "M.S. in Artificial Intelligence",
            institution: "POSTECH",
            period: "2023 — 2025",
            description: "",
        },
        {
            degree: "B.S. in Computer Science & Engineering",
            institution: "Chung-Ang University",
            period: "2019 — 2023",
            description: "",
        },
    ],

    // ---- Experience ----
    experience: [
        {
            role: "Research Intern",
            organization: "HITS",
            period: "Oct 2025 — Present",
            description: "Working on LLMs for discovering mechanisms of action in cell perturbation.",
        },
    ],

    // ---- Site Meta ----
    siteTitle: "Hyomin Kim — AI Researcher",
    siteDescription: "Personal academic homepage of Hyomin Kim, Ph.D. student at KAIST working on AI4Science, LLM agents, and generative models.",
    siteUrl: "https://icecream126.github.io",

    // ---- Theme Defaults ----
    defaultTheme: "system", // "light", "dark", or "system"
    customColors: {
        primary: "#6366f1",
        background: "#ffffff",
        text: "#1e293b",
        accent: "#8b5cf6",
    },
};
