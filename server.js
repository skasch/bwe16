import app from './server/app'
import config from './config/config'

const port = app.get('port')

app.listen(port, error => {
	if (error) console.error(error)
	console.info('Listening on http://%s:%s, you\'re ready to go!',
		config.get('server').get('host'), port)
})