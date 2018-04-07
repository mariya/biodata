'use strict'

const app = require('./server/routes')

app.listen(5678, () => {
  console.log('Server listening on port 5678')
})
