import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardMedia from 'material-ui/Card/CardMedia'
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
			,searchExpanded: true
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
					iconElementLeft={<IconButton onClick={::this.handleOpen}>
						<Menu />
					</IconButton>}
					iconElementRight={
						<IconButton>
							{(this.state.searchExpanded) ?
								<ExpandLess /> :
								<ExpandMore />
							}
						</IconButton>
					}
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