import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Account extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
  }
  
	render() {
		return (
			<div>
				Hello
			</div>
		)
	}
}

export default connect(
	() => ({})
)(Account)