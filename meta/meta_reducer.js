import { fromJS } from 'immutable'
import * as eventTypes from '../event/event_action_types'
import * as userTypes from '../user/user_action_types'

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
	case userTypes.GET.REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case userTypes.LOGIN.REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case userTypes.LOGOUT.REQUEST:
		return state.merge(fromJS({
			working: true
		}))
	case userTypes.REGISTER.REQUEST:
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
	case userTypes.GET.SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case userTypes.LOGIN.SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case userTypes.LOGOUT.SUCCESS:
		return state.merge(fromJS({
			working: false
		}))
	case userTypes.REGISTER.SUCCESS:
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
	case userTypes.GET.FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
			,status: action.meta.status
		}))
	case userTypes.LOGIN.FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
			,status: action.meta.status
		}))
	case userTypes.LOGOUT.FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
			,status: action.meta.status
		}))
	case userTypes.REGISTER.FAILURE:
		return state.merge(fromJS({
			working: false
			,error: action.meta.error
			,status: action.meta.status
		}))
	default:
		return state
	}
}