'use strict'

const countNucleotides = (seq, nucleotide) => (seq.match(new RegExp(nucleotide, 'g')) || []).length

const calculate = (seq) => {
  const PRECISION = 0 // Change this to the number of decimal places desired
  const calculatePercentage = (nucleotide) =>
    `${(100 * countNucleotides(seq, nucleotide) / seq.length).toFixed(PRECISION)}%`

  let A = calculatePercentage('A')
  let C = calculatePercentage('C')
  let G = calculatePercentage('G')
  let T = calculatePercentage('T')

  return {A, C, G, T}
}

module.exports = {
  countNucleotides,
  calculate
}
