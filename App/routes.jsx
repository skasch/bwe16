import React from 'react'
import { Route, Redirect } from 'react-router'
import EventContainer from '../Event/Event'
import LoginContainer from '../Login/Login'
import App from './App'

export default (
	<Route component={App}>
		<Route path='/' component={EventContainer} />
		<Redirect from='/_=_' to='/' />
		<Route path='/login' component={LoginContainer} />
	</Route>
)