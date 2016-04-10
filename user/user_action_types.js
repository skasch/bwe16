const prefix = 'bwe16/user/'

function requestBundle(name, prefix = '') {
	return {
		REQUEST: prefix + name + '_REQUEST'
		,SUCCESS: prefix + name + '_SUCCESS'
		,FAILURE: prefix + name + '_FAILURE'
	}
}

export const GET = requestBundle('GET')
export const LOGIN = requestBundle('LOGIN')
export const LOGOUT = requestBundle('LOGOUT')
export const REGISTER = requestBundle('REGISTER')