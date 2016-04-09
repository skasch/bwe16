import React, { Component } from 'react'
import Moment from 'moment'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import Avatar from 'material-ui/lib/avatar'
import * as Colors from 'material-ui/lib/styles/colors'

export default class EventCard extends Component {
  momentConvert(time) {
    return Moment(new Date(time))
  }

  getTime(key) {
    return this.momentConvert(this.props.event.get(key))
  }

  getTimeText() {
    const startTime = ::this.getTime('startTime')
    const endTime = ::this.getTime('endTime')
    return (startTime.day() === endTime.day()) ?
      startTime.format('ddd. H:mm') + endTime.format('-H:mm') :
      startTime.format('ddd. H:mm') + endTime.format('-ddd. H:mm')
  }

  render() {
    return (
      <Card style={{margin:"8"}}>
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
              <RaisedButton label="Save" fullWidth={true}/>
            </div>
            <div className='col-xs-6 col-sm-3 col-sm-offset-6'>
              <RaisedButton label="Edit" fullWidth={true}/>
            </div>
          </div>
        </CardActions>
      </Card>
    )
  } 
}