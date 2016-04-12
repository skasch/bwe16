import React from 'react'
import { Route, Redirect } from 'react-router'
import EventContainer from '../Event/Event'
import LoginContainer from '../Login/Login'
import AccountContainer from '../Account/Account'
import AppContainer from './App'

function alreadyAuth(store) {
	return (nextState, replace) => {
	  if (store.getState && 
	  	store.getState().getIn(['user', 'isAuthenticated'])) {
	    replace({
	      pathname: '/account',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
	}
}

function requireAuth(store) {
	return (nextState, replace) => {
	  if (store.getState() && 
	  	!store.getState().getIn(['user', 'isAuthenticated'])) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
	}
}

export function clientRoutes(store) {
	return (
		<Route component={AppContainer}>
			<Route path='/' component={EventContainer} />
			<Redirect from='/_=_' to='/' />
			<Route 
				path='/login' 
				component={LoginContainer} 
				onEnter={alreadyAuth(store)}
			/>
			<Route 
				path='/account' 
				component={AccountContainer} 
				onEnter={requireAuth(store)}
			/>
		</Route>
	)
}

export default (
	<Route component={AppContainer}>
		<Route path='/' component={EventContainer} />
		<Redirect from='/_=_' to='/' />
		<Route path='/login' component={LoginContainer} />
		<Route path='/account' component={AccountContainer} />
	</Route>
)