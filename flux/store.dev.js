import { createStore, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import reducer from './reducer'
import DevTools from '../App/DevTools'

export default function makeStore(initialState) {
	const createStoreWithMiddleware = compose(
		applyMiddleware(ThunkMiddleware)
		,applyMiddleware(routerMiddleware(hashHistory))
  	,DevTools.instrument()
	)(createStore)

	const store = createStoreWithMiddleware(reducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

	return store
}