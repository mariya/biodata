#!/usr/bin/env node

const args = require('commander')
const superagent = require('superagent')
const apiBase = 'http://rest.ensembl.org/sequence/region'
const regionRegex = /.+:(\d+)?\.\.(\d+)?(:-?1)?$/

let species, region
args
  .version('1.0.0')
  .arguments(' <species> <region>')
  .action(function (s, r) {
    species = s
    region = r
  })

args.parse(process.argv)

// Commander does not automatically validate the first argument,
// so we validate the species argument manually.
if (!species) {
  console.log('\n  error: missing required argument `species`\n')
  process.exit(1)
}

// Ensure region is correctly formatted.
if (!region.match(regionRegex)) {
  console.log('\n  error: invalid format for `region` (substring definition)\n')
  process.exit(1)
}

let api = `${apiBase}/${species}/${region}`
superagent.get(api)
  .set('Content-Type', 'application/json')
  .end((err, res) => {
    if (err) {
      console.log(`\n  Ensembl API error: '${err}'\n`)
      process.exit(1)
    }

    if (!res.body || !res.body.seq) {
      console.log('\n  error: could not retrieve sequence from Ensembl API response\n')
      process.exit(1)
    }

    console.log(res.body.seq)
  })
