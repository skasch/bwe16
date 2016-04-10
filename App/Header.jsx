import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu'
import LeftMenu from './LeftMenu'

class Header extends Component {
	constructor(props) {
		super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
		this.state = { 
			open: false 
		}
	}

	handleToggle() {
		this.setState({ open: true })
	}

	render() {
		return (
			<div className='header-container'>
				<AppBar
					title='Burning Weekend 2016'
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					iconElementLeft={<IconButton onClick={::this.handleToggle}>
						<Menu />
					</IconButton>}
				/>
	      <LeftNav 
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open: open })}
         >
          <LeftMenu />
	      </LeftNav>
	    </div>
		)
	}
}

export default Header