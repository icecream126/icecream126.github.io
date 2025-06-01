---
layout: single
author_profile: true
permalink: /blog/
---

# AI810 Blog Post (20255126)
In this blog post, I reviewed the following two papers:
1. [Complete and Efficient Graph Transformers for Crystal Material Property Prediction](https://openreview.net/forum?id=BnQY9XiRAS)
2. [Structure Language Models for Protein Conformation Generation](https://openreview.net/forum?id=OzUNDnpQyd)

## [Review 1] Complete and Efficient Graph Transformers for Crystal Material Property Prediction
**Outline**

- [About this paper](#about-this-paper)
    - [Motivation](#motivation)
    - [Method](#method)
    - [Experiments](#experiments)
- [Review](#review)
    - [Strengths](#strengths)
    - [Weaknesses](#weaknesses)
    - [Comments](#comments)

### <a id="about-this-paper"></a>About this paper
In this article, I am going to review a paper : [Complete and Efficient Graph Transformers for Crystal Material Property Prediction](https://openreview.net/forum?id=BnQY9XiRAS).
#### <a id="motivation"></a>Motivation
Crystal structures are fundamentally different from molecules. They are periodic, infinite in space, and can exhibit chirality. These properties pose several challenges when applying geometric deep learning methods.

##### Why current methods fall short
Most crystal graph models approximate a crystal as a finite set of atoms within a single unit cell, and consider only local neighbors within a cutoff radius. However, this leads to two key problems:

1. Geometric Incompleteness
Models like CGCNN, Matformer, and others often treat different crystal structures as identical if they share local neighborhoods, even if their global structures differ. This can result in predicting the same properties for crystals that are actually very different.

2. Failure to Handle Symmetries
Crystal structures have multiple symmetries:
    * Translation (shifting the unit cell)

    * Rotation (global orientation)

    * Periodic transformations (different valid lattice representations)
    Existing models often violate these symmetries, leading to poor generalization or inconsistent predictions.

##### The goal
The authors aim to design crystal representations and neural networks that are:

* Geometrically complete (can distinguish any two different crystals)

* Symmetry-aware (respect crystal-specific invariances)

* Scalable and efficient (practical for large-scale datasets)


#### <a id="Method: Geometrically Complete Crystal Graphs and ComFormer"></a>Method
The core idea is to construct crystal graphs that are provably complete and symmetry-aware, and then feed them into a transformer architecture designed for this structure.

##### 1. Preliminaries
###### What is a crystal structure?
A crystal structure is defined by:

* Atom types: Feature matrix  $A=[a_1,\ldots,a_n]\in\mathbb{R}^{d_a\times n}$

* 3D positions: $P = [p_1, \ldots, p_n] \in \mathbb{R}^{3 \times n}$

* Lattice matrix: $L = [\ell_1, \ell_2, \ell_3] \in \mathbb{R}^{3 \times 3}$

The full crystal extends infinitely via lattice translations:
* Positions: $\hat{P} = { p_i + k_1 \ell_1 + k_2 \ell_2 + k_3 \ell_3 \mid k_1, k_2, k_3 \in \mathbb{Z}, 1 \le i \le n }$

* Features: $\hat{A} = { a_i \mid 1 \le i \le n }$

The learning task is to predict a property $y$ (either regression or classification) from $(A, P, L)$.


###### What is geometric completeness?
A crystal graph is geometrically complete if two crystals that have different atomic arrangements always yield different graph representations. In other words, a crystal graph $G$ is geometrically complete if $G_1=G_2\rightarrow M_1\cong M_2$, where $\cong$ denotes that two crystals are isometric.

This means no two distinct crystals (including chiral forms) can map to the same graph.

###### What symmetries must be preserved?
SE(3) Invariance: Invariant to rotation and translation of the entire unit cell (e.g., absolute orientation). Function $f(A, P, L)$ must satisfy:
$$f(A, P, L) = f(A, RP + b, RL).$$

SO(3) Equivariance: Vector features should rotate consistently under global rotation. For vector-valued outputs $f(A, P, L) \in \mathbb{R}^3$:
$$
f(A, RP + b, RL) = R f(A, P, L).
$$

Periodic Invariance: Representations must be invariant to the choice of valid unit cell. If two unit cell descriptions $(A, P, L)$ and $(A', P', L')$ represent the same crystal, then:
$$
f(A, P, L) = f(A', P', L').
$$

These ensure consistent representation across different crystal encodings.

##### 2. Proposed Graph Representations
The authors propose two types of crystal graphs that are provably geometrically complete.

###### A. SE(3)-Invariant Crystal Graphs (for iComFormer)
Each node in the graph represents an atom and all its infinite periodic images.

**Edge Construction**
* Connect atom $i$ to a periodic duplicate $j'$ of atom $j$ if:
$| p_{j'} - p_i |_2 \le r$ for cutoff radius $r$

* Each edge feature contains:
$\left[ | p_{j'} - p_i |2, \theta{j'i,i1}, \theta_{j'i,i2}, \theta_{j'i,i3} \right]$

where $\theta_{j'i,i1}$ is the angle between the bond vector and the first periodic lattice vector at $i$, and so on.

**Lattice Basis Construction**
To define local periodic directions at each node:

* Choose three nearest periodic duplicates of atom $i$: $i_1$, $i_2$, $i_3$

* Ensure they form a right-handed orthogonal basis:
${ e_{ii1}, e_{ii2}, e_{ii3} }$

* Normalize and flip directions to maintain consistency and chirality awareness

This graph construction guarantees invariance to all crystal symmetries (SE(3) + periodic invariance), and can distinguish chiral crystals.

###### B. SO(3)-Equivariant Crystal Graphs (for eComFormer)
This variant replaces angles with vector-valued features.

* Edge feature: $e_{j'i} = p_{j'} - p_i \in \mathbb{R}^3$

* These vectors rotate appropriately under global transformations

This representation preserves SO(3) equivariance and geometric completeness.

##### 3. Network Architecture: ComFormer
The crystal graphs above are used as input to a novel transformer called ComFormer (Complete Graph Transformer for Crystals), which has two variants:

* **iComFormer**: Built on SE(3)-invariant graphs. It uses scalar-based features (distances and angles).

* **eComFormer**: Built on SO(3)-equivariant graphs. It uses vector features.

Each ComFormer layer updates atom-level embeddings using attention over neighbors, respecting the symmetry of the underlying graph. Both variants scale as $\mathcal{O}(nk)$, where $n$ is number of atoms and $k$ is average neighbors.

##### 4. Theoretical Guarantees
The authors prove that:

* Both graph constructions are geometrically complete

* The representations are symmetry-consistent (SE(3) or SO(3))

* The resulting graphs uniquely determine the infinite crystal

Proofs use mathematical induction and formal symmetry analysis.


#### <a id="experiments"></a>Experiments
##### Benchmarks
Evaluated on:

1. Materials Project (MP)

2. OQMD

3. MatBench

Tasks include predicting:

* Band gap

* Formation energy

* Elastic moduli

* Classification of crystal types

##### Metrics
* Regression: Mean Absolute Error (MAE)

* Classification: Accuracy or F1 score

##### Key Findings
* ComFormer variants achieve state-of-the-art on all benchmarks.

* iComFormer excels at scalar property prediction (e.g., energy).

* eComFormer performs better when directionality matters (e.g., elasticity).

* Prior methods like CGCNN, SchNet, Matformer, and PotNet are outperformed.
##### Conclusion

This work provides a breakthrough in representing crystal structures for deep learning. It achieves:

Geometric completeness: every crystal is uniquely represented

Symmetry awareness: invariance/equivariance under SE(3), SO(3), and periodicity

Efficiency and scalability: linear time complexity

State-of-the-art performance: across multiple datasets

ComFormer sets a new standard for crystal property prediction and opens new doors for accelerated materials discovery.




### <a id="review"></a>Review
#### <a id="strengths"></a>Strengths
##### 1. Clear and important motivation 
The paper tackles a fundamental and unresolved challenge in materials informatics: how to represent crystal structures completely and accurately for machine learning models. The authors clearly articulate the limitations of existing methods and explain why capturing periodicity, chirality, and symmetry is essential. This positions the work as both timely and impactful.

##### 2. Theoretical soundness
One of the major contributions of the paper is the proof of geometric completeness. The proposed representations ensure that no two distinct crystal structures are mapped to the same graph, which is a non-trivial and highly valuable property. The authors also prove that their models are symmetry-consistent, accounting for SE(3) invariance, SO(3) equivariance, and periodic invariance.

##### 3. Novel and well-justified graph construction
The crystal graph constructions are highly original. The SE(3)-invariant variant uses carefully selected periodic duplicates to construct a consistent lattice representation. The SO(3)-equivariant variant encodes vector-based features, supporting directional reasoning. These choices are well motivated and technically justified.

##### 4. Practical performance
Despite the theoretical focus, the proposed ComFormer models achieve state-of-the-art results on multiple crystal property prediction tasks. This includes regression and classification benchmarks from well-known datasets like Materials Project and MatBench. The experiments are thorough and use appropriate metrics.

##### 5. Scalability
Both iComFormer and eComFormer scale linearly with the number of atoms and neighbors in a unit cell. This is a practical advantage over other methods that become computationally intensive on large crystals.


#### <a id="weaknesses"></a>Weaknesses
##### 1. Limited discussion of architectural details
While the graph representations are described in detail, the ComFormer network architecture itself is underexplained. It is not clear how many layers are used, what type of attention is applied, and whether the network borrows directly from standard graph transformers or introduces novel layers. This limits the reproducibility and interpretability of the model design.

##### 2. Lack of comparison to recent geometric deep learning models
The baselines used are mostly from earlier works (e.g., CGCNN, SchNet, Matformer). The paper would be strengthened by including comparisons to recent equivariant models such as NequIP, E(3)NN, or TorchMD-NET, which are also capable of processing periodic structures with high accuracy.

##### 3. Minimal analysis on model generalization
Although the method is designed to be robust under symmetry transformations and different cell sizes, the authors do not present specific generalization experiments. For example, how well does ComFormer perform on unseen crystal classes, chiral structures, or crystals with varying degrees of disorder?

##### 4. Limited ablation study
The paper lacks an ablation analysis of the graph construction process. It would be informative to know how much performance drops if, for example, angles are removed from the SE(3)-invariant variant or vector features are simplified in the SO(3)-equivariant variant.

#### <a id="comments"></a>Comments
This is an excellent and well-rounded paper that combines theoretical rigor with practical impact. The authors address a long-standing gap in the field of crystal representation learning by introducing crystal graphs that are both geometrically complete and symmetry-consistent. These advances are backed by formal proofs and real-world benchmarks.

The main contribution lies not just in proposing a better transformer architecture, but in redefining how crystal structures should be represented for machine learning tasks. The introduction of ComFormer is thoughtful and the performance results are strong.

However, the paper could benefit from more architectural transparency, stronger comparative baselines, and further empirical validation of generalization and robustness. These limitations are relatively minor and do not detract from the significance of the work.

---

## [Review 2] Structure Language Models for Protein Conformation Generation
**Outline**

- [About this paper](#about-this-paper-2)
    - [Motivation](#motivation-2)
    - [Method](#method-2)
    - [Experiments](#experiments-2)
- [Review](#review-2)
    - [Strengths](#strength-2)
    - [Weaknesses](#weaknesses-2)
    - [Comments](#comments-2)

### <a id="about-this-paper-2"></a>About this paper
#### <a id="motivation-2"></a>Motivation
Understanding how proteins fold into their three-dimensional structure is important for many applications in biology and drug discovery. Traditional models for generating protein structures often rely on autoregressive decoding or diffusion-based sampling. These approaches are slow and computationally expensive. They also make it difficult to interpret or control the structure generation process.

Most existing methods directly predict atomic positions in space. However, these Cartesian coordinates do not reflect the natural structure of proteins. In real proteins, the backbone geometry is mostly determined by a small number of rotation angles, called torsion angles.

This paper introduces a new approach to protein structure generation. The key idea is to treat the generation of protein structures as a language modeling problem. Instead of predicting atomic coordinates, the model predicts torsion angles that define the protein’s backbone. This is done using a non-autoregressive structure language model.

#### <a id="method-2"></a>Method
##### Representing Protein Structures
Proteins are represented using their torsion angles, specifically the backbone angles known as phi, psi, and omega. These angles control the relative orientation of atoms in the protein chain. By using only torsion angles, the model reduces the problem to predicting a short sequence of interpretable values for each residue.

Each residue in a protein is represented by a triplet of torsion angles:

* $\phi$ (phi)

* $\psi$ (psi)

* $\omega$ (omega)

These three angles are sufficient to define the backbone structure of a protein when combined with known bond lengths and bond angles.

Discretizing the Angles
To make torsion angle prediction compatible with language modeling, the continuous torsion angle space is discretized. The authors cluster real torsion angle triplets into $K$ groups using k-means clustering. Each cluster center becomes a token.

Given a real torsion triplet $t$, it is mapped to the closest cluster center using the equation:

$$
\text{token}(t)=\text{argmin}_k \lvert\lvert t-c_k\rvert\rvert _2
$$
where $c_k$ is the $k$-th cluster center.

This converts the structure generation problem into a sequence generation task over a finite vocabulary.

##### Model Architecture and Objective
The model is based on a transformer encoder-decoder architecture. The encoder takes the protein sequence and optional structural context as input. The decoder predicts a sequence of torsion tokens in parallel.

The training objective is based on masked language modeling. A random subset of torsion angle tokens is masked, and the model is trained to predict them using the unmasked context. Let $x$ be the input context and $y = (y_1, \ldots, y_n)$ be the true torsion tokens. Let $M$ be the set of masked positions. The loss function is:
$$
\mathcal{L}_{\text{MLM}}=-\sum_{i\in M}\log p(y_i|x,y_{[n]\\ M})
$$
This allows the model to learn dependencies between different parts of the protein structure while supporting efficient parallel inference.

##### Non-Autoregressive Generation
Traditional sequence models generate tokens one at a time. This is slow and limits parallelism. The structure language model uses a non-autoregressive formulation. It assumes that all torsion angle tokens can be generated independently given the input sequence:
$$
p(y)=\prod_{i=1}^n p(y_i|x)
$$
This allows the model to generate full structures in a single step, making it much faster than autoregressive or diffusion-based approaches.

##### Structure Reconstruction
Once the torsion tokens are predicted, they are mapped back to real torsion angles using the cluster centers. Then, the full 3D structure of the protein backbone is reconstructed using these angles and fixed bond geometry. This is done using geometric rules without any learned parameters.

#### <a id="experiments-2"></a>Experiments
The model is evaluated on several datasets including ProteinNet and CATH. It is tested on two main tasks: structure recovery and structure generation.

In the structure recovery task, the model is given a partial structure and asked to complete the missing torsion angles. In the generation task, the model predicts the full structure from the protein sequence.

The quality of predicted structures is evaluated using the root mean square deviation (RMSD) between predicted and true atomic positions. The RMSD is computed as follows:
$$
RMSD=\sqrt{\frac{1}{n}\sum_{i=1}^n\lvert\lvert \hat{x}_i-x_i\rvert\rvert_2^2}
$$
The model also reports accuracy in predicting the correct torsion token and measures whether the reconstructed backbone is chemically valid and continuous.

The results show that the structure language model outperforms autoregressive baselines in both speed and accuracy. It also matches or exceeds diffusion models while requiring far less computation. The generated structures are physically realistic and maintain proper backbone continuity.
### <a id="review-2"></a>Review
#### <a id="strength-2"></a>Strength
##### 1. Well-motivated structural formulation
The paper presents a clear and compelling motivation for moving away from Cartesian coordinate prediction to torsion angle modeling. Representing protein structures using torsion angles is both biologically meaningful and geometrically sound. This formulation also enables efficient and compact modeling of protein backbones.

##### 2. Efficient nonautoregressive architecture
The proposed model uses a nonautoregressive transformer architecture that allows for fast and parallel structure generation. This is a major improvement over existing autoregressive and diffusion-based models, which require multiple sequential steps and high computational cost.

##### 3. Interpretability through tokenization
By clustering torsion angles and using discrete tokens, the model provides a human-interpretable and editable structure representation. This design allows users to understand, intervene in, or refine specific parts of the protein structure, which is difficult in models that operate directly on atomic coordinates.

##### 4. Clear structure reconstruction pipeline
The authors use a well-defined and deterministic reconstruction procedure to convert torsion predictions into 3D coordinates. This maintains chemical validity and ensures that the outputs conform to known protein geometry.

##### 5. Strong empirical results
The model shows strong performance across both structure recovery and generation tasks. It performs better than autoregressive baselines and achieves comparable results to diffusion models while using less computation. The quality of the generated structures is high in terms of RMSD and backbone continuity.


#### <a id="weaknesses-2"></a>Weaknesses
##### 1. Limited comparison to recent geometric models
The evaluation does not include direct comparisons with other structure-aware geometric deep learning models, such as equivariant graph networks or neural fields. This makes it hard to assess how the proposed method performs in comparison to the latest generation of geometric models.

##### 2. Lack of diversity analysis
Although the model supports efficient generation, the paper does not discuss the diversity of generated conformations. In practice, multiple conformations can be valid for a single protein sequence, and a generative model should ideally reflect this variability.

##### 3. Dependence on discretization quality
The accuracy of structure generation depends on the quality of the torsion token discretization. The paper does not provide a sensitivity analysis for the number of clusters or the effect of imperfect clustering on final structure quality.

##### 4. Limited handling of side chains
The focus of the model is on the backbone structure. While this is a reasonable simplification, full protein modeling often requires accurate prediction of side chains. The paper does not address how the model might be extended or integrated with existing tools for complete atomic structure generation.


#### <a id="comments-2"></a>Comments
This paper introduces a novel and well-designed approach to protein structure generation. It makes an important contribution by treating torsion angle prediction as a language modeling task, enabling fast and interpretable structure generation. The use of nonautoregressive transformers and masked language modeling results in an efficient and scalable architecture.

The method is biologically grounded, computationally practical, and shows promising empirical performance. While the paper could benefit from broader comparisons and further diversity analysis, these limitations do not detract from its core contributions.

The structure language model presents a useful new direction in protein modeling and has strong potential for future work in protein design, structure refinement, and generative biology.

