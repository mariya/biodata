/* global describe, expect, test */
'use strict'

const run = require('./run')

describe('The client run module', () => {
  test('throws an error if species not specified', () => {
    return run().catch(e => {
      expect(e).toBe('missing required argument `species`')
    })
  })

  test('throws an error if region not specified', () => {
    return run('human').catch(e => {
      expect(e).toBe('missing required argument `region`')
    })
  })

  test('validates region', () => {
    return run('human', 'foo').catch(e => {
      expect(e).toBe('invalid format for `region` (substring definition)')
    })
  })

  test('catches errors from ensembl', () => {
    return run('human', 'X:1000000..1000:1').catch(e => {
      expect(e).not.toBeNull()
    })
  })

  test('returns sequence', () => {
    return run('human', 'X:1000000..1000100:1')
      .then(seq => {
        expect(seq).toMatch(/^[ACGT]+$/)
      })
  })
})
