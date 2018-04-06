#!/usr/bin/env node

const args = require('commander')
const ensembl = require('./shared/ensembl')

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
if (!ensembl.validateRegion(region)) {
  console.log('\n  error: invalid format for `region` (substring definition)\n')
  process.exit(1)
}

ensembl.fetchRegion(species, region)
  .then(data => {
    if (!data || !data.seq) {
      console.log('\n  error: could not retrieve sequence from Ensembl API response\n')
      process.exit(1)
    }

    // If we have gotten the data, print it out.
    console.log(data.seq)
  })
  .catch(err => {
    console.log(`\n  Ensembl API error: '${err.message}'\n`)
    process.exit(1)
  })
