import app from './server/app'
import config from './config/config'

const port = app.get('port')

app.listen(port, error => {
	if (error) console.error(error)
	console.info('Listening on http://%s:%s, you\'re ready to go!',
		app.get(config.server.host, port)
})