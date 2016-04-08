import React, { Component } from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import Avatar from 'material-ui/lib/avatar'
import * as Colors from 'material-ui/lib/styles/colors'

export default class EventCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader
          title="Yoga class"
          subtitle="Yogaholics Camp"
          actAsExpander={true}
          showExpandableButton={true}
          avatar={
            <Avatar
              backgroundColor={Colors.indigo500}
            >
              9
            </Avatar>
          }
        />
        <CardText expandable={true}>
          <div className='container-fluid'>
            <div className='col-xs-7 col-sm-7'>
              Yoga class for morning stretching
            </div>
            <div className='col-xs-5 col-sm-5 text-right'>
              Sam. 9:00-12:00
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