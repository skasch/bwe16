import { Map, fromJS } from 'immutable'
import * as types from './Event_action_types'

export const INITIAL_STATE = fromJS({
	searchOpen: true
})

export default function eventReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case types.TOGGLE_SEARCH:
		return state.set('searchOpen', !state.get('searchOpen'))
	default:
		return state
	}
}