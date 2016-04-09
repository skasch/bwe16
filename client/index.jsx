import React from 'react'
import ReactDom from 'react-dom'
import { hashHistory } from 'react-router'
import { fromJS, toJSON } from 'immutable'
import Moment from 'moment'
import makeStore from '../flux/store'
import Root from './App/Root'
import routes from './App/routes'
import { getEvent, postEvent } from '../event/event'

const store = makeStore()

console.log(store.dispatch(getEvent()))

ReactDom.render(
	<Root store={store} history={hashHistory} routes={routes} />
	,document.getElementById('app')
)