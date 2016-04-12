import React from 'react'
import { fromJS } from 'immutable'
import ReactDom from 'react-dom'
import { hashHistory } from 'react-router'
import makeStore from '../flux/store'
import Root from '../App/Root'
import routes from '../App/routes'
import { getEvent } from '../event/event'

const initialState = (window) ? null : window.__INITIAL_STATE__

const store = makeStore(fromJS(initialState))

store.dispatch(getEvent())

export function alreadyAuth(nextState, replace) {
  if (store.getState().getIn(['user', 'isAuthenticated'])) {
    replace({
      pathname: '/account',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function requireAuth(nextState, replace) {
  if (!store.getState().getIn(['user', 'isAuthenticated'])) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDom.render(
	<Root store={store} history={hashHistory} routes={routes} />
	,document.getElementById('app')
)