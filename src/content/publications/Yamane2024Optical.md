---
number: 140
title: 'Optical Neuroimage Studio (OptiNiSt): intuitive, scalable, extendable framework
  for optical neuroimage data analysis'
authors: Yamane, Y., Li, Y., Matsumoto, K., Kanai, R., Desforges, M., Gutierrez, C.
  E., & Doya K.
year: 2024
venue: bioRxiv
doi: https://doi.org/10.1101/2024.09.17.613603
url: https://www.biorxiv.org/content/10.1101/2024.09.17.613603v1
type: Paper
language: en
scholar: true
abstract: Advancements in calcium indicators and optical techniques have made optical
  neural recording a common tool in neuroscience. As the volume of optical neural
  recording data grows, streamlining the data analysis pipelines for image preprocessing,
  signal extraction, and subsequent neural activity analyses becomes essential. There
  are a number of challenges in optical neural data analysis. 1) The quality of original
  and processed data needs to be carefully examined at each step. 2) As there are
  numerous image preprocessing, cell extraction, and activity analysis algorithms,
  each with pros and cons, experimenters need to implement or install them to compare
  and select optimal methods and parameters for each step of processing. 3) To ensure
  the reproducibility of the research, each analysis step needs to be recorded in
  a systematic way. 4) For data sharing and meta-analyses, adoption of standard data
  formats and processing protocols is required. To address these challenges, we developed
  Optical Neuroimage Studio (OptiNiSt) (https://github.com/oist/optinist), a framework
  for intuitively creating calcium data analysis pipelines that are scalable, extendable,
  and reproducible. OptiNiSt includes the following features. 1) Researchers can easily
  create analysis pipelines by selecting multiple processing modules, tuning their
  parameters, and visualizing the results at each step through a graphic user interface
  in a web browser. 2) In addition to common analytical tools that are pre-installed,
  new analysis algorithms in Python can be easily added. 3) Once a processing pipeline
  is designed, the entire workflow with its modules and parameters are stored in a
  YAML file, which makes the pipeline reproducible and deployable on high-performance
  computing clusters. 4) OptiNiSt can read image data in a variety of file formats
  and store the analysis results in NWB (Neurodata Without Borders), a standard data
  format for data sharing. We expect that this framework will be helpful in standardizing
  optical neural data analysis protocols.
---

