import { Map, fromJS } from 'immutable'
import * as types from './event_action_types'

export const INITIAL_STATE = Map()

export default function eventReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case types.GET_SUCCESS:
		return state.merge(action.payload)
	case types.POST_SUCCESS:
		return state.merge(action.payload)
	case types.UPDATE_SUCCESS:
		return state.merge(action.payload)
	case types.REMOVE_SUCCESS:
		return state.remove(action.payload)
	default:
		return state
	}
}