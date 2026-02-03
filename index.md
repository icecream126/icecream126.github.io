---
layout: single
author_profile: true
---

<style>
  /* [폰트 설정] 구글 폰트 적용 */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');

  body, button, input, select, textarea, .author__name, .author__urls, .news-container, .pub-row, .page__content {
    font-family: 'Noto Sans KR', sans-serif !important;
  }

  /* 모든 섹션 구분 실선(hr) 제거 */
  hr, .page__content hr {
    display: none !important;
  }

  /* 1. 프로필 이미지: 확대 및 테두리 제거 */
  .author__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible !important;
    border: none !important;
    box-shadow: none !important;
    width: 100% !important;
  }

  .author__avatar img {
    width: 90% !important;
    max-width: none !important;
    height: auto !important;
    object-fit: cover !important;
    border-radius: 0 !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }

  /* 2. 프로필 텍스트 정보 확대 */
  .author__content .author__name {
    font-size: 1.5rem !important;
    margin-top: 18px !important;
    margin-bottom: 25px !important; /* 이름과 이메일 사이의 여백 추가 */
  }

  .author__urls-wrapper .author__urls {
    font-size: 1.3rem !important;
  }

  .author__urls-wrapper button { display: none !important; }

  .author__urls li { margin-bottom: 12px !important; }

  .author__urls li a { color: white !important; }

  .author__urls li i {
    font-size: 1.3rem !important;
    margin-right: 12px;
  }

  /* 3. News 섹션 스타일 */
  .news-container {
    margin-top: 20px;
    margin-bottom: 40px;
    color: white !important;
  }

  .news-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding: 10px 0;
    border: none !important; 
  }

  .news-date {
    min-width: 160px;
    font-weight: bold;
    font-size: 1.0rem;
    color: #ffff;
  }

  .news-content {
    flex: 1;
    font-size: 1.0rem;
    line-height: 1.4;
  }

  /* 4. Publications 섹션 스타일 */
  .pub-row { display: flex; align-items: flex-start; margin-bottom: 30px; }
  .pub-labels { min-width: 100px; margin-right: 20px; display: flex; flex-direction: column; gap: 5px; }
  .pub-label { padding: 4px 8px; border-radius: 4px; color: white !important; font-weight: bold; font-size: 13px; text-align: center; text-transform: uppercase; }
  .label-preprint { background-color: #5bc0de; }
  .label-neurips { background-color: #5bc0de; }
  .label-emnlp { background-color: #5bc0de; }
  .label-spotlight { background-color: #f0ad4e; }
  .label-poster { background-color: #1a8cf7; }
  
  .pub-content { flex: 1; color: white !important; }
  .pub-title { font-size: 1.15rem; font-weight: bold; margin-bottom: 5px; color: white !important; display: block; text-decoration: none; }
  .pub-authors { margin-bottom: 8px; font-size: 15px; color: white !important; opacity: 0.9; }
  .pub-venue { font-style: italic; color: white !important; opacity: 0.8; margin-bottom: 10px; }
  
  .pub-links { display: flex; gap: 10px; margin-top: 10px; }
  .pub-link-btn { 
    padding: 5px 15px; border: 1px solid white; border-radius: 4px; 
    color: white !important; text-decoration: none !important; 
    font-size: 12px; font-weight: bold; text-transform: uppercase;
  }
  .pub-link-btn:hover { background-color: rgba(255, 255, 255, 0.2); }
</style>

## 👋 About Me
I'm a first-year PhD student at KAIST in [Structured and Probabilistic Machine Learning (SPML) Lab](https://sites.google.com/view/sungsooahn0215), advised by Sungsoo Ahn. My main research areas include AI4Science, large language models (AI agent), geometric deep learning, generative models, and implicit neural representations. I'm highly interested in the research fields which learns the scientific & continuous real world problems and solve the problem via language models.

I'm always eager to connect with researchers in the fields of artificial intelligence. Feel free to reach out for discussions, collaborations, or just to share interesting ideas.

## 📰 News

<div class="news-container">
  <div class="news-item">
    <div class="news-date">Feb 03, 2026</div>
    <div class="news-content">🦠 Two preprints on biological perturbation prediction released: <b>"Progressive Multi-Agent Reasoning for Biological Perturbation Prediction"</b> and <b>"Learning Adaptive Perturbation-Conditioned Contexts for Robust Transcriptional Response Prediction"</b>.</div>
  </div>
  
  <div class="news-item">
    <div class="news-date">Jan 2026</div>
    <div class="news-content">🧬 New preprint <b>"DNAChunker: Learnable Tokenization for DNA Language Models"</b> is now available on arXiv!</div>
  </div>

  <div class="news-item">
    <div class="news-date">Oct 2025</div>
    <div class="news-content">🔬 Started research internship at <b>HITS</b>, working on LLMs for discovering mechanisms of action in cell perturbation.</div>
  </div>
  
  <div class="news-item">
    <div class="news-date">Sep 2025</div>
    <div class="news-content">🎉 Paper <b>"MT-Mol: Multi Agent System with Tool-based Reasoning for Molecular Optimization"</b> accepted at <b>EMNLP 2025 Findings</b>!</div>
  </div>

  <div class="news-item">
    <div class="news-date">May 2024</div>
    <div class="news-content">🌐 Paper <b>"Hybrid Neural Representations for Spherical Data"</b> accepted at <b>ICML 2024</b>!</div>
  </div>

  <div class="news-item">
    <div class="news-date">Feb 2025</div>
    <div class="news-content">🎓 Started Ph.D. at <b>KAIST Kim Jaechul Graduate School of AI</b>, advised by Prof. Sungsoo Ahn.</div>
  </div>
</div>

## 📚 Publications

<div class="pub-row">
  <div class="pub-labels">
    <div class="pub-label label-preprint">PREPRINT</div>
  </div>
  <div class="pub-content">
    <a href="#" class="pub-title">Progressive Multi-Agent Reasoning for Biological Perturbation Prediction</a>
    <div class="pub-authors"><u>Hyomin Kim</u>, Sang-Yeon Hwang, Jaechang Lim, Yinhua Piao, Yunhak Oh, Woo Youn Kim, Chanyoung Park, Sungsoo Ahn, Junhyeok Jeon</div>
    <div class="pub-venue">Preprint</div>
    <div class="pub-links">
      <!-- <a href="https://arxiv.org/pdf/2601.03019v1" class="pub-link-btn">PDF</a> -->
      <!-- <a href="https://github.com/icecream126/mt_mol/tree/main" class="pub-link-btn">Code</a> -->
    </div>
  </div>
</div>

<div class="pub-row">
  <div class="pub-labels">
    <div class="pub-label label-preprint">PREPRINT</div>
  </div>
  <div class="pub-content">
    <a href="#" class="pub-title">Learning Adaptive Perturbation-Conditioned Contexts for Robust Transcriptional Response Prediction</a>
    <div class="pub-authors">Yinhua Piao, <u>Hyomin Kim</u>, Seonghwan Kim, Yunhak Oh, Junhyeok Jeon, Sang-Yeon Hwang, Jaechang Lim, Woo Youn Kim, Chanyoung Park, Sungsoo Ahn</div>
    <div class="pub-venue">Preprint</div>
    <div class="pub-links">
      <!-- <a href="https://arxiv.org/pdf/2601.03019v1" class="pub-link-btn">PDF</a> -->
      <!-- <a href="https://github.com/icecream126/mt_mol/tree/main" class="pub-link-btn">Code</a> -->
    </div>
  </div>
</div>

<div class="pub-row">
  <div class="pub-labels">
    <div class="pub-label label-preprint">PREPRINT</div>
  </div>
  <div class="pub-content">
    <a href="https://arxiv.org/abs/2601.03019v1" class="pub-title">DNACHUNKER: Learnable Tokenization for DNA Language Models</a>
    <div class="pub-authors">Taewon Kim, Jihwan Shin, <u>Hyomin Kim</u>, Youngmok Jung, Jonghoon Lee, Won-Chul Lee, Insu Han, Sungsoo Ahn</div>
    <div class="pub-venue">Preprint</div>
    <div class="pub-links">
      <a href="https://arxiv.org/pdf/2601.03019v1" class="pub-link-btn">PDF</a>
      <!-- <a href="https://github.com/icecream126/mt_mol/tree/main" class="pub-link-btn">Code</a> -->
    </div>
  </div>
</div>

<div class="pub-row">
  <div class="pub-labels">
    <div class="pub-label label-emnlp">EMNLP</div>
    <div class="pub-label label-poster">Poster</div>
  </div>
  <div class="pub-content">
    <a href="https://arxiv.org/abs/2505.20820" class="pub-title">MT-Mol: Multi Agent System with Tool-based Reasoning for Molecular Optimization</a>
    <div class="pub-authors"><u>Hyomin Kim</u>, Yunhui Jang, Sungsoo Ahn</div>
    <div class="pub-venue">EMNLP 2025 Findings</div>
    <div class="pub-links">
      <a href="https://arxiv.org/abs/2505.20820" class="pub-link-btn">PDF</a>
      <a href="https://github.com/icecream126" class="pub-link-btn">Code</a>
    </div>
  </div>
</div>


<div class="pub-row">
  <div class="pub-labels">
    <div class="pub-label label-neurips">NeurIPS</div>
    <div class="pub-label label-poster">Poster</div>
  </div>
  <div class="pub-content">
    <a href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/098491b37deebbe6c007e69815729e09-Abstract-Conference.html" class="pub-title">Riemannian Neural SDE: Learning Stochastic Representations on Manifolds</a>
    <div class="pub-authors">Sungwoo Park, <u>Hyomin Kim</u>, Hyeseong Kim, Junseok Kwon</div>
    <div class="pub-venue">Neural Information Processing Systems (NeurIPS) 2022</div>
    <div class="pub-links">
      <a href="https://proceedings.neurips.cc/paper_files/paper/2022/file/098491b37deebbe6c007e69815729e09-Paper-Conference.pdf" class="pub-link-btn">PDF</a>
      <!-- <a href="#" class="pub-link-btn">Code</a> -->
      <!-- <a href="#" class="pub-link-btn">Slides</a> -->
    </div>
  </div>
</div>