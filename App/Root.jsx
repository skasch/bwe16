import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
  }

	render() {
		const { store, routes, history } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					{routes}
				</Router>
			</Provider>
		)
	}
}