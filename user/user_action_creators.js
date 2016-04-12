import * as types from './user_action_types'

export function loginUserRequest(user) {
	return {
		type: types.LOGIN.REQUEST
		,payload: {
			user: user
		}
	}
}

export function loginUserSuccess(user) {
	return {
		type: types.LOGIN.SUCCESS
		,payload: {
			user: user
		}
	}
}

export function loginUserFailure(error, status) {
	return {
		type: types.LOGIN.FAILURE
		,meta: {
			error: error
			,status: status
		}
	}
}

export function logoutUserRequest() {
	return { type: types.LOGOUT.REQUEST }
}

export function logoutUserSuccess() {
	return { type: types.LOGOUT.SUCCESS }
}

export function logoutUserFailure(error, status) {
	return {
		type: types.LOGOUT.FAILURE
		,meta: {
			error: error
			,status: status
		}
	}
}

export function registerUserRequest(user) {
	return {
		type: types.REGISTER.REQUEST
		,payload: {
			user: user
		}
	}
}

export function registerUserSuccess(user) {
	return {
		type: types.REGISTER.SUCCESS
		,payload: {
			user: user
		}
	}
}

export function registerUserFailure(error, status) {
	return {
		type: types.REGISTER.FAILURE
		,meta: {
			error: error
			,status: status
		}
	}
}

export function getUserRequest(userId) {
	return {
		type: types.GET.REQUEST
		,payload: {
			userId: userId
		}
	}
}

export function getUserSuccess(user) {
	return {
		type: types.GET.SUCCESS
		,payload: {
			user: user
		}
	}
}

export function getUserFailure(error, status) {
	return {
		type: types.GET.FAILURE
		,meta: {
			error: error
			,status: status
		}
	}
}

export function updateUserRequest(userId, field, value) {
	return {
		type: types.UPDATE.REQUEST
		,payload: {
			userId: userId
			,field: field
			,value: value
		}
	}
}

export function updateUserSuccess(user) {
	return {
		type: types.UPDATE.SUCCESS
		,payload: {
			user: user
		}
	}
}

export function updateUserFailure(error, status) {
	return {
		type: types.UPDATE.FAILURE
		,meta: {
			error: error
			,status: status
		}
	}
}

export function authUser(user) {
	return {
		type: types.AUTH
		,payload: {
			user: user
		}
	}
}