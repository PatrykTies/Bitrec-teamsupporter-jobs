import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Col } from 'react-flexbox-grid';
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import {ageRanges} from './formValues'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

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

class FormSecondPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      loader: false,
      helpBoxOpen: false
    }
    this.handleLoaderState = this.handleLoaderState.bind(this)
  }
  renderAgeSelector(ageDataSet){
    return ageDataSet.map(val =>{

      let valCopy = ''

      if(val.primaryText === "I'm between 18-20 yrs old"){
        valCopy = this.context.t("I'm between 18-20 yrs old")
      }
      if(val.primaryText === "I'm between 21-24 yrs old"){
        valCopy = this.context.t("I'm between 21-24 yrs old")
      }
      if(val.primaryText ==="I'm between 25-49 yrs old"){
        valCopy = this.context.t("I'm between 25-49 yrs old")
      }
      if(val.primaryText === "I'm between 50-59 yrs old"){
        valCopy = this.context.t("I'm between 50-59 yrs old")
      }
      if(val.primaryText === "I'm between 60+ yrs old"){
        valCopy = this.context.t("I'm between 60+ yrs old")
      }
      return <MenuItem key={val.id} value={val.value} primaryText={valCopy}/>
    })
  }
  renderCountrySelector(countryDataSet){
    return countryDataSet.map(country =>
      <MenuItem value={country} primaryText={country}/>
  )}

  handleLoaderState(){
    this.setState({loader: true}, ()=>{
      setTimeout(()=>{this.setState({loader:false})}, 1000)
    })
  }


  content(){

    const upper = value => value && value.toUpperCase()

    let helpBoxStyle = {transition: "all .2s ease-in-out", overflow: 'hidden'}

    if(this.state.helpBoxOpen){
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
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const genderParentStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative",
    }
    const genderStyle = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px"
    }
    const genderStyle2 = {
      display: "inline-block",
      width: "45px",
      marginLeft: "30px"
    }
    return(
      <div>
        <div className='main-wrapper'>
          <h4 className='q-personal'>{this.context.t('Personal details')}</h4>
          <div className='info-icon-postcode'
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
              <p className='info-txt'>{this.context.t('POSTAL CODE: Although you have given us your location on the map, we need you to repeat your postal code here again.')}
              </p>
            </div>
          </div>

          <div className='gender-section'>
            <div className='gender-title'>{this.context.t('What is your gender?')}</div>
            <div className='radios-wrapper'>
              <Field className='gender-field-wrapper' name="gender" component={RadioButtonGroup}>
                <RadioButton disableTouchRipple style={genderStyle} value="male"/>
                <RadioButton disableTouchRipple style={genderStyle2} value="female"/>
              </Field>
              <div className='male-female-wrapper'>
                <span className='male-span'>{this.context.t('Male')}</span><span className='female-span'>{this.context.t('Female')}</span>
              </div>
              <Field name="gender" component={RenderError} />
            </div>
          </div>
          <div style={{marginBottom: "20px"}}>
            <Field name="age" component={SelectField}
                  selectedMenuItemStyle={{color: "#00BCD4"}}
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}}
                  hintText={this.context.t('Select your age group')} >
                  {this.renderAgeSelector(ageRanges)}
            </Field>
            <Field name="age" component={RenderError} />
            <Divider />
          </div>
        <div className='postal-code-wrapper'>
          <Field c
            lassName='postal-code-input'
            name="postal_code" type="text"
            component={renderField}
            label={this.context.t('Your postal code')}
            normalize={upper}
            >
          </Field>
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
    const { handleSubmit } = this.props
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

FormSecondPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSecondPage)
