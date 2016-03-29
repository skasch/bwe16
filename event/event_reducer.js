import { createEvent, removeEvent, editEvent, INITIAL_STATE } from './event'
import { CREATE_EVENT, EDIT_EVENT, REMOVE_EVENT } from '../flux/action_types'

export default function eventReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case CREATE_EVENT:
			return createEvent(state 
				,action.payload.eventId 
				,action.payload.eventContent)
		case EDIT_EVENT:
			return editEvent(state
				,action.payload.eventId
				,action.payload.eventContent)
		case REMOVE_EVENT:
			return removeEvent(state, action.payload.eventId)
	}
	return state
}