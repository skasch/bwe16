import * as types from './event_action_types'

export function getEventRequest() {
	return { type: types.GET_REQUEST }
}

export function getEventSuccess(events) {
	return {
		type: types.GET_SUCCESS
		,payload: {
			events: events
		}
	}
}

export function getEventFailure(error) {
	return {
		type: types.GET_FAILURE
		,meta: {
			error: error
		}
	}
}

export function postEventRequest(event) {
	return {
		type: types.POST_REQUEST
		,payload: {
			event: event
		}
	}
}

export function postEventSuccess(event) {
	return {
		type: types.POST_SUCCESS
		,payload: {
			event: event
		}
	}
}

export function postEventFailure(error) {
	return {
		type: types.POST_FAILURE
		,meta: {
			error: error
		}
	}
}

export function updateEventRequest(event, id) {
	return {
		type: types.UPDATE_REQUEST
		,payload: {
			event: event
			,id: id
		}
	}
}

export function updateEventSuccess(event) {
	return {
		type: types.UPDATE_SUCCESS
		,payload: {
			event: event
		}
	}
}

export function updateEventFailure(error) {
	return {
		type: types.UPDATE_FAILURE
		,meta: {
			error: error
		}
	}
}

export function removeEventRequest(id) {
	return {
		type: types.REMOVE_REQUEST
		,payload: {
			id: id
		}
	}
}

export function removeEventSuccess(id) {
	return {
		type: types.REMOVE_SUCCESS
		,payload: {
			id: id
		}
	}
}

export function removeEventFailure(error) {
	return {
		type: types.REMOVE_FAILURE
		,meta: {
			error: error
		}
	}
}