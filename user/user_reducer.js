import { Map, fromJS } from 'immutable'
import * as types from './user_action_types'

export const INITIAL_STATE = fromJS({
	currentUser: ''
	,isAuthenticated: false
	,usersById: {}
})

export default function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.LOGOUT.SUCCESS:
			return state.merge(fromJS({
				currentUser: ''
				,isAuthenticated: false
			}))
		case types.GET.SUCCESS:
			return state.merge(fromJS({
				usersById: action.payload.user
			}))
		case types.
		default:
			return state.merge(fromJS({
				userById: action.payload.user
			}))
	}
} 