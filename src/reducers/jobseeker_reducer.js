import {
  ALL_CAMPAIGNS,
  COMPANIES,
  JOBSEEKER_APPLICATION_SUBMITTING_STARTED,
  JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL,
  JOBSEEKER_APPLICATION_SUBMITTING_FAILED,
  QUESTIONS_EXISTS,
  SAVE_TO_VIEW_ADDITIONAL_QUESTIONS,
  ADDITIONAL_QUESTIONS,
  DOES_QUESTIONS_EXIST
} from '../actions/types';

const initialState = {
  //determinedIfAdditionalQuestionsExist: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      console.log(action.payload)
      return { ...state, allCampaigns: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }


    case JOBSEEKER_APPLICATION_SUBMITTING_STARTED:
      return {...state, createCampaignSubmittingStarted: true, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: false}

    case JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: true, createCampaignSubmittingFailed: false}

    case JOBSEEKER_APPLICATION_SUBMITTING_FAILED:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: true}
    case SAVE_TO_VIEW_ADDITIONAL_QUESTIONS:
      return {...state, additionalQuestionsState: action.payload}
    case QUESTIONS_EXISTS:
      return {...state, determinedIfAdditionalQuestionsExist: action.payload}
    case ADDITIONAL_QUESTIONS:
      return {...state, additionalQuestionsToDisplay: action.payload}
    case DOES_QUESTIONS_EXIST:

      const iDsOfAllSelectedCampaigns = action.payload.map(job=>job.campaign_id)

      if(iDsOfAllSelectedCampaigns && iDsOfAllSelectedCampaigns !== []){

        let arrayOfAllAdditionalQuestions = []

        const campaignsWithQuestionsSelected = iDsOfAllSelectedCampaigns.map(id=>state.allCampaigns.find(camp=>id===camp.campaign_id))
                                                                          .filter(camp=>camp.map_q2camp && camp.map_q2camp.length > 0)
        if(campaignsWithQuestionsSelected.length > 0){

          arrayOfAllAdditionalQuestions = campaignsWithQuestionsSelected.map(campaign=>campaign.map_q2camp).reduce((a,b)=> a.concat(b), [])
          return {...state, additionalQuestionsState: arrayOfAllAdditionalQuestions, determineIfAdditionalQuestionsExist: true, additionalQuestionsToDisplay: 'exist'}
        }else {
          return {...state, additionalQuestionsState: [],determineIfAdditionalQuestionsExist: false, additionalQuestionsToDisplay: 'none'}
        }

      }
      break

    default:
      return state;
  }
}
