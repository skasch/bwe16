import createStore from 'redux/lib/createStore'
import applyMiddleware from 'redux/lib/applyMiddleware'
import compose from 'redux/lib/compose'
import ThunkMiddleware from 'redux-thunk'
import routerMiddleware from 'react-router-redux/lib/middleware'
import { hashHistory } from 'react-router/lib/index'
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