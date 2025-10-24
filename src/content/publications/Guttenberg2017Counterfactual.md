---
number: 14
title: Counterfactual Control for Free with Generative Models
authors: Guttenberg, N., Yu, Y., & Kanai, R.
year: 2017
venue: arXiv
doi: https://doi.org/10.48550/arXiv.1702.06676
url: https://arxiv.org/abs/1702.06676
type: Paper
tags: Deep Learning
language: en
scholar: true
abstract: We introduce a method by which a generative model learning the joint distribution
  between actions and future states can be used to automatically infer a control scheme
  for any desired reward function, which may be altered on the fly without retraining
  the model. In this method, the problem of action selection is reduced to one of
  gradient descent on the latent space of the generative model, with the model itself
  providing the means of evaluating outcomes and finding the gradient, much like how
  the reward network in Deep Q-Networks (DQN) provides gradient information for the
  action generator. Unlike DQN or Actor-Critic, which are conditional models for a
  specific reward, using a generative model of the full joint distribution permits
  the reward to be changed on the fly. In addition, the generated futures can be inspected
  to gain insight in to what the network 'thinks' will happen, and to what went wrong
  when the outcomes deviate from prediction.
---

