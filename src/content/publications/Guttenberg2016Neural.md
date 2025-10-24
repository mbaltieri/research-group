---
number: 5
title: 'Neural Coarse-Graining: Extracting slowly-varying latent degrees of freedom
  with neural networks'
authors: Guttenberg, N., Biehl, M., & Kanai, R.
year: 2016
venue: arXiv
doi: https://doi.org/10.48550/arXiv.1609.00116
url: https://arxiv.org/abs/1609.00116
type: Paper
tags: Deep learning
language: en
scholar: true
abstract: We present a loss function for neural networks that encompasses an idea
  of trivial versus non-trivial predictions, such that the network jointly determines
  its own prediction goals and learns to satisfy them. This permits the network to
  choose sub-sets of a problem which are most amenable to its abilities to focus on
  solving, while discarding 'distracting' elements that interfere with its learning.
  To do this, the network first transforms the raw data into a higher-level categorical
  representation, and then trains a predictor from that new time series to its future.
  To prevent a trivial solution of mapping the signal to zero, we introduce a measure
  of non-triviality via a contrast between the prediction error of the learned model
  with a naive model of the overall signal statistics. The transform can learn to
  discard uninformative and unpredictable components of the signal in favor of the
  features which are both highly predictive and highly predictable. This creates a
  coarse-grained model of the time-series dynamics, focusing on predicting the slowly
  varying latent parameters which control the statistics of the time-series, rather
  than predicting the fast details directly. The result is a semi-supervised algorithm
  which is capable of extracting latent parameters, segmenting sections of time-series
  with differing statistics, and building a higher-level representation of the underlying
  dynamics from unlabeled data.
---

