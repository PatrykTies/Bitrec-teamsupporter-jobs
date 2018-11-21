import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import submit from "./submit"
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { change } from 'redux-form'
import Divider from 'material-ui/Divider';

import './forms_css/form_buttons.css'
import './forms_css/forms_main.css'





class RenderError extends Component {
  render(){
    let errorCopy = ''
    if(this.props.meta.error === 'Required'){
      errorCopy = this.context.t('Required')
    }
    else if(this.props.meta.error === 'All questions have to be answered'){
      errorCopy = this.context.t('All questions have to be answered')
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










const checkIfAllCustomQuestionsHaveBeenAnswered = values => {

  const errors = {}

  if (values.answers_to_extra_questions.length < values.numberOfCustomQuestionsJobseekerHasToAnswer) {
    errors.answers_to_extra_questions = 'All questions have to be answered'
  }

  return errors

}




class ExtraQuestionsPage extends Component{

  constructor(props){
    super(props)
    this.state = {

    }

    this.content = this.content.bind(this)
    this.handleAnswers = this.handleAnswers.bind(this)

  }
  handleAnswers(e,question){
    let hardCopyOfFormArray = [...this.props.answers_to_extra_questions]

    let hardCopyFiltered = hardCopyOfFormArray.filter((q)=>{return q.q_id !== question.q_id})
    let q_score = null,answer = null

    if(e.target.value === 'yes'){
      q_score = question.apply_questions.q_score
      answer = 1

    }
    else {
      q_score = 0
      answer = 0
    }


    hardCopyFiltered.push({
      q_id: question.q_id,
      campaign_id: question.campaign_id,
      answer: answer,
      score: q_score
    })

    this.props.dispatch(change('wizard', 'answers_to_extra_questions', hardCopyFiltered))
  }

  componentDidMount(){
    {this.props.additionalQuestionsState &&
      this.props.dispatch(change('wizard', 'numberOfCustomQuestionsJobseekerHasToAnswer', this.props.additionalQuestionsState.length))
    }
  }

  content(){
    const { previousPage } = this.props

    //console.log({props: this.props})

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
    const spanYes = {marginRight: "80px",color:'#BDBDBD'}
    const spanNo = {color:'#BDBDBD'}


    return(
      <div>
        <div className='main-wrapper'>

            {this.props.additionalQuestionsState ? (this.props.additionalQuestionsState.map((question,i)=>{

                return (
                  <div key={i} className='question-wrapper'>
                    <div className='q-txt-page9'>{question.apply_questions && question.apply_questions.q_txt}</div>
                    <div>
                      <RadioButtonGroup name="question_id" onChange={(e)=>this.handleAnswers(e,question)} >
                        <RadioButton
                          disableTouchRipple
                          value="yes"
                          style={buttonStyle1}
                        />
                        <RadioButton
                          disableTouchRipple
                          value="no"
                          style={buttonStyle2}
                        />
                      </RadioButtonGroup>
                      <span style={spanYes}>{this.context.t('Yes')}</span><span style={spanNo}>{this.context.t('No')}</span>
                    </div>
                    <Divider/>
                  </div>
                )
              })) : (

                <div className='question-wrapper'>
                  <div className='q-txt-page9'>How are you?</div>
                  <div>
                    <RadioButtonGroup name="question_id" onChange={(e)=>this.handleAnswers(e,'How are you?')} >
                      <RadioButton
                        disableTouchRipple
                        value="yes"
                        style={buttonStyle1}
                      />
                      <RadioButton
                        disableTouchRipple
                        value="no"
                        style={buttonStyle2}
                      />
                    </RadioButtonGroup>
                    <span style={spanYes}>{this.context.t('Yes')}</span><span style={spanNo}>{this.context.t('No')}</span>
                  </div>
                  <Divider/>
                </div>

                )
            }


            <Field name="answers_to_extra_questions" component={RenderError} />


        </div>
        <div className='buttons-wrapper'>
          <RaisedButton
            type="button"
            label={this.context.t("Prev")}
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
          <Paper style={{maxWidth: '700px', margin: '0 auto',
            paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
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

ExtraQuestionsPage.contextTypes = {
  t: PropTypes.func.isRequired
}

const selector = formValueSelector('wizard')
ExtraQuestionsPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(ExtraQuestionsPage)

function mapStateToProps(state) {
  return {
    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  };
}


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate: checkIfAllCustomQuestionsHaveBeenAnswered
})(
  connect(mapStateToProps)(ExtraQuestionsPage)
)




















/*import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, hasSubmitFailed, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import Dropzone from "./dropzone"
import submit from "./submit"
import { Checkbox } from "material-ui"
import DropboxChooser from "react-dropbox-chooser"
import GooglePicker from "react-google-picker"
import _ from 'lodash'
import RemoteSubmitButton from './RemoteSubmitButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { change } from 'redux-form'


class FormNinthPage extends Component{


  content(){
    const { handleSubmit, previousPage } = this.props
    return(
      <div>
        <Row center="xs" style={{height: 460, width: '80%', margin: '0 auto'}}>
          <Col xs={10} sm={10} md={3} lg={5}>

            {this.props.additionalQuestionsState && this.props.additionalQuestionsState.map((question)=>{

                return (
                  <div style={{border: '1px solid', height: '50px', marginBottom: '10px'}}>

                    <div style={{float: 'left', marginTop: '16px', width: 'calc(100% - 151px)'}}>
                      {question.apply_questions && question.apply_questions.q_txt}
                    </div>

                    <div style={{borderLeft: '1px solid grey', height: '100%', float: 'right', width: '150px'}}>

                      <div style={{height: '60%'}}>




                        <RadioButtonGroup name={question.q_id} onChange={(e)=>{

                            let hardCopyOfFormArray = [...this.props.answers_to_extra_questions]

                            let hardCopyFiltered = hardCopyOfFormArray.filter((q)=>{return q.q_id != question.q_id})

                            hardCopyFiltered.push({
                              q_id: question.q_id,
                              answer: e.target.value
                            })

                            this.props.dispatch(change('wizard', 'answers_to_extra_questions', hardCopyFiltered))

                          }}>

                          <RadioButton
                            disableTouchRipple
                            value="yes"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%',
                              display: 'inline-block', width: '40%'}}
                          />
                          <RadioButton
                            disableTouchRipple
                            value="no"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%',
                              display: 'inline-block', width: '40%'}}
                          />
                        </RadioButtonGroup>









                      </div>

                      <div>
                        <div style={{display: 'inline-block', width: '50%'}}>YES</div>
                        <div style={{display: 'inline-block', width: '50%'}}>NO</div>
                      </div>

                    </div>

                  </div>
                )
              })

            }

          </Col>
        </Row>
        <div style={{width: '100%', position: 'absolute', bottom: 0, contentAlign: 'center'}}>
          <RaisedButton
            type="button"
            label={this.context.t("Prev")}
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
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto',
            paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
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

FormNinthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

const selector = formValueSelector('wizard')
FormNinthPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(FormNinthPage)

function mapStateToProps(state) {
  return {
    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  };
}


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(
  connect(mapStateToProps)(FormNinthPage)
)*/
