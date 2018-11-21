import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {submit} from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import './forms_css/form_buttons.css'


class RemoteSubmitButton extends Component {
	render(){
		return(
		  <RaisedButton

		    type="button"
		    label={this.context.t("Submit")}
		    overlayStyle={{backgroundColor:'#66BB6A'}}
				labelColor='#4b1248'
		    onClick={() => this.props.dispatch(submit('wizard'))}
		  />
		)
	}
}
//                                  ^^^^^^^^^^^^ name of the form = 'wizard'

RemoteSubmitButton.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect()(RemoteSubmitButton)
