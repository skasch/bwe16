import Express from 'express'
import BodyParser from 'body-parser'
import Path from 'path'
import Webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import config from '../config/config'
import webpackConfig from '../webpack.config'
import { eventApi } from './api'

const app = Express()

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

const isProduction = process.env.NOVE_ENV === 'production'
const port = isProduction ? process.env.PORT : config.get('server').get('port')

if (!isProduction) {
	const compiler = Webpack(webpackConfig)
	const middlewareOpts = {
    stats: { colors: true }
		,publicPath: webpackConfig.output.publicPath
	} 

	const wpMiddleware = WebpackDevMiddleware(compiler, middlewareOpts)

	app.use(wpMiddleware)
	app.use(WebpackHotMiddleware(compiler))
} 

app.get('/api/event', eventApi.get)
app.post('/api/event', eventApi.post)
app.post('/api/event/:id', eventApi.update)
app.delete('/api/event/:id', eventApi.remove)

if (!isProduction) {
	app.get('*', (req, res) => {
		res.sendFile(Path.resolve(__dirname + '/../dist/index.html'))
	})
} 

app.set('port', port)

export default app