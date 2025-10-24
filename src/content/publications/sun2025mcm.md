---
number: 149
title: 'MCM: Multi-layer Concept Map for Efficient Concept Learning from Masked Images'
authors: Sun, Y., Mi, L., Fujisawa, I., & Kanai, R.
year: 2025
venue: ICLR Workshop on Deep Generative Model in Machine Learning
doi: https://doi.org/10.48550/arXiv.2502.00266
url: https://arxiv.org/abs/2502.00266
type: Paper
language: en
scholar: true
abstract: Masking strategies commonly employed in natural language processing are
  still underexplored in vision tasks such as concept learning, where conventional
  methods typically rely on full images. However, using masked images diversifies
  perceptual inputs, potentially offering significant advantages in concept learning
  with large-scale Transformer models. To this end, we propose Multi-layer Concept
  Map (MCM), the first work to devise an efficient concept learning method based on
  masked images. In particular, we introduce an asymmetric concept learning architecture
  by establishing correlations between different encoder and decoder layers, updating
  concept tokens using backward gradients from reconstruction tasks. The learned concept
  tokens at various levels of granularity help either reconstruct the masked image
  patches by filling in gaps or guide the reconstruction results in a direction that
  reflects specific concepts. Moreover, we present both quantitative and qualitative
  results across a wide range of metrics, demonstrating that MCM significantly reduces
  computational costs by training on fewer than 75% of the total image patches while
  enhancing concept prediction performance. Additionally, editing specific concept
  tokens in the latent space enables targeted image generation from masked images,
  aligning both the visible contextual patches and the provided concepts. By further
  adjusting the testing time mask ratio, we could produce a range of reconstructions
  that blend the visible patches with the provided concepts, proportional to the chosen
  ratios.
---

