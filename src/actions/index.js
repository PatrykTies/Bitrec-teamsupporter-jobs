
import axios from 'axios';

import {
  COMPANIES,
  ALL_CAMPAIGNS,
  QUESTIONS_EXISTS,
  SAVE_TO_VIEW_ADDITIONAL_QUESTIONS,
  ADDITIONAL_QUESTIONS,
  DOES_QUESTIONS_EXIST,

} from './types.js';


const ROOT_URL = 'https://teamsupporter-api.co.uk:8043';

//const ROOT_URL = 'http://localhost:3000';

export function determineIfAdditionalQuestionsExistAction(array_of_jobs_selected){



  return{
    type: DOES_QUESTIONS_EXIST,
    payload: array_of_jobs_selected
  }
}


export function saveToViewAdditionalQuestions(arrayOfAllAdditionalQuestions){
  return{
    type: SAVE_TO_VIEW_ADDITIONAL_QUESTIONS,
    payload: arrayOfAllAdditionalQuestions
  }
}






export function determinedIfAdditionalQuestionsExistAction(bool){
  return{
    type: QUESTIONS_EXISTS,
    payload: bool
  }
}
export function additionalQuestionsToDisplayAction(string){
  return{
    type: ADDITIONAL_QUESTIONS,
    payload: string
  }
}



export function fetchAllCampaigns(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/campaigns/all`)
      .then(response => {
        dispatch({ type: ALL_CAMPAIGNS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}

export function fetchCompanies(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/admin/companies`)
      .then(response => {
        dispatch({ type: COMPANIES, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}
