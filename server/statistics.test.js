/* global describe, expect, test */
'use strict'

const statistics = require('./statistics')

describe('The statistics module', () => {
  test('counts nucleotides', () => {
    const count = statistics.countNucleotides
    const seq = 'TTGTAATCCCAGCTAC'
    expect(count(seq, 'A')).toBe(4)
    expect(count(seq, 'C')).toBe(5)
    expect(count(seq, 'G')).toBe(2)
    expect(count(seq, 'T')).toBe(5)
  })

  test('calculates correct percentage of nucleotides', () => {
    let stats = statistics.calculate('TTGTAATCCCAGCTAC')
    expect(stats.A).toBe('25%')
    expect(stats.C).toBe('31%')
    expect(stats.G).toBe('13%')
    expect(stats.T).toBe('31%')
  })

  test('calculates correct percentage of zero-instance nucleotides', () => {
    let stats = statistics.calculate('CCCCCCCCCA')
    expect(stats.A).toBe('10%')
    expect(stats.C).toBe('90%')
    expect(stats.G).toBe('0%')
    expect(stats.T).toBe('0%')
  })
})
