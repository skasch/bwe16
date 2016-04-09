import React, { Component } from 'react'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import * as Colors from 'material-ui/lib/styles/colors'

import Header from './Header'

const bweTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.deepOrange700
    ,primary2Color: Colors.deepOrange800
    ,primary3Color: Colors.lightBlack
    ,accent1Color: Colors.indigo500
    ,accent2Color: Colors.indigo700
    ,accent3Color: Colors.grey500
    ,pickerHeaderColor: Colors.deepOrange700
  }
})

export default class App extends Component {
	render() {
		return (
      <MuiThemeProvider muiTheme={bweTheme}>
				<div className='app-container'>
					<Header />
					{this.props.children}
				</div>
      </MuiThemeProvider>
		)
	}
}