import { Map, fromJS } from 'immutable'
import * as eventService from '../event/event_service'
import * as userService from '../user/user_service'

function factorService(service) {
	return {
		get: (req, res) => {
			service.get()
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err })
				})
		}
		,post: (req, res) => {
			service.post(req.body)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		}
		,update: (req, res) => {
			service.update(req.params.id, req.body)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		}
		,remove: (req, res) => {
			service.remove(req.params.id)
				.then(event => res.json(event))
				.catch(err => {
					res.status(400)
					res.json({ error: err, event: req.body })
				})
		}
	}
}

export const eventApi = factorService(eventService)

function filterUserProps(user) {
	const id = user.keySeq().first()
	return fromJS({
		[id]: {
			name: user.get(id).get('name') || {}
			,email: user.get(id).get('email')
		}
	})
}

export const userApi = {
	get: (req, res, next) => {
		const { userId } = req.params
		userService.get(userId)
			.then(user => {
				if (user.err) next(user.err)
				res
					.status(200)
					.json(filterUserProps(user))
			})
			.error(next)
	}
	,login: (req, res) => {
		res.status(200)
			.json(filterUserProps(req.user))
	}
	,logout: (req, res) => {
		req.logout()
		res.status(200)
			.json(req.user)
	}
	,register: (req, res, next) => {
		userService.post(fromJS(req.body))
			.then(user => {
				if (user.get('err')) next(user.get('err')) 
				else {
					req.logIn(user, err => {
						if (err) next(err)
						res.status(200)
							.json(filterUserProps(user))
					})	
				}
			})
	}
	,update: (req, res, next) => {
		userService.update(req.params.id, fromJS(req.body))
			.then(user => {
				if (user.get('err')) next(user.get('err')) 
				else {
					req.logIn(user, err => {
						if (err) next(err)
						res.status(200)
							.json(filterUserProps(user))
					})	
				}
			})
	}
}