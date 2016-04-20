import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bwePalette } from '../App/App'

export default class EventCard extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin
      .shouldComponentUpdate.bind(this)
  }

  render() {
  	return (
  		<span 
  			className='badge'
  			style={{
  				backgroundColor: this.props.bgColor || (
  					(this.props.primary) ? 
  						bwePalette.primary1Color : 
  						bwePalette.accent1Color
					)
					,color: this.props.color || 'white'
  			}}
  		>
  			{this.props.text}
  		</span>
  	)
  }
}