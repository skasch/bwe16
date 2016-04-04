import { createStore, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import reducer from './reducer'

export default function makeStore() {
	const makeStore = compose(
		applyMiddleware(ThunkMiddleware)
	)(createStore)

	return makeStore(reducer)
}