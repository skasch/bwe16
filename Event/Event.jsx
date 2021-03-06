import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import connect from 'react-redux/lib/components/connect'
import { fromJS } from 'immutable'
import Moment from 'moment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import DatePicker from 'material-ui/DatePicker/DatePicker'
import AutoComplete from 'material-ui/AutoComplete'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import * as Colors from 'material-ui/styles/colors'

import CreateEvent from './CreateEvent'
import EventCard from './EventCard'
import * as eventActions from '../event/event'

export const categories = fromJS([
	{ 
		name: 'Workshop', color: Colors.amber700, bgColor: Colors.amber400 }
	,{ name: 'Art', color: Colors.green700, bgColor: Colors.green400 }
	,{ name: 'Meal', color: Colors.pink700, bgColor: Colors.pink400 }
	,{ name: 'Music', color: Colors.cyan700, bgColor: Colors.cyan400 }
	,{ name: 'Other', color: Colors.blueGrey700, bgColor: Colors.blueGrey400 }
])

export const minDate = new Date('2016-05-13')
export const maxDate = new Date('2016-05-15')

export class Event extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
    this.state = {
    	events: null
    	,search: null
    	,request: null
    	,eventDay: null
    }
  }

  componentWillReceiveProps(newProps) {
	  if (newProps.events !== this.eventsAsList()) {
	    this.setState({ 
	    	events: this.eventsAsList() 
	    });
	  }
	}

	eventTitles() {
		return this.eventsAsList().map(event => event.get('name')).toJSON()
	}

  eventsAsList() {
  	return this.props.eventList.keySeq().map(key => {
  		return this.props.eventList.get(key).set('id', key)
  	})
  		.sort((e1, e2) => {
  			return Moment(new Date(e1.get('startTime')))
  				.diff(Moment(new Date(e2.get('startTime'))))
  		})
  }

  eventContainText(text) {
  	return event => {
	  	return (!text) || (text === '') || event.get('name')
				.toLowerCase()
				.includes(text.toLowerCase()) ||
			event.get('location')
				.toLowerCase()
				.includes(text.toLowerCase()) ||
			event.get('description')
				.toLowerCase()
				.includes(text.toLowerCase())
		}
  }

  eventFilter(searchText, key) {
  	if (searchText === '')
  		return false
  	return this.eventsAsList()
  		.filter(event => event.get('name') === key)
  		.reduce((hasMatch, event) => {
  			return hasMatch || this.eventContainText(searchText)(event)
  				
  		}, false)
  }

  handleSearch(text) {
  	this.setState({
  		search: text
  		,request: null
  	})
  }

  handleRequest(text) {
  	this.setState({
  		request: text
  	})
  }

  handleEventDayChange(event, time) {
  	this.setState({
  		eventDay: time
  	})
  }

  validKeys() {
  	const text = (this.state.request) ? this.state.request : this.state.search
  	return this.eventsAsList()
  		.filter(this.eventContainText(text))
  		.filter(event => {
  			const startTime = Moment(new Date(event.get('startTime')))
  				.format('YYYY-MM-DD')
  			const endTime = Moment(new Date(event.get('endime')))
  				.format('YYYY-MM-DD')
  			const eventDay = Moment(new Date(this.state.eventDay))
  				.format('YYYY-MM-DD')
  			return (!this.state.eventDay) || eventDay === startTime ||
  				eventDay === endTime
  		})
  		.map(event => event.get('id'))
  }

	render() {
		return (
			<div>
				{(this.props.isAuth) ?
					<CreateEvent 
						postEvent={this.props.postEvent} 
						owner={this.props.userId}
						create={true}
					/> :
					null}
	    	<Paper
	    		style={{ 
	    			overflowY: 'auto'
	    			,maxHeight: (this.props.searchOpen) ?
		    			'1440px' :
		    			'0px'
	    		}}
	    		zDepth={1} 
	    		className='event-filtering'
	    	>
	    		<div className="container">
			      <div className='col-sm-6 col-xs-12'>
				      <AutoComplete
				      	fullWidth={true}
				        hintText="Search events"
				        dataSource={::this.eventTitles()}
				        filter={::this.eventFilter}
        				onUpdateInput={::this.handleSearch}
        				onNewRequest={::this.handleRequest}
				      />
			   		</div>
			      <div className='col-sm-6 col-xs-12'>
				      <DatePicker 
			          minDate={minDate}
			          maxDate={maxDate}
			          defaultDate={minDate}
			          disableYearSelection={true}
          			hintText="Event day"
          			fullWidth={true} 
        				onChange={::this.handleEventDayChange}
        				value={this.state.eventDay}
				      />
			   		</div>
					</div>
	    	</Paper>
	    	<Divider />
				<div className="container">
					{::this.validKeys().map(key => {
						const event = this.props.eventList.get(key)
						return <EventCard 
							key={key}
							eventId={key}
							event={event}
							updateEvent={this.props.updateEvent} 
							removeEvent={this.props.removeEvent}
							isAuth={this.props.isAuth}
							isOwner={this.props.userId === event.get('owner')}
						/>
					})}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		eventList: state.getIn(['event', 'data'])
		,isAuth: state.getIn(['user', 'isAuthenticated'])
		,userId: state.getIn(['user', 'usersById'])
		,searchOpen: state.getIn(['Event', 'searchOpen'])
	}
}

export default connect(
	mapStateToProps
	,eventActions
)(Event)