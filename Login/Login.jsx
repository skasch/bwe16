import React from 'react'
import Component from 'react/lib/ReactComponent'
import { fromJS } from 'immutable'
import connect from 'react-redux/lib/components/connect'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Account from 'material-ui/svg-icons/action/account-circle'
import FontIcon from 'material-ui/FontIcon'
import * as Colors from 'material-ui/styles/colors'

import * as userActions from '../user/user'

class Login extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
      .shouldComponentUpdate.bind(this)
    this.state = {
    	username: ''
    	,email: ''
      ,password: ''
    	,usernameError: null
    	,emailError: null
    	,passwordError: null
      ,register: false
    }
  } 

  handleSubmit() {
  	let valid = true
  	if (this.state.register && 
  			(!this.state.username || this.state.username === '')) {
  		this.setState({ usernameError: 'The username field cannot be empty' })
  		valid = false
  	}
  	if (!this.state.email || this.state.email === '') {
  		this.setState({ emailError: 'The email field cannot be empty' })
  		valid = false
  	} else if (!/^[^@]+@([^@\.]+\.)+[^@\.]+$/.test(this.state.email)) {
  		this.setState({ emailError: 'The email field is invalid' })
  		valid = false
  	}
  	if (!this.state.password || this.state.password === '') {
  		this.setState({ passwordError: 'The password field cannot be empty' })
  		valid = false
  	} else if (!/^.{8,20}$/.test(this.state.password)) {
  		this.setState({ 
  			passwordError: 'The password must be between 8 and 20 characters long'
  		})
  		valid = false
  	}
  	if (!valid)
  		return null
  	if (this.state.register) {
  		const user = fromJS({
  			name: this.state.username
  			,email: this.state.email
  			,password: this.state.password
  		})
  		this.props.register(user)
  	} else {
  		const user = fromJS({
  			email: this.state.email
  			,password: this.state.password
  		})
  		this.props.login(user)
  	}
  }

  handleUsernameChange(event) {
    this.setState({
    	usernameError: null
    	,username: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
    	emailError: null
    	,email: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
    	passwordError: null
    	,password: event.target.value
    })
  }

  toggleRegister() {
  	this.setState({ 
    	usernameError: null
    	,emailError: null
    	,passwordError: null
  		,register: !this.state.register 
  	})
  }

	render() {
		return (
			<div className="container">
				<Card style={{margin:"8"}}>
	        <CardHeader
	          title={ (this.state.register) ? 'Register' : "Login" }
	          subtitle={ 
	          	(this.state.register) ?
	          	"Welcome home!" : 
	          	"Welcome back home!"
	          }
	          avatar={
	          	<Avatar 
	          		icon={<Account />}
	          	/>
	          }
	        />
	        <CardText expandable={false}>
        		{(this.state.register) ? 
	        		<div className='container-fluid'>
		        		<div className='col-sm-6 col-xs-12'>
		        			<TextField 
		        				hintText="Username" 
		        				type="text" 
		        				fullWidth={true}
				        		value={this.state.username}
				        		errorText={this.state.usernameError}
		        				onChange={::this.handleUsernameChange}
		        			/>
		        		</div>
        			</div> :
        		null}
	        	<div className='container-fluid'>
	        		<div className='col-sm-6 col-xs-12'>
	        			<TextField 
	        				hintText="Email" 
	        				type="email" 
	        				fullWidth={true}
			        		value={this.state.email}
			        		errorText={this.state.emailError}
	        				onChange={::this.handleEmailChange}
	        			/>
	        		</div>
	        		<div className='col-sm-6 col-xs-12'>	        		
		        		<TextField 
		        			hintText="Password" 
		        			type="password" 
		        			fullWidth={true}
			        		value={this.state.password}
			        		errorText={this.state.passwordError}
	        				onChange={::this.handlePasswordChange}
		        		/>
		        	</div>
						</div>
	        </CardText>
	        <CardActions>
	        	<RaisedButton
			        label={(this.state.register) ? 'Register' : "Login"}
				      onClick={::this.handleSubmit}
			        primary={true}
	        	/>
	        	<RaisedButton
			        label={(this.state.register) ? 'Register with' : "Login with"}
      				labelPosition="before"
				      linkButton={true}
				      href="/auth/facebook"
	        		secondary={true}
	        		icon={
	        			<FontIcon 
	        				className="fa fa-facebook" 
	        			>
	        			</FontIcon>
	        		}
	        	/>
	        	<FlatButton
	        		label={ (this.state.register) ? "Login" : "register" }
	        		onTouchTap={::this.toggleRegister}
	        	/>
	        </CardActions>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.getIn(['user', 'isAuthenticated'])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user) => dispatch(userActions.loginUser(user))
		,register: (user) => dispatch(userActions.registerUser(user))
	}
}

export default connect(
	mapStateToProps
	,mapDispatchToProps
)(Login)