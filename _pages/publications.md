---
layout: single
author_profile: true
permalink: /publications/
---

#### [MT-Mol:Multi Agent System with Tool-based Reasoning for Molecular Optimization](https://arxiv.org/abs/2505.20820)
<U>Hyomin Kim</U>, Yunhui Jang, Sungsoo Ahn  
**arXiv preprint**

Large language models (LLMs) have large potential for molecular optimization, as they can gather external chemistry tools and enable collaborative interactions to iteratively refine molecular candidates. However, this potential remains underexplored, particularly in the context of structured reasoning, interpretability, and comprehensive tool-grounded molecular optimization. To address this gap, we introduce MT-Mol, a multi-agent framework for molecular optimization that leverages tool-guided reasoning and role-specialized LLM agents. Our system incorporates comprehensive RDKit tools, categorized into five distinct domains: structural descriptors, electronic and topological features, fragment-based functional groups, molecular representations, and miscellaneous chemical properties. Each category is managed by an expert analyst agent, responsible for extracting task-relevant tools and enabling interpretable, chemically grounded feedback. MT-Mol produces molecules with tool-aligned and stepwise reasoning through the interaction between the analyst agents, a molecule-generating scientist, a reasoning-output verifier, and a reviewer agent. As a result, we show that our framework shows the state-of-the-art performance of the PMO-1K benchmark on 17 out of 23 tasks.


#### [Hybrid Neural Representations for Spherical Data](https://arxiv.org/abs/2402.05965)
<U>Hyomin Kim</U>, Yunhui Jang, Jaeho Lee, Sungsoo Ahn  
**ICML 2024**

In this paper, we study hybrid neural representations for spherical data, a domain of increasing relevance in scientific research. In particular, our work focuses on weather and climate data as well as comic microwave background (CMB) data. Although previous studies have delved into coordinate-based neural representations for spherical signals, they often fail to capture the intricate details of highly nonlinear signals. To address this limitation, we introduce a novel approach named Hybrid Neural Representations for Spherical data (HNeR-S). Our main idea is to use spherical feature-grids to obtain positional features which are combined with a multilayer perception to predict the target signal. We consider feature-grids with equirectangular and hierarchical equal area isolatitude pixelization structures that align with weather data and CMB data, respectively. We extensively verify the effectiveness of our HNeR-S for regression, super-resolution, temporal interpolation, and compression tasks.



#### [Riemannian Neural SDE: Learning Stochastic Representations on Manifolds](https://proceedings.neurips.cc/paper_files/paper/2022/hash/098491b37deebbe6c007e69815729e09-Abstract-Conference.html)
Sungwoo Park, <U>Hyomin Kim</U>, Hyeseong Kim, Junseok Kwon  
**ICLRW, NeurIPS 2022**

In recent years, the neural stochastic differential equation (NSDE) has gained attention for modeling stochastic representations with great success in various types of applications. However, it typically loses expressivity when the data representation is manifold-valued. To address this issue, we suggest a principled method for expressing the stochastic representation with the Riemannian neural SDE (RNSDE), which extends the conventional Euclidean NSDE. Empirical results for various tasks demonstrate that the proposed method significantly outperforms baseline methods.