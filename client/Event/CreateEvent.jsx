import React, { Component } from 'react'
import { Map, fromJS } from 'immutable'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import TextField from 'material-ui/lib/text-field'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import AutoComplete from 'material-ui/lib/auto-complete'
import Divider from 'material-ui/lib/divider'
import * as Colors from 'material-ui/lib/styles/colors'

const style = {
	position: 'absolute'
  ,right: 16
  ,bottom: 16
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
    this.state = {
      open: false
			,name: null
			,startDay: null
			,startTime: null
			,endDay: null
			,endTime: null
			,owner: 'Burning Fanny'
			,description: null
			,location: null
    }
  }
	
	handleOpen() {
    this.setState({open: true})
  }

  handleOk() {
    this.setState({open: false})
  }

  handleCancel() {
    this.setState({open: false})
  }

  handleChange(field) {
  	return (event) => {
	    this.setState({[field]: event.target.value})
	  }
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
				<FloatingActionButton 
					style={style} 
					backgroundColor={Colors.deepOrange700}
					onTouchTap={::this.handleOpen}
				>
	      	<ContentAdd />
	    	</FloatingActionButton>
        <Dialog
          title="Create a new awesome event!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={::this.handleCancel}
          contentStyle={dialogStyle}
        >
        	<TextField
        		hintText='Event title'
        		fullWidth={true}
        		onChange={::this.handleChange('name')}
        		value={this.state.name}
        	/>
      		<AutoComplete 
      			hintText="Location"
		        dataSource={[]}
        		value={this.state.location}
      		/>
          <div className='container-fluid'>
          	<div className='col-sm-7 col-xs-12'>
          		<DatePicker 
			          minDate={minDate}
			          maxDate={maxDate}
			          defaultDate={minDate}
			          disableYearSelection={true}
          			hintText="Start day" 
          			fullWidth={true} 
        				value={this.state.startDay}
          		/>
          	</div>
          	<div className='col-sm-5 col-xs-offset-2 col-xs-10'>
          		<TimePicker 
          			format='24hr'
          			hintText="Start time"
          			fullWidth={true}
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
			          fullWidth={true}
        				value={this.state.endDay}
			        />
          	</div>
          	<div className='col-sm-5 col-xs-offset-2 col-xs-10'>
          		<TimePicker 
          			format='24hr'
          			hintText="End time"
          			fullWidth={true}
        				value={this.state.endTime}
          		/>
          	</div>
          </div>
        	<TextField
        		hintText='Description'
        		fullWidth={true}
        		multiLine={true}
    				value={this.state.description}
        	/>
        </Dialog>
      </div>
    )
  }
}