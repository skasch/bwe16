import {List} from 'immutable'
import * as eventService from './event_service'

function factorService(service) {
	return Map()
		.set('get', (req, res) => {
			service
				.get()
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err })
				})
		})
		.set('post', (req, res) => {
			service
				.post(req.body)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		})
		.set('update', (req, res) => {
			service
				.update(req.params.id, req.body)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		})
		.set('remove', (req, res) => {
			service
				.remove(req.params.id)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		})
}

export const eventApi = factorService(eventService)