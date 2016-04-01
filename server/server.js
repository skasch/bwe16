import Express from 'express'
import * as eventApi from './eventApi'
import config from '../config/config'

app = Express()

const isProduction = process.env.NOVE_ENV === 'production'
const port = isProduction ? process.env.PORT : config.dev.server.port

if (!isProduction) {
	const bundle = require('../build/bundle.js')
	bundle()
} 

app.get('/api/event/', eventApi.getEvent)
app.post('api/event/', eventApi.postEvent)
app.post('/api/event/:id', eventApi.updateEvent)
app.delete('/api/event/:id', eventApi.deleteEvent)