'use strict'

const promise = require('bluebird')
const ensembl = require('../shared/ensembl')

module.exports = (species, region) => {
  if (!species) {
    return promise.reject('missing required argument `species`')
  }

  if (!region) {
    return promise.reject('missing required argument `region`')
  }

  if (!ensembl.validateRegion(region)) {
    return promise.reject('invalid format for `region` (substring definition)')
  }

  return ensembl.fetchRegion(species, region)
    .then(data => {
      return promise.resolve(data.seq)
    })
    .catch(err => {
      return promise.reject(err.message)
    })
}
