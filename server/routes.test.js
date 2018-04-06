/* global describe, expect, test */
const request = require('supertest')
const routes = require('./routes')

describe('The /sequence API', () => {
  test('should GET a sequence for a given species and region', () => {
    return request(routes).get('/sequence/region/human/X:1000000..1000050:1').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body.seq).toBe('CTGTAGAAACATTAGCCTGGCTAACAAGGTGAAACCCCATCTCTACTAACA')
    })
  })
})
