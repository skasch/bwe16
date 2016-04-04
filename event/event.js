import * as actionCreators from './event_action_creators'

const eventUrl = '/api/event'

export function getEvent() {
	return dispatch => {
		dispatch(actionCreators.getEventRequest())
		return request
			.get(eventUrl)
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
		return request
			.post(eventUrl)
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
		return request
			.post(eventUrl + '/' + id)
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
		return request
			.del(eventUrl + '/' + id)
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