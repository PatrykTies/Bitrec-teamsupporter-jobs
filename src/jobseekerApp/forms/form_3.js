import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import './forms_css/form_buttons.css'
import './forms_css/forms_main.css'

class FormThirdPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      helpBoxOpen: false
    }
  }


  content(){
    let helpBoxStyle = {transition: "all .2s ease-in-out", overflow: 'hidden'}

    if(!this.state.helpBoxOpen){
      helpBoxStyle = {
        ...helpBoxStyle,
        height: '100px'
      }
    }
    else{
      helpBoxStyle = {
        ...helpBoxStyle,
        height: '0px'
      }
    }
    const { previousPage } = this.props
    return(
      <div >
        <div className='main-wrapper'>
          <h4 className='q-contact'>{this.context.t('Ways contacting you')}</h4>
          <div className='info-icon'
            onClick={()=>{
              if(this.state.helpBoxOpen){
                this.setState({helpBoxOpen: false})
              }
              else{
                this.setState({helpBoxOpen: true})
              }
            }}
            >
            <FontIcon style={{color: '#bdbdbd', fontSize: '25px'}} className="material-icons">help_outline</FontIcon>
          </div>
          <div style={helpBoxStyle}>
            <div className='info-wrapper'>
              <p className='info-txt'>{this.context.t('WE CALL YOU WITHIN max 24hrs: Must be UK number. After reviewing your candidacy, if we think you are suitable. Our Agent will call you with further instructions.')}
              </p>
            </div>
          </div>
          <div>
            <Field
              name="contact_no"
              type="text"
              component={renderField}
              label={this.context.t("Mobile Number")}
            />
            <Field
              name="landline_no"
              type="text"
              component={renderField}
              label={this.context.t("Landline Number (optional)")}
            />
          </div>
        </div>
        <div className='buttons-wrapper'>
          <RaisedButton
            type="button"
            label={this.context.t('Back')}
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label={this.context.t('Next')}
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </div>
      </div>
    )
  }
  render(){
    const { handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper className='form-paper' zDepth={2} rounded={false}>
            {this.content()}
          </Paper>
          :
          <div>
            {this.content()}
          </div>
        }
      </form>
    )
  }
}

FormThirdPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(state => ({
    lang: state.i18nState.lang
  }))(FormThirdPage)
)
