import React from 'react'
import Component from 'react/lib/ReactComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Snackbar from 'material-ui/Snackbar'

export default class ErrorSnack extends Component {
  constructor(props) {
		super(props)
    this.shouldComponentUpdate = PureRenderMixin
    	.shouldComponentUpdate.bind(this)
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps(newProps) {
	  if (newProps.open != this.state.open) {
	    this.setState({ open: newProps.open });
	  }
	}

  handleRequestClose() {
    this.setState({
      open: false
    })
  }

  errorMessage() {
  	if (!this.props.open)
  		return ''
  	return 'Error! ' + this.props.message.get('error')
  }

	render() {
    return (
    	<Snackbar
	      open={this.state.open}
	      message={::this.errorMessage()}
	      autoHideDuration={8000}
	      onRequestClose={::this.handleRequestClose}
	    />
	  )
	}
}