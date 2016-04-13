import { createStore, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import reducer from './reducer'

export default function makeStore(initialState) {
	const createStoreWithMiddleware = compose(
		applyMiddleware(ThunkMiddleware)
		,applyMiddleware(routerMiddleware(hashHistory))
	)(createStore)

	const store = createStoreWithMiddleware(reducer, initialState)

	return store
}