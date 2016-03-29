import {Map, List} from 'immutable'

export const INITIAL_STATE = Map()

export function createEvent(state, eventId, eventContent) {	
	return state.merge(Map(), Map().set(eventId, eventContent))
}

export function removeEvent(state, eventId) {
	return state.delete(eventId)
}

export function editEvent(state, eventId, eventContent) {
	return state.mergeIn([eventId], List(), eventContent)
}