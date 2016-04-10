import React, { Component } from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import * as userActions from '../user/user'

class Login extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
      .shouldComponentUpdate.bind(this)
    this.state = {
    	emailInput: ''
      ,passwordInput: ''
      ,register: true
    }
  }

	submitAction(e) {
		e.preventDefault()
		const user = {
			email: this.state.emailInput.trim()
			,password: this.state.passwordInput.trim()
		}
		if (user.email && user.password) {
			(this.state.register) ?
				this.props.registerUser(user) :
				this.props.loginUser(user)
		}
		this.setState({
			emailInput: ''
			,passwordInput: ''
		})
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={::this.submitAction}>
					<input
						type='text'
						placeholder='Email'
						value={this.state.emailInput}
						onChange={event => this.setState({ 
							emailInput: event.target.value 
						})}
					/>
					<input
						type='password'
						placeholder='Password'
						value={this.state.passwordInput}
						onChange={event => this.setState({ 
							passwordInput: event.target.value 
						})}
					/>
					<button
						type='submit'
						onClick={() => this.setState({ register: false })}
					>
						Login
					</button>
					<button
						type='submit'
						onClick={() => this.setState({ register: true })}
					>
						Register
					</button>
				</form>
				<a href='/auth/facebook'>Sign in with Facebook</a>
			</div>
		)
	}
}

export default connect(
	() => ({})
	,userActions
)(Login)