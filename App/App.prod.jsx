import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import connect from 'react-redux/lib/components/connect'
import { routerActions } from 'react-router-redux/lib/actions'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as Colors from 'material-ui/styles/colors'

import Header from './Header'
import ErrorSnack from './ErrorSnack'
import * as EventActions from '../Event/Event_action_creators'

export const bwePalette = {
  primary1Color: Colors.deepOrange700
  ,primary2Color: Colors.deepOrange800
  ,primary3Color: Colors.lightBlack
  ,accent1Color: Colors.indigo500
  ,accent2Color: Colors.indigo700
  ,accent3Color: Colors.grey500
  ,pickerHeaderColor: Colors.deepOrange700
}

const bweTheme = getMuiTheme({
  palette: bwePalette
})

class App extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
  }

	render() {
		return (
      <MuiThemeProvider muiTheme={bweTheme}>
				<div
					className='app-container'
				>
					<ErrorSnack 
						open={this.props.error !== ''}
						message={this.props.error} 
					/>
					<Header 
						isAuth={this.props.isAuth} 
						login={this.props.login}
						account={this.props.account}
						event={this.props.event}
						userName={this.props.userName}
						toggleSearch={this.props.toggleSearch}
						searchOpen={this.props.searchOpen}
					/>
					{this.props.children}
				</div>
      </MuiThemeProvider>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuth: state.getIn(['user', 'isAuthenticated'])
		,error: state.getIn(['meta', 'error'])
		,userName: state.getIn([
			'user'
			,'currentUser'
			,state.getIn(['user', 'usersById'])
			,'name'
		])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: () => dispatch(routerActions.push('/login'))
		,account: () => dispatch(routerActions.push('/account'))
		,event: () => dispatch(routerActions.push('/'))
		,toggleSearch: () => dispatch(EventActions.toggleSearch())
	}
}

export default connect(
	mapStateToProps
	,mapDispatchToProps
)(App)