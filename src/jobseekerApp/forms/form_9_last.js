import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm, hasSubmitFailed, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import submit from "./submit"
import { Checkbox } from "material-ui"
import _ from 'lodash'
import RemoteSubmitButton from './RemoteSubmitButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import './forms_css/last_page.css'
import './forms_css/form_buttons.css'

class TickBox extends Component{
  handleCheckbox(){
    const { input: { value, onChange } } = this.props
    if(value === "Ticked"){
      onChange(null)
      return
    }
    else{
      onChange("Ticked")
    }
  }
  render(){
    //const { input: { value, onChange } } = this.props
    const { input: { value } } = this.props
    const { meta: { dirty, touched, error }} = this.props

    let errorCopy = ''

    if(error === 'Required'){
      errorCopy = this.context.t('Required')
    }

    return(
      <div style={{marginTop: "10px"}}>
        <div style={{width: "50px", margin: "0 auto"}}>
          <Checkbox
            checked={value !== "Ticked" ? false : true}
            disableTouchRipple
            onCheck={this.handleCheckbox.bind(this)}
          />
        </div>
        <div style={{color: "red", marginTop: "3px"}}>
          {(dirty || touched) ? <span>{errorCopy}</span> : ""}
        </div>
      </div>
    )
  }
}

TickBox.contextTypes = {
  t: PropTypes.func.isRequired
}

class FormLastPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      submittingDialogOpen: false,
    }
  }

  handleDialogContent(){
    if(this.props.createCampaignSubmittingStarted){
      return(
        <div style={{height: '100px'}}>
          <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
            Submitting...
          </div>
          <div style={{width: '49%', display: 'inline-block'}}>
            <CircularProgress size={80}  thickness={7}/>
          </div>
        </div>
      )
    }
    else if(this.props.createCampaignSubmittingSuccessful){
      return(
        <div style={{height: '100px'}}>
          <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
            Submit successful
          </div>
          <div style={{width: '49%', display: 'inline-block', marginTop: '-10px'}}>
            <FontIcon style={{fontSize: '100px', color: 'green'}} className="material-icons">done</FontIcon>
          </div>
        </div>
      )
    }
    else if(this.props.createCampaignSubmittingFailed){
      return(
        <div style={{height: '100px', fontSize: '20px', marginTop: '34px', verticalAlign:"top", }}>
          <div>Submit failed. Please try again</div>
          <FlatButton
            label="Try again"
            onClick={()=> window.location.replace('/')}
          />
        </div>
      )
    }
  }


  displayAllFormValues(){
    if(this.props.all_values){

      let all_values_copy = {...this.props.all_values}

      delete all_values_copy.first_name
      delete all_values_copy.last_name
      delete all_values_copy.age
      delete all_values_copy.nationality
      delete all_values_copy.gender
      delete all_values_copy.contact_no
      delete all_values_copy.email_id
      delete all_values_copy.postal_code
      delete all_values_copy.tickBox1
      delete all_values_copy.tickBox2
      delete all_values_copy.jobs_selected
      delete all_values_copy.emailCopy
      delete all_values_copy.CV
      delete all_values_copy.answers_to_extra_questions
      delete all_values_copy.numberOfCustomQuestionsJobseekerHasToAnswer


      let pairToReturn = {}
      console.log(all_values_copy);

      return _.map(all_values_copy, function(value, key) {

        if(all_values_copy.answers_to_extra_questions){
        //  console.log(all_values_copy.answers_to_extra_questions);
          console.log(value + ' '+ key);
        }


        if(key === 'first_work_in_uk'){
          pairToReturn = {
            key: 'First work in uk',
            value: value
          }
        }

        else if(key === 'self_employed'){
          pairToReturn = {
            key: 'Self employed',
            value: value
          }
        }
        else if(key === 'willing_to_travel'){
          pairToReturn = {
            key: 'Willing to travel',
            value: value
          }
        }
        // else{
        //   pairToReturn = {
        //     key: key,
        //     value: value
        //   }
        // }

        if(key === 'when_to_start_work'){
          pairToReturn.key = 'When to start work'
        }

        if(value === 'CAN_START_TOMORR'){
          pairToReturn.value = 'Can start tomorrow'
        }
        else if(value === 'CAN_START_DAYAFTER'){
          pairToReturn.value = 'Can start day after'
        }
        else if(value === 'CAN_START_NEXTWEEK'){
          pairToReturn.value = 'Can start next week'
        }
        else if(value === 'CAN_START_INTWOWEEKS'){
          pairToReturn.value = 'Can start in two weeks'
        }


        return <div className='question'><span className='question-text'>{pairToReturn.key}</span>
        {": "}<span className='question-answer'>{pairToReturn.value}</span></div>
      });
    }
  }

  content(){
    const { previousPage } = this.props
    return(
      <div>
      <Divider />
      <h3 className='title-check'>{this.context.t("Check your entries")}</h3>
      <div className='mobile-page-scroll'>
        <div className='personal-wrapper'>

          <div className="icon"><FontIcon className="material-icons iconstyle-circle-human">account_circle</FontIcon></div>

          <div className="personal-details">

              <h2>{this.props.all_values.first_name+ ' ' +this.props.all_values.last_name}</h2>
              <h5>{this.props.all_values.gender}</h5>
              <h5>{this.props.all_values.age}</h5>
              <h5>{this.props.all_values.nationality}</h5>


          </div>

        </div>
        <div className='personal-wrapper'>
          <div className="icon-single-line"><FontIcon fontSize='small'className="material-icons iconstyle">place</FontIcon></div>
          <div className="personal-details">
            <h5>{this.props.all_values.postal_code}</h5>
          </div>
        </div>
        <div className='personal-wrapper'>
          <div className="icon"><FontIcon className="material-icons iconstyle">call</FontIcon></div>

          <div className="personal-details">
            <h2>{this.props.all_values.contact_no}</h2>
            <h5 className='add-number-later'>{this.props.all_values.landline_no || 'You can add additional numbers later'}</h5>

          </div>
        </div>
        <div className='personal-wrapper'>
          <div className="icon-single-line"><FontIcon className="material-icons iconstyle">email</FontIcon></div>
          <div className="personal-details">
            <h5>{this.props.all_values.email_id}</h5>
          </div>
        </div>
        <Divider />
        <div className='questions-wrapper'>
          <h3 className='title-check-answers'>{this.context.t("Check your answers")}</h3>
          {this.displayAllFormValues()}
        </div>
      </div>

        <div>
          <Divider />
          <div style={{width: '10%', display: 'inline-block'}}>
            <Field
                name="tickBox1"
                type="text"
                component={TickBox}
                label="tickBox1"
              />
          </div>
          <div style={{width: '80%', display: 'inline-block', fontSize:'12px'}}>
            {this.context.t('I confirm all the details above are correct and true to the best of my ability')}
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <div style={{width: '10%', display: 'inline-block'}}>
            <Field
                name="tickBox2"
                type="text"
                component={TickBox}
                label="tickBox2"
              />
          </div>
          <div style={{width: '80%', display: 'inline-block', fontSize:'12px'}}>
          {this.context.t('I agree for my information to be processed for recruitment purposes only')}
          </div>
        </div>

        <div style={{width: '100%', bottom: 0, contentAlign: 'center'}}>
          <RaisedButton
            type="button"
            label={this.context.t("Prev")}
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RemoteSubmitButton />
        </div>
      </div>
    )
  }

  componentWillMount(){

        if(!this.state.submittingDialogOpen){
          if(this.props.createCampaignSubmittingStarted ||
             this.props.createCampaignSubmittingSuccessful ||
             this.props.createCampaignSubmittingFailed){
            this.setState({submittingDialogOpen: true})
          }
        }
  }

  render(){


    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>

        <Dialog
          modal={true}
          open={this.state.submittingDialogOpen}
        >
          {this.handleDialogContent()}
        </Dialog>

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

FormLastPage.contextTypes = {
  t: PropTypes.func.isRequired
}

FormLastPage = connect(
  state => ({
    submitFailed: hasSubmitFailed('wizard')(state)
  })
)(FormLastPage)


FormLastPage = connect(
  state => {
    let all_values = state.form.wizard.values
    return {
      all_values
    }
  }
)(FormLastPage)

const selector = formValueSelector('wizard')
FormLastPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(FormLastPage)

function mapStateToProps(state){
  return{
    createCampaignSubmittingStarted: state.jobseeker.createCampaignSubmittingStarted,
    createCampaignSubmittingSuccessful: state.jobseeker.createCampaignSubmittingSuccessful,
    createCampaignSubmittingFailed: state.jobseeker.createCampaignSubmittingFailed,

    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  }
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(
  connect(mapStateToProps)(FormLastPage)
)
