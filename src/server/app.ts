import express from 'express'
import log from 'loglevel'

import api from './api'

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 8081

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', api)

app.listen(PORT, () => log.info(`App listening on port ${PORT}`))