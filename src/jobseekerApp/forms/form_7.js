import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { CAN_START_TOMORR,
         CAN_START_DAYAFTER,
         CAN_START_NEXTWEEK,
         CAN_START_INTWOWEEKS
       } from './formValues'
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

class FormSeventhPage extends Component{
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
      position: "relative",
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
          <h4 className='q-availability'>{this.context.t('Your availabilty for new assignment')}</h4>
            <div className='questions-wrapper-page7'>
              <div className='q-txt'>{this.context.t('Are you willing to travel to other places?')}</div>
              <Field name="willing_to_travel" component={RadioButtonGroup}>
                <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
              </Field>
                <span style={{marginRight: "80px",color:'#BDBDBD'}}>{this.context.t('Yes')}</span><span style={{color:'#BDBDBD'}}>{this.context.t('No')}</span>
              <Field name="willing_to_travel" component={RenderError} />
            </div>
            <Divider />
            <Field name="when_to_start_work" component={SelectField}
                  selectedMenuItemStyle={{color: "#00BCD4"}}
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}}
                  hintText={this.context.t("When can you start?")}>
              <MenuItem value={CAN_START_TOMORR} primaryText={this.context.t("I can start from Tomorrow")}/>
              <MenuItem value={CAN_START_DAYAFTER} primaryText={this.context.t("From day after Tomorrow")}/>
              <MenuItem value={CAN_START_NEXTWEEK} primaryText={this.context.t("From next week Monday")}/>
              <MenuItem value={CAN_START_INTWOWEEKS} primaryText={this.context.t("After two weeks i'm free")}/>
            </Field>
            <Field name="when_can_start" component={RenderError} />
            <Divider />
        </div>
        <div className='buttons-wrapper'>
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

FormSeventhPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSeventhPage)
