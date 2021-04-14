const express = require('express')
const log = require('loglevel')
const app = express()

const PORT = process.env.PORT || 8081

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', require('./api'))

app.listen(PORT, () => log.info(`App listening on port ${PORT}`))