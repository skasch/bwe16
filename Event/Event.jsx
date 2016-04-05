import React, { propTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import * as eventActionCreators from '../event/event_action_creators'

export class Event extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
  }

	render() {
		return <div>Hello world! How are you doing?</div>
	}
}
Event.propTypes = {}

function mapStoreToProps(state) {
	return {}
}

export default connect(
	mapStoreToProps
	,eventActionCreators
)(Event)