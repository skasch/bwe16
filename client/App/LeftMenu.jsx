import React, { Component } from 'react'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import MapIcon from 'material-ui/lib/svg-icons/maps/map'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import Avatar from 'material-ui/lib/avatar'

export default class LeftMenu extends Component {
	render() {
		return (
			<div className='left-menu-container'>
	      <Card>
			    <CardMedia>
		      	<img src={require('../img/creme_brulee.jpg')} />
			    </CardMedia>
			  </Card>
			  <MenuItem 
			  	leftIcon={<Avatar src={require('../img/avatar_french_burners.jpg')} />}
			  >Skasch</MenuItem>
	      <MenuItem leftIcon={<EventIcon/>}>Events</MenuItem>
	      <MenuItem leftIcon={<MapIcon/>}>Map</MenuItem>
	     </div>
		)
	}
}