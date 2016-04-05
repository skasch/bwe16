import React from 'react'
import { Route } from 'react-router'
import EventContainer from '../Event/Event'
import App from './App'

export default (
	<Route component={App}>
		<Route path='/' component={EventContainer} />
	</Route>
)