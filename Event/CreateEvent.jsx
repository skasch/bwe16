import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Moment from 'moment'
import { Map, fromJS } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker/DatePicker'
import TimePicker from 'material-ui/TimePicker/TimePicker'
import AutoComplete from 'material-ui/AutoComplete'
import Divider from 'material-ui/Divider'
import * as Colors from 'material-ui/styles/colors'

const style = {
	position: 'fixed'
  ,right: 16
  ,bottom: 16
  ,zIndex: 100
}

const dialogStyle = {
  width: '90%'
  ,minWidth: '320px'
  ,maxWidth: '1080px'
}

const minDate = new Date('2016-05-13')
const maxDate = new Date('2016-05-15')

export default class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
    this.state = {
      open: false
			,owner: this.props.owner
			,name: this.props.name
			,startDay: this.props.startTime
			,startTime: this.props.startTime
			,endDay: this.props.endTime
			,endTime: this.props.endTime
			,description: this.props.description
			,location: this.props.location
			,nameError: null
			,startDayError: null
			,startTimeError: null
			,endDayError: null
			,endTimeError: null
			,descriptionError: null
			,locationError: null
    
  }}

  componentWillReceiveProps(newProps) {
	  if (newProps.owner !== this.state.owner) {
	    this.setState({ owner: newProps.owner });
	  }
	}
	
	handleOpen() {
    this.setState({open: true})
  }

  handleOk() {
  	const fields = fromJS({
  		name: 'name' 
  		,startDay: 'starting day'
  		,startTime: 'starting time'
  		,endDay: 'ending day'
  		,endTime: 'ending time'
  		,description: 'description'
  		,location: 'location'
  	})
  	const valid = fields.keySeq().reduce((valid, field) => {
	  	if (!this.state[field] || this.state[field] === '') {
	  		this.setState({
	  			[field + 'Error']: 'The event ' + fields.get(field) + 
	  				' cannot be empty'
	  		})
	  		return false
	  	}
	  	return valid
  	}, true)
  	if (valid) {
  		const event = fromJS({
  			name: this.state.name
  			,startTime: Moment(
  				Moment(this.state.startDay).format('YYYY-MM-DD ') +
  				Moment(this.state.startTime).format('HH:mm:ss')
  				,'YYYY-MM-DD HH:mm:ss'
  			)
  			,endTime: Moment(
  				Moment(this.state.endDay).format('YYYY-MM-DD ') +
  				Moment(this.state.endTime).format('HH:mm:ss')
  				,'YYYY-MM-DD HH:mm:ss'
  			)
  			,owner: this.state.owner
  			,description: this.state.description
  			,location: this.state.location
  		})
  		if (event.get('endTime') > event.get('startTime')) {
  			(this.props.create) ?
	  			this.props.postEvent(event) :
	  			this.props.updateEvent(event, this.props.eventId)
	  		this.setState({open: false})
  		} else {
  			this.setState({
  				endDayError: 'The ending day should be after the starting day'
  				,endTimeError: 'The ending time should be after the starting time'
  			})
  		}
  	}
  }

  handleCancel() {
    this.setState({open: false})
  }

  handleNameChange(event) {
    this.setState({
    	nameError: null
    	,name: event.target.value
    })
  }

  handleLocationChange(text) {
    this.setState({
    	locationError: null
    	,location: text
    })
  }

  handleStartDayChange(event, time) {
    this.setState({
    	startDayError: null
    	,startDay: time
    })
  }

  handleStartTimeChange(event, time) {
    this.setState({
    	startTimeError: null
    	,startTime: time
    })
  }

  handleEndDayChange(event, time) {
    this.setState({
    	endDayError: null
    	,endDay: time
    })
  }

  handleEndTimeChange(event, time) {
    this.setState({
    	endTimeError: null
    	,endTime: time
    })
  }

  handleDescriptionChange(event) {
    this.setState({
    	descriptionError: null
    	,description: event.target.value
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={::this.handleOk}
      />
      ,<FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={::this.handleCancel}
      />
    ]

    return (
      <div>
				{(this.props.create) ? (
					<FloatingActionButton 
						style={style} 
						backgroundColor={Colors.deepOrange700}
						onTouchTap={::this.handleOpen}
					>
		      	<ContentAdd />
		    	</FloatingActionButton>
		    ) : (
		    	<RaisedButton 
		    		label="Edit" 
		    		fullWidth={true}
						onTouchTap={::this.handleOpen}
		    	/>
		    )}
        <Dialog
          title={
          	(
          		(this.props.create) ? 
          		"Create a new" : 
          		"Edit " + ((this.props.isOwner) ?  "your" : "this")
          	) + 
          	" awesome event!"
          }
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={::this.handleCancel}
          contentStyle={dialogStyle}
          autoScrollBodyContent={true}
        >
        	<TextField
        		hintText='Event title'
        		value={this.state.name}
        		errorText={this.state.nameError}
        		fullWidth={true}
        		onChange={::this.handleNameChange}
        		disabled={!this.props.isOwner}
        	/>
      		<AutoComplete 
      			hintText="Location"
        		errorText={this.state.locationError}
		        dataSource={[]}
        		onUpdateInput={::this.handleLocationChange}
        		searchText={this.state.location}
      		/>
          <div className='container-fluid'>
          	<div className='col-sm-7 col-xs-12'>
          		<DatePicker 
			          minDate={minDate}
			          maxDate={maxDate}
			          defaultDate={minDate}
			          disableYearSelection={true}
          			hintText="Start day"
        				errorText={this.state.startDayError} 
          			fullWidth={true} 
        				onChange={::this.handleStartDayChange}
        				value={this.state.startDay}
          		/>
          	</div>
          	<div className='col-sm-5 col-xs-offset-2 col-xs-10'>
          		<TimePicker 
          			format='24hr'
          			hintText="Start time"
        				errorText={this.state.startTimeError}
          			fullWidth={true}
        				onChange={::this.handleStartTimeChange}
        				value={this.state.startTime}
          		/>
          	</div>
          	<div className='col-sm-7 col-xs-12'>
          		<DatePicker
			          minDate={minDate}
			          maxDate={maxDate}
			          defaultDate={maxDate}
			          disableYearSelection={true}
			          hintText="End day"
        				errorText={this.state.endDayError}
			          fullWidth={true}
        				onChange={::this.handleEndDayChange}
        				value={this.state.endDay}
			        />
          	</div>
          	<div className='col-sm-5 col-xs-offset-2 col-xs-10'>
          		<TimePicker 
          			format='24hr'
          			hintText="End time"
        				errorText={this.state.endTimeError}
          			fullWidth={true}
        				onChange={::this.handleEndTimeChange}
        				value={this.state.endTime}
          		/>
          	</div>
          </div>
        	<TextField
        		hintText='Description'
        		errorText={this.state.descriptionError}
        		fullWidth={true}
        		multiLine={true}
        				onChange={::this.handleDescriptionChange}
    				value={this.state.description}
    				disabled={!this.props.isOwner}
        	/>
        </Dialog>
      </div>
    )
  }
}