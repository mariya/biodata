/* global describe, expect, test */
const request = require('supertest')
const routes = require('./routes')

describe('The /sequence API', () => {
  test('should allow a GET request to obtain a sequence for a given species and region', () => {
    return request(routes)
      .get('/sequence/region/human/X:1000000..1000050:1')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body.seq).toBe('CTGTAGAAACATTAGCCTGGCTAACAAGGTGAAACCCCATCTCTACTAACA')
      })
  })

  test('should throw a 400 for GET requests with malformed region', () => {
    return request(routes)
      .get('/sequence/region/human/zippidydoodah')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.error).not.toBeNull()
      })
  })

  test('should proxy any ensembl errors for GET requests', () => {
    return request(routes)
      .get('/sequence/region/human/X:1000000..100000:1')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.error).not.toBeNull()
      })
  })

  test('should allow a POST request to obtain nucleotide statistics for a given sequence substring', () => {
    return request(routes)
      .post('/sequence/statistics')
      .send({ seq: 'CTGTAGAAACATTAGCCTGGCTAACAAGGTGAAACCCCATCTCTACTAACA' })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        const stats = response.body
        expect(stats.A).toBe('35%')
        expect(stats.C).toBe('27%')
        expect(stats.G).toBe('16%')
        expect(stats.T).toBe('22%')
      })
  })

  test('should throw a 400 for POST requests without a sequence', () => {
    return request(routes)
      .post('/sequence/statistics')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.error).not.toBeNull()
      })
  })
})
