import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Paper from 'material-ui/Paper'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import * as userActions from '../user/user'

class Account extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
    this.state = {
    	newEmail: ''
    	,emailPasswd: ''
    	,emailPasswdConfirm: ''
    	,newEmailError: null
    	,emailPasswdError: null
    	,emailPasswdConfirmError: null
    	,newPasswd: ''
    	,passwdPasswd: ''
    	,passwdPasswdConfirm: ''
    	,newPasswdError: null
    	,passwdPasswdError: null
    	,passwdPasswdConfirmError: null
    	,updateSuccess: false
    }
  }

  componentWillReceiveProps(newProps) {
	  if (newProps.updateSuccess !== this.state.updateSuccess) {
	    this.setState({ updateSuccess: newProps.updateSuccess });
	  }
	}

  handleEmailPasswdChange(event) {
  	this.setState({
  		emailPasswd: event.target.value
  		,emailPasswdError: null
  		,emailPasswdConfirmError: null
  	})
  }

  handleEmailPasswdConfirmChange(event) {
  	this.setState({
  		emailPasswdConfirm: event.target.value
  		,emailPasswdError: null
  		,emailPasswdConfirmError: null
  	})
  }

  handleEmailChange(event) {
  	this.setState({
  		newEmail: event.target.value
  		,newEmailError: null
  	})
  }

  handlePasswdPasswdChange(event) {
  	this.setState({
  		passwdPasswd: event.target.value
  		,passwdPasswdError: null
  		,passwdPasswdConfirmError: null
  	})
  }

  handlePasswdPasswdConfirmChange(event) {
  	this.setState({
  		passwdPasswdConfirm: event.target.value
  		,passwdPasswdError: null
  		,passwdPasswdConfirmError: null
  	})
  }

  handlePasswdChange(event) {
  	this.setState({
  		newPasswd: event.target.value
  		,newPasswdError: null
  	})
  }

  handleSubmitNewEmail() {
  	let valid = true
  	if (this.state.emailPasswd !== this.state.emailPasswdConfirm) {
  		this.setState({ 
  			emailPasswdError: 'Passwords do not match'
  			,emailPasswdConfirmError: 'Passwords do not match' 
  		})
  		valid = false
  	}
  	if (!this.state.newEmail || this.state.newEmail === '') {
  		this.setState({ newEmailError: 'The email field cannot be empty' })
  		valid = false
  	} else if (!/^[^@]+@([^@\.]+\.)+[^@\.]+$/.test(this.state.newEmail)) {
  		this.setState({ newEmailError: 'The email field is invalid' })
  		valid = false
  	}
  	if (!valid)
  		return null
  	const user = fromJS({
  		authPasswd: this.state.emailPasswd
  		,field: 'email'
  		,value: this.state.newEmail
  	})
  	this.props.update(this.props.userId, user)
  }

  handleSubmitNewPasswd() {
  	let valid = true
  	if (this.state.passwdPasswd !== this.state.passwdPasswdConfirm) {
  		this.setState({ 
  			passwdPasswdError: 'Passwords do not match'
  			,passwdPasswdConfirmError: 'Passwords do not match' 
  		})
  		valid = false
  	}
  	if (!this.state.newPasswd || this.state.newPasswd === '') {
  		this.setState({ newPasswdError: 'The email field cannot be empty' })
  		valid = false
  	} else if (!/^.{8,20}$/.test(this.state.newPasswd)) {
  		this.setState({ newPasswdError: 'The email field is invalid' })
  		valid = false
  	}
  	if (!valid)
  		return null
  	const user = fromJS({
  		authPasswd: this.state.passwdPasswd
  		,field: 'password'
  		,value: this.state.newPasswd
  	})
  	this.props.update(this.props.userId, user)
  }

  handleRequestClose() {
    this.setState({
      updateSuccess: false
    })
  }

	render() {
		return (
			<Paper className='container-fluid'>
	    	<Snackbar
		      open={this.state.updateSuccess}
		      message="Update successful!"
		      autoHideDuration={8000}
		      onRequestClose={::this.handleRequestClose}
		    />
				<h3>Your account</h3>
	      <h4>{"Welcome home, " + this.props.name + "!" }</h4>
	      <div className='col-xs-12 col-sm-6'>
					<Card style = {{marginTop: '8px', marginBottom: '8px'}}>
						<CardHeader
							title="Change email address"
							subtitle="Your dusty mailbox"
						/>
						<CardText>
							{(this.props.email && this.props.email !== '') ?
								'Your current email address is: ' + this.props.email :
								'You do not have any email address registered yet'}
	        		<TextField 
	        			hintText="Enter your password" 
	        			type="password" 
	        			fullWidth={true}
		        		value={this.state.emailPasswd}
		        		errorText={this.state.emailPasswdError}
        				onChange={::this.handleEmailPasswdChange}
	        		/>
	        		<TextField 
	        			hintText="Confirm your password" 
	        			type="password" 
	        			fullWidth={true}
		        		value={this.state.emailPasswdConfirm}
		        		errorText={this.state.emailPasswdConfirmError}
        				onChange={::this.handleEmailPasswdConfirmChange}
	        		/>
        			<TextField 
        				hintText="New email" 
        				type="email" 
        				fullWidth={true}
		        		value={this.state.newEmail}
		        		errorText={this.state.newEmailError}
        				onChange={::this.handleEmailChange}
        			/>
						</CardText>
						<CardActions>
		        	<FlatButton
				        label={"Submit"}
				        secondary={true}
				        onClick={::this.handleSubmitNewEmail}
		        	/>
						</CardActions>
					</Card>
				</div>
	      <div className='col-xs-12 col-sm-6'>
					<Card style = {{marginTop: '8px', marginBottom: '8px'}}>
						<CardHeader
							title="Change password"
							subtitle="Shh, it's a secret!"
						/>
						<CardText>
	        		<TextField 
	        			hintText="Enter your password" 
	        			type="password" 
	        			fullWidth={true}
		        		value={this.state.passwdPasswd}
		        		errorText={this.state.passwdPasswdError}
        				onChange={::this.handlePasswdPasswdChange}
	        		/>
	        		<TextField 
	        			hintText="Confirm your password" 
	        			type="password" 
	        			fullWidth={true}
		        		value={this.state.passwdPasswdConfirm}
		        		errorText={this.state.passwdPasswdConfirmError}
        				onChange={::this.handlePasswdPasswdConfirmChange}
	        		/>
        			<TextField 
        				hintText="New password" 
        				type="password" 
        				fullWidth={true}
		        		value={this.state.newPasswd}
		        		errorText={this.state.newPasswdError}
        				onChange={::this.handlePasswdChange}
        			/>
						</CardText>
						<CardActions>
		        	<FlatButton
				        label={"Submit"}
				        secondary={true}
				        onClick={::this.handleSubmitNewPasswd}
		        	/>
						</CardActions>
					</Card>
					</div>
	      <div className='col-xs-12'>
					<Card style = {{marginTop: '8px', marginBottom: '8px'}}>
						<CardHeader
							title="Logout"
							subtitle="See you soon, you dusty hippie!"
						/>
						<CardActions>
		        	<RaisedButton
				        label={"Logout"}
				        primary={true}
				        onClick={this.props.logout}
		        	/>
						</CardActions>
					</Card>
				</div>
			</Paper>
		)
	}
}

function mapsStateToProps(state) {
	return {
		name: state.getIn([
			'user'
			,'currentUser'
			,state.getIn(['user', 'usersById'])
			,'name'
		])
		,email: state.getIn([
			'user'
			,'currentUser'
			,state.getIn(['user', 'usersById'])
			,'email'
		])
		,userId: state.getIn(['user', 'usersById'])
		,updateSuccess: state.getIn(['meta', 'updateSuccess'])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(userActions.logoutUser())
		,update: (userId, user) => dispatch(userActions.updateUser(userId, user))
	}
}

export default connect(
	mapsStateToProps
	,mapDispatchToProps
)(Account)