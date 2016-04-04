import Express from 'express'
import BodyParser from 'body-parser'

import config from '../config/config'
import { eventApi } from './api'

const app = Express()

const isProduction = process.env.NOVE_ENV === 'production'
console.log(eventApi)
const port = isProduction ? process.env.PORT : config.get('server').get('port')

// if (!isProduction) {
// 	const bundle = require('../build/bundle.js')
// 	bundle()
// } 

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

app.get('/api/event', eventApi.get)
app.post('api/event', eventApi.post)
app.post('/api/event/:id', eventApi.update)
app.delete('/api/event/:id', eventApi.remove)

export default app