import React, { Component } from 'react'

export default class App extends Component {
	render() {
		const { store, routes, history } = this.props
		return this.props.children
	}
}