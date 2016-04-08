import React, { Component } from 'react'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import Avatar from 'material-ui/lib/avatar'

export default class LeftMenu extends Component {
	render() {
		return (
			<div className='left-menu-container'>
	      <Card>
			    <CardMedia
			      overlay={<CardTitle title="Burning Cafe 2016"/>}
			    >
		      	<img src={require('../img/burning_cafe.jpg')} />
			    </CardMedia>
			  </Card>
			  <MenuItem 
			  	leftIcon={<Avatar src={require('../img/french_burners.jpg')} />}
			  >Skasch</MenuItem>
	      <MenuItem>Events</MenuItem>
	      <MenuItem>Map</MenuItem>
	     </div>
		)
	}
}