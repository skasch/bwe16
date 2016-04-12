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
import initialRender from './index.jsx'

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

app.post('/api/user/:id', authMiddleware, userApi.update)

app.post('/auth/login', (req, res, next) => {
  Passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err)
    if (!user)
      return next(info.message)
    req.logIn(user, err => {
      if (err)
        return next(err)
      return res.json(info)
    })
  })(req, res, next)
}, userApi.login)
app.get('/auth/logout', userApi.logout)
app.post('/auth/register', userApi.register)

app.get('/auth/facebook', Passport.authenticate('facebook'))
app.get('/auth/facebook/callback', Passport.authenticate('facebook', {
	callbackURL: '/auth/facebook/callback'
  ,successRedirect: '/'
  ,failureRedirect: '/login'
}))

if (!isProduction) {
	app.get('*', initialRender)
} 

app.use((err, req, res, next) => {
	console.log('ERROR HANDLER:')
	console.log(err)
	res.status(err.status || 500)
	res.json({
		message: err.message
		,error: err
	})
})

app.set('port', port)

export default app