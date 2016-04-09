import Request from 'superagent'
import Config from '../config/config'

import * as actionCreators from './event_action_creators'

const serverUri = 'http://' + Config.get('server').get('host') + ':' +
	Config.get('server').get('port')
const eventUri = serverUri + '/api/event'

export function getEvent() {
	return dispatch => {
		dispatch(actionCreators.getEventRequest())
		return Request
			.get(eventUri)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.getEventFailure(err))
				} else {
					dispatch(actionCreators.getEventSuccess(res.body))
				}
			})
	}
}

export function postEvent(event) {
	return dispatch => {
		dispatch(actionCreators.postEventRequest(event))
		return Request
			.post(eventUri)
			.send(event)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.postEventFailure(err))
				} else {
					dispatch(actionCreators.postEventSuccess(res.body))
				}
			})
	}
}

export function updateEvent(event, id) {
	return dispatch => {
		dispatch(actionCreators.updateEventRequest(event, id))
		return Request
			.post(eventUri + '/' + id)
			.send(event)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.updateEventFailure(err))
				} else {
					dispatch(actionCreators.updateEventSuccess(res.body))
				}
			})
	}
}

export function removeEvent(id) {
	return dispatch => {
		dispatch(actionCreators.removeEventRequest(id))
		return Request
			.del(eventUri + '/' + id)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.removeEventFailure(err))
				} else {
					dispatch(actionCreators.removeEventSuccess(res.body))
				}
			})
	}
}