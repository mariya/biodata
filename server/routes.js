const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()

// Parse JSON POST data
app.use(bodyParser.json())

const STATUS_OK = 200
const STATUS_BAD_REQUEST = 400

// For proxying requests to Ensembl
const ensembl = require('../shared/ensembl')

// For calculating statistics
const calculate = require('./statistics').calculate

// This endpoint is simply a proxy to Ensembl;
// therefore here we use the same structure and
// naming conventions.
router.get('/region/:species/:region', (req, res) => {
  const species = req.params.species
  const region = req.params.region

  // Not specifying species or region automatically generates 404,
  // so we do not need to test for their existence.

  // We should validate the region format, however.
  if (!ensembl.validateRegion(region)) {
    return res.status(STATUS_BAD_REQUEST).send({ error: 'Invalid region.' })
  }

  ensembl.fetchRegion(species, region)
    .then(data => {
      res.status(STATUS_OK).send(data)
    })
    .catch(err => {
      // Proxy error received from ensembl
      return res.status(err.statusCode).send(err.error)
    })
})

router.post('/statistics', (req, res) => {
  if (!req.body || !req.body.seq) {
    return res.status(STATUS_BAD_REQUEST).send({ error: 'seq not provided' })
  }
  return res.status(200).send(calculate(req.body.seq))
})

app.use('/sequence', router)

module.exports = app
