import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Paper from 'material-ui/lib/paper'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardActions from 'material-ui/lib/card/card-actions'
import CardText from 'material-ui/lib/card/card-text'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

class Account extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
    this.state = {
    	newEmail: ''
    	,newEmailError: null
    }
  }

  handleEmailChange(event) {
  	this.setState({
  		newEmail: event.target.value
  		,newEmailError: null
  	})
  }

	render() {
		return (
			<Paper className='container-fluid'>
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
        				hintText="New email" 
        				type="email" 
        				fullWidth={true}
		        		value={this.state.newEmail}
		        		errorText={this.state.newEmailError}
        				onChange={::this.handleEmailChange}
        			/>
						</CardText>
						<CardActions>
		        	<RaisedButton
				        label={"Submit"}
				        secondary={true}
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
        				hintText="New email" 
        				type="email" 
        				fullWidth={true}
		        		value={this.state.email}
		        		errorText={this.state.emailError}
        				onChange={::this.handleEmailChange}
        			/>
						</CardText>
						<CardActions>
		        	<RaisedButton
				        label={"Submit"}
				        secondary={true}
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
	}
}

export default connect(
	mapsStateToProps
)(Account)