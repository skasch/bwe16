import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Moment from 'moment'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import CardText from 'material-ui/lib/card/card-text'
import Avatar from 'material-ui/lib/avatar'
import * as Colors from 'material-ui/lib/styles/colors'

import CreateEvent from './CreateEvent'

export default class EventCard extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
      .shouldComponentUpdate.bind(this)
    this.state = {
      deleteDialogOpen: false
    }
  }

  momentConvert(time) {
    return Moment(new Date(time))
  }

  getTime(key) {
    return this.momentConvert(this.props.event.get(key))
  }

  getEventDate(key) {
    return new Date(this.props.event.get(key))
  }

  getTimeText() {
    const startTime = ::this.getTime('startTime')
    const endTime = ::this.getTime('endTime')
    return (startTime.day() === endTime.day()) ?
      startTime.format('ddd. H:mm') + endTime.format('-H:mm') :
      startTime.format('ddd. H:mm') + endTime.format('-ddd. H:mm')
  }

  handleOpenDeleteDialog() {
    this.setState({deleteDialogOpen: true})
  }

  handleCancelDeleteDialog() {
    this.setState({deleteDialogOpen: false})
  }

  handleConfirmDeleteDialog() {
    this.props.removeEvent(this.props.eventId)
    this.setState({deleteDialogOpen: false})
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={::this.handleCancelDeleteDialog}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={::this.handleConfirmDeleteDialog}
      />,
    ];
    return (
      <Card style={{margin:"8"}}>
        <Dialog
          title="Confirm event suppression"
          actions={actions}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={::this.handleCancelDeleteDialog}
        >
          Do you really want to delete this event?
        </Dialog>
        <CardHeader
          title={this.props.event.get('name')}
          subtitle={this.props.event.get('location')}
          actAsExpander={true}
          showExpandableButton={true}
          avatar={
            <Avatar
              backgroundColor={Colors.indigo400}
            >
              {::this.getTime('startTime').hour()}
            </Avatar>
          }
        />
        <CardText expandable={true}>
          <div className='container-fluid'>
            <div className='col-xs-7 col-sm-7'>
              {this.props.event.get('description')}
            </div>
            <div className='col-xs-5 col-sm-5 text-right'>
              {::this.getTimeText()}
            </div>
          </div>
        </CardText>
        <CardActions expandable={true}>
          <div className='container-fluid'>
            <div className='col-xs-6 col-sm-3'>
              <RaisedButton 
                label="Delete"
                fullWidth={true}
                onTouchTap={::this.handleOpenDeleteDialog}
              />
            </div>
            <div className='col-xs-6 col-sm-3 col-sm-offset-6'>
              <CreateEvent 
                eventId={this.props.eventId} 
                create={false}
                updateEvent={this.props.updateEvent}
                owner={this.props.event.get('owner')}
                name={this.props.event.get('name')}
                startTime={::this.getEventDate('startTime')}
                endTime={::this.getEventDate('endTime')}
                description={this.props.event.get('description')}
                location={this.props.event.get('location')}
              />
            </div>
          </div>
        </CardActions>
      </Card>
    )
  } 
}