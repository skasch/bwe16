import React, { propTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import Moment from 'moment'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import AutoComplete from 'material-ui/lib/auto-complete'
import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'
import * as Colors from 'material-ui/lib/styles/colors'

import CreateEvent from './CreateEvent'
import EventCard from './EventCard'
import * as eventActions from '../event/event'

export class Event extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
  }

	render() {
		return (
			<div>
				{(this.props.isAuth) ?
					<CreateEvent postEvent={this.props.postEvent} create={true}/> :
					null}
	    	<Paper zDepth={1} className='event-filtering'>
	    		<div className="container">
			      <div className='col-sm-6 col-xs-12'>
				      <AutoComplete
				      	fullWidth={true}
				        hintText="Search events"
				        dataSource={[]}
				        // onUpdateInput={this.handleUpdateInput}
				      />
			   		</div>
			      <div className='col-sm-6 col-xs-12'>
				      <DatePicker fullWidth={true} hintText="Event day"/>
			   		</div>
					</div>
	    	</Paper>
	    	<Divider />
				<div className="container">
					{this.props.eventList.keySeq().map(key => {
						return <EventCard 
							key={key}
							eventId={key}
							event={this.props.eventList.get(key)}
							updateEvent={this.props.updateEvent} 
							removeEvent={this.props.removeEvent}
							isAuth={this.props.isAuth}
						/>
					})}
				</div>
			</div>
		)
	}
}

function mapStoreToProps(state) {
	return {
		eventList: state.getIn(['event', 'data'])
		,isAuth: state.getIn(['user', 'isAuthenticated'])
	}
}

export default connect(
	mapStoreToProps
	,eventActions
)(Event)