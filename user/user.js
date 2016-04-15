import { routerActions } from 'react-router-redux'
import Request from 'superagent'
import Config from '../config/config'

import * as actionCreators from './user_action_creators'

const serverUri = ''
const userUri = serverUri + '/api/user'

const authUri = serverUri + '/auth'

export function loginUser(user) {
	return dispatch => {
		dispatch(actionCreators.loginUserRequest(user))
		return Request
			.post(authUri + '/login')
			.withCredentials()
			.send(user)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.loginUserFailure(res.body, res.status))
				} else {
					dispatch(actionCreators.loginUserSuccess(res.body))
					dispatch(routerActions.push('/'))
					location.reload()
				}
			})
	}
}

export function logoutUser() {
	return dispatch => {
		dispatch(actionCreators.logoutUserRequest())
		return Request
			.get(authUri + '/logout')
			.withCredentials()
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.logoutUserFailure(res.body, res.status))
				} else {
					dispatch(actionCreators.logoutUserSuccess())
					dispatch(routerActions.push('/'))
					location.reload()
				}
			})
	}
}

export function registerUser(user) {
	return dispatch => {
		dispatch(actionCreators.registerUserRequest(user))
		return Request
			.post(authUri + '/register')
			.withCredentials()
			.set('Accept', 'application/json')
			.send(user)
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.registerUserFailure(res.body, res.status))
				} else {
					dispatch(actionCreators.registerUserSuccess(res.body))
					dispatch(routerActions.push('/'))
					location.reload()
				}
			})
	}
}

export function updateUser(userId, user) {
	return dispatch => {
		dispatch(actionCreators.updateUserRequest(userId, user))
		return Request
			.post(userUri + '/' + userId)
			.withCredentials()
			.set('Accept', 'application/json')
			.send(user)
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.updateUserFailure(res.body, res.status))
				} else {
					dispatch(actionCreators.updateUserSuccess(res.body))
				}
			})
	}
}

export function getUser(userId) {
  return (dispatch) => {
    dispatch(getUserRequest(userId))
    return Request
    	.get(userUri + '/' + userId)
    	.withCredentials()
    	.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					dispatch(actionCreators.getUserFailure(res.body, res.status))
				} else {
					dispatch(actionCreators.getUserSuccess(res.body))
				}
			})
	}
}