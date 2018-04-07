const args = require('commander')
const run = require('./client/run')

args
  .version('1.0.0')
  .arguments(' <species> <region>')
  .action(function (species, region) {
    run(species, region).then(result =>
      console.log(result)
    )
      .catch(err => {
        console.error(`\n  error: ${err}\n`)
        process.exit(1)
      })
  })

args.parse(process.argv)
