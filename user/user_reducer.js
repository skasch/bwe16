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
		case types.LOGIN.SUCCESS:
			return state.merge(fromJS({
				currentUser: action.payload.user
				,isAuthenticated: true
			}))
		case types.UPDATE.SUCCESS:
			return state.mergeIn('currentUser', action.payload.user)
		case types.AUTH:
			return state.merge(fromJS({
				currentUser: action.payload.user
				,isAuthenticated: true
				,usersById: action.payload.user.keySeq().first()
			}))
		default:
			return state
	}
} 