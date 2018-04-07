const request = require('request-promise')
const ensemblApiBase = 'http://rest.ensembl.org/sequence/region'

const validateRegion = (region) => region.match(/.+:(\d+)?\.\.(\d+)?(:-?1)?$/)

const fetchRegion = (species, region) => {
  return request({
    uri: `${ensemblApiBase}/${species}/${region}`,
    json: true
  })
}

module.exports = {
  validateRegion,
  fetchRegion
}
