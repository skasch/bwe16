import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Card from 'material-ui/Card/Card'
import CardMedia from 'material-ui/Card/CardMedia'
import CardTitle from 'material-ui/Card/CardTitle'
import MapIcon from 'material-ui/svg-icons/maps/map'
import EventIcon from 'material-ui/svg-icons/action/event'
import Avatar from 'material-ui/Avatar'

export default class Header extends Component {
	constructor(props) {
		super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
		this.state = { 
			open: false 
		}
	}

	handleOpen() {
		this.setState({ open: true })
	}

	handleToggle(open) {
		this.setState({ open: open })
	}

  openLogin() {
  	this.props.login()
  	this.handleToggle(false)
  }

  openAccount() {
  	this.props.account()
  	this.handleToggle(false)
  }

  openEvent() {
  	this.props.event()
  	this.handleToggle(false)
  }

	render() {
		return (
			<div className='header-container'>
				<AppBar
					title='Burning Weekend 2016'
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					iconElementLeft={<IconButton onClick={::this.handleOpen}>
						<Menu />
					</IconButton>}
				/>
	      <Drawer 
          docked={false}
          open={this.state.open}
          onRequestChange={::this.handleToggle}
         >
					<div className='left-menu-container'>
			      <Card>
					    <CardMedia>
				      	<img src={require('../img/creme_brulee.jpg')} />
					    </CardMedia>
					  </Card>
					  {(this.props.isAuth) ? 
					  	<MenuItem 
						  	leftIcon={<Avatar src={require('../img/avatar_french_burners.jpg')} />}
						  	onTouchTap={::this.openAccount}
						  >{this.props.userName}</MenuItem> :
						  <MenuItem 
						  	leftIcon={<Avatar src={require('../img/avatar_french_burners.jpg')} />}
						  	onTouchTap={::this.openLogin}
						  >Login</MenuItem>}
			      <MenuItem 
			      	leftIcon={<EventIcon/>}
			      	onTouchTap={::this.openEvent}
			      >Events</MenuItem>
			      {/*<MenuItem leftIcon={<MapIcon/>}>Map</MenuItem>*/}
			     </div>
	      </Drawer>
	    </div>
		)
	}
}