import Express from 'express'
import BodyParser from 'body-parser'
import Morgan from 'morgan'
import ExpressSession from 'express-session'
import Passport from 'passport'
import Path from 'path'
import Webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import config from '../config/config'
import webpackConfig from '../webpack.config'
import passportConfig from './passport_config'
import { eventApi, userApi } from './api'
import authMiddleware from './auth_middleware'

const app = Express()

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.use(Morgan('dev'))

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

app.use(ExpressSession({
	secret: 'PUT_IN_ENV'
	,resave: false
	,saveUninitialized: false
	,cookie: {
		httpOnly: true
		,secure: false
		,maxAge: 86400000
	}
}))
app.use(Passport.initialize())
app.use(Passport.session())
passportConfig(Passport)

app.get('/api/event', eventApi.get)
app.post('/api/event', authMiddleware, eventApi.post)
app.post('/api/event/:id', authMiddleware, eventApi.update)
app.delete('/api/event/:id', authMiddleware, eventApi.remove)

app.post('/auth/login', Passport.authenticate('local'), userApi.login)
app.get('/auth/logout', userApi.logout)
app.post('/auth/register', userApi.register)

app.get('/auth/facebook', Passport.authenticate('facebook'))
app.get('/auth/facebook/callback', Passport.authenticate('facebook', {
	callbackURL: '/auth/facebook/callback'
  ,successRedirect: '/'
  ,failureRedirect: '/login'
}))

if (!isProduction) {
	app.get('*', (req, res) => {
		res.sendFile(Path.resolve(__dirname + '/../dist/index.html'))
	})
} 

app.set('port', port)

export default app