import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu'
import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import MapIcon from 'material-ui/lib/svg-icons/maps/map'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import Avatar from 'material-ui/lib/avatar'

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
	      <LeftNav 
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
						  >{this.props.userName}</MenuItem> :
						  <MenuItem 
						  	leftIcon={<Avatar src={require('../img/avatar_french_burners.jpg')} />}
						  	onTouchTap={::this.openLogin}
						  >Login</MenuItem>}
			      <MenuItem 
			      	leftIcon={<EventIcon/>}
			      	onTouchTap={::this.openEvent}
			      >Events</MenuItem>
			      <MenuItem leftIcon={<MapIcon/>}>Map</MenuItem>
			     </div>
	      </LeftNav>
	    </div>
		)
	}
}