import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import styles from './form_material_styles'
import { first_name, last_name } from './formValues'
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from "redux-form-material-ui"
import {countries} from './countries'
import './forms_css/form_buttons.css'
import './forms_css/forms_main.css'

import FontIcon from 'material-ui/FontIcon';


const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class FormFirstPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      helpBoxOpen: false
    }
  }

  content(){
    const { previousPage } = this.props

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

    const upperFirst = value => value && _.upperFirst(value)

    return(
      <div >
        <div className='main-wrapper'>
            <h4 className='q-personal'>{this.context.t('Personal details')}</h4>
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
                <p className='info-txt'>{this.context.t('The information you supply will be used by the Bitrec Ltd for recruitment&administrative purposes within the terms of the Data Protection Act 1998. We shall not supply it to third parties.')}
                </p>
              </div>
            </div>
            <div style={{width: '100%'}}>

              <Field
                name={first_name}
                type="text"
                component={renderField}
                label={this.context.t('First Name')}
                normalize={upperFirst}
              />

              <Field
                name={last_name}
                type="text"
                component={renderField}
                label={this.context.t('Last Name')}
                normalize={upperFirst}
              />

              <Field name="nationality" component={SelectField}
                hintText="Select your nationality"
                labelStyle={{color: "#4b1248"}}
                underlineStyle={{display: "none"}}
                errorStyle={{display: "none"}}>
              {countries.map((country,index) => <MenuItem key={index} value={country} primaryText={country}/>)}
              </Field>
              <Field name="nationality" component={renderError} />
              <Divider />

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

FormFirstPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)
