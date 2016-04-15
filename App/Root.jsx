import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Provider from 'react-redux/lib/components/Provider'
import Router from 'react-router/lib/Router'
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