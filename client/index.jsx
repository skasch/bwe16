import React from 'react'
import { fromJS } from 'immutable'
import ReactDom from 'react-dom'
import { hashHistory } from 'react-router'
import makeStore from '../flux/store'
import Root from '../App/Root'
import { clientRoutes } from '../App/routes'
import { getEvent } from '../event/event'

const initialState = window.__INITIAL_STATE__

const store = makeStore(fromJS(initialState))

store.dispatch(getEvent())

ReactDom.render(
	<Root store={store} history={hashHistory} routes={clientRoutes(store)} />
	,document.getElementById('app')
)