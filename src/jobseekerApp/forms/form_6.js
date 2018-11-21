import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup } from "redux-form-material-ui"
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import './forms_css/form_buttons.css'
import './forms_css/forms_main.css'


class RenderError extends Component {
  render(){
    let errorCopy = ''
    if(this.props.meta.error === 'Required'){
      errorCopy = this.context.t('Required')
    }
    if(this.props.meta.touched){
      return(
        <div style={{color: "red"}}>{errorCopy}</div>
      )
    }
    else{
      return <div></div>
    }
  }
}

RenderError.contextTypes = {
  t: PropTypes.func.isRequired
}

class FormSixthPage extends Component{
  content(){
    const { previousPage } = this.props
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const radioParentStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative"
    }
    const buttonStyle1 = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px",
    }
    const buttonStyle2 = {
      display: "inline-block",
      width: "45px",
      marginLeft: "27px",
    }
    return(
      <div>
        <div className='main-wrapper'>
          <h4 className='q-weneedtoask'>{this.context.t('Questions we need to ask you')}</h4>
          <div className='questions-wrapper'>
            <div className='q-txt'>{this.context.t('Are you currently a student?')}</div>
            <Field name="student" component={RadioButtonGroup}>
              <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
              <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
            </Field>
            <span style={{marginRight: "80px",color:'#BDBDBD'}}>{this.context.t('Yes')}</span><span style={{color:'#BDBDBD'}}>{this.context.t('No')}</span>
            <Field name="student" component={RenderError} />
          </div>
          <Divider />
          <div className='questions-wrapper'>
            <div className='q-txt'>{this.context.t('Is this your first job in the UK?')}</div>
            <Field className='q-field' name="first_work_in_uk" component={RadioButtonGroup}>
              <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
              <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
            </Field>
            <span style={{marginRight: "80px",color:'#BDBDBD'}}>{this.context.t('Yes')}</span><span style={{color:'#BDBDBD'}}>{this.context.t('No')}</span>
            <Field name="first_work_in_uk" component={RenderError} />
          </div>
          <Divider />
          <div className='questions-wrapper'>
            <div className='q-txt'>{this.context.t('Are you currently self employed?')}</div>
              <Field className='q-field' name="self_employed" component={RadioButtonGroup}>
                <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
              </Field>
              <span style={{marginRight: "80px",color:'#BDBDBD'}}>{this.context.t('Yes')}</span><span style={{color:'#BDBDBD'}}>{this.context.t('No')}</span>
              <Field name="self_employed" component={RenderError} />
          </div>
          <Divider />
        </div>
        <div className='buttons-wrapper-page6'>
            <RaisedButton
              type="button"
              label={this.context.t('Prev')}
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
    const { handleSubmit } = this.props
    return(
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', paddingTop: '10px'}} zDepth={2} rounded={false}>
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

FormSixthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSixthPage)
