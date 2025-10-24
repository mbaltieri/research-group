---
number: 154
title: Remembering Transformer for Continual Learning
authors: Sun, Y., Fujisawa, I., Juliani, A., Sakuma, J., & Kanai, R.
year: 2025
venue: IJCNN 2025
doi: https://doi.org/10.48550/arXiv.2404.07518
url: https://arxiv.org/abs/2404.07518
type: Conference Proceeding
language: en
scholar: true
abstract: Neural networks encounter the challenge of Catastrophic Forgetting (CF)
  in continual learning, where new task learning interferes with previously learned
  knowledge. Existing data fine-tuning and regularization methods necessitate task
  identity information during inference and cannot eliminate interference among different
  tasks, while soft parameter sharing approaches encounter the problem of an increasing
  model parameter size. To tackle these challenges, we propose the Remembering Transformer,
  inspired by the brain's Complementary Learning Systems (CLS). Remembering Transformer
  employs a mixture-of-adapters architecture and a generative model-based novelty
  detection mechanism in a pretrained Transformer to alleviate CF. Remembering Transformer
  dynamically routes task data to the most relevant adapter with enhanced parameter
  efficiency based on knowledge distillation. We conducted extensive experiments,
  including ablation studies on the novelty detection mechanism and model capacity
  of the mixture-of-adapters, in a broad range of class-incremental split tasks and
  permutation tasks. Our approach demonstrated SOTA performance surpassing the second-best
  method by 15.90% in the split tasks, reducing the memory footprint from 11.18M to
  0.22M in the five splits CIFAR10 task.
---

