import { Map, fromJS } from 'immutable'
import * as types from './event_action_types'

export const INITIAL_STATE = Map().set('data', Map())

export default function eventReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case types.GET_SUCCESS:
		return state.mergeIn(['data'], action.payload.event)
	case types.POST_SUCCESS:
		return state.mergeIn(['data'], action.payload.event)
	case types.UPDATE_SUCCESS:
		return state.mergeIn(['data'], action.payload.event)
	case types.REMOVE_SUCCESS:
		return state.removeIn(['data', action.payload.id])
	default:
		return state
	}
}