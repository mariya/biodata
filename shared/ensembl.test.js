/* global describe, expect, test */
'use strict'

const ensembl = require('./ensembl')

describe('The ensembl module', () => {
  test('validates region', () => {
    const validate = ensembl.validateRegion
    expect(validate('X:1000000..1000100:1')).toBeTruthy()
    expect(validate('Y:..1000100')).toBeTruthy()
    expect(validate('X:1000000..')).toBeTruthy()
    expect(validate('Y:1000000..1000100')).toBeTruthy()
    expect(validate('CUSTOMCHROMOSOME:1000000..:-1')).toBeTruthy()
    expect(validate('xyz')).toBeFalsy()
    expect(validate(':1000000..1000100:1')).toBeFalsy()
    expect(validate('1000000..1000100:1')).toBeFalsy()
    expect(validate('X:5')).toBeFalsy()
  })

  test('calls ensembl region api', () => {
    const fetch = ensembl.fetchRegion
    const req = fetch('human', 'X:1000000..1000100:1')
    expect(req.uri.href).toBe('http://rest.ensembl.org/sequence/region/human/X:1000000..1000100:1')
  })
})
