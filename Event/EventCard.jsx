import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Moment from 'moment'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import * as Colors from 'material-ui/styles/colors'

import CreateEvent from './CreateEvent'
import { categories } from './Event'

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

  avatarColor() {
    const startTime = ::this.getTime('startTime')
    return (startTime.format('DD') % 2 === 0) ? Colors.indigo400 : 
      Colors.deepOrange400
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
      <Card 
        style={{
          margin:"8px"
        }}
      >
        {
          (this.props.isOwner) ?
          <Dialog
            title="Confirm event suppression"
            actions={actions}
            modal={false}
            open={this.state.deleteDialogOpen}
            onRequestClose={::this.handleCancelDeleteDialog}
          >
            Do you really want to delete this event?
          </Dialog> :
          null
        }
        <CardHeader
          title={this.props.event.get('name')}
          subtitle={this.props.event.get('location')}
          actAsExpander={true}
          showExpandableButton={true}
          style={{
            backgroundColor: ((this.props.event.get('category')) ? 
              categories
                .filter(category => {
                  return category.get('name') == this.props.event.get('category')
                })
                .first()
                .get('bgColor') :
              'white')
          }}
          avatar={
            <Avatar
              backgroundColor={::this.avatarColor()}
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
          {
            (this.props.isOwner) ?
            <div className='col-xs-6 col-sm-3'>
              <RaisedButton 
                label="Delete"
                fullWidth={true}
                secondary={true}
                onTouchTap={::this.handleOpenDeleteDialog}
              />
            </div> :
            null
          }
          {(this.props.isAuth) ?
            <div 
              className={
                (this.props.isOwner) ?
                'col-xs-6 col-sm-3 col-sm-offset-6' :
                'col-xs-6 col-xs-offset-6 col-sm-3 col-sm-offset-9'
              }
            >
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
                isOwner={this.props.isOwner}
              />
            </div> :
            null
          }
          </div>
        </CardActions>
      </Card>
    )
  } 
}