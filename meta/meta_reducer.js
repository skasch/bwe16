import { fromJS } from 'immutable'
import * as eventTypes from '../event/event_action_types'

export const INITIAL_STATE = fromJS({
	working: false
	,error: ''
})

export default function metaReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case eventTypes.GET_REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case eventTypes.POST_REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case eventTypes.UPDATE_REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case eventTypes.REMOVE_REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case eventTypes.GET_SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case eventTypes.POST_SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case eventTypes.UPDATE_SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case eventTypes.REMOVE_SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case eventTypes.GET_FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
		}))
	case eventTypes.POST_FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
		}))
	case eventTypes.UPDATE_FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
		}))
	case eventTypes.REMOVE_FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
		}))
	default:
		return state
	}
}