import React from 'react'
import { Route, Redirect } from 'react-router'
import EventContainer from '../Event/Event'
import LoginContainer from '../Login/Login'
import AccountContainer from '../Account/Account'
import AppContainer from './App'
import { alreadyAuth, requireAuth } from '../client/index'

export default (
	<Route component={AppContainer}>
		<Route path='/' component={EventContainer} />
		<Redirect from='/_=_' to='/' />
		<Route path='/login' component={LoginContainer} onEnter={alreadyAuth}/>
		<Route path='/account' component={AccountContainer} onEnter={requireAuth}/>
	</Route>
)