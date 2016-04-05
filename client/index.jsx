import React from 'react'
import ReactDom from 'react-dom'
import { hashHistory } from 'react-router'
import makeStore from '../flux/store'
import Root from '../App/Root'
import routes from '../App/routes'

const store = makeStore()

ReactDom.render(
	<Root store={store} history={hashHistory} routes={routes} />
	,document.getElementById('app')
)