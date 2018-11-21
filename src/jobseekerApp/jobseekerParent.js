import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormFirstPage from './forms/form_1'
import FormSecondPage from './forms/form_2'
import FormThirdPage from './forms/form_3'
import FormFourthPage from './forms/form_4'
import FormFifthPage from './forms/form_5'
import FormSixthPage from "./forms/form_6"
import FormSeventhPage from "./forms/form_7"
import FormEithPage from "./forms/form_8"
import ExtraQuestionsPage from "./forms/form_9"
import FormLastPage from "./forms/form_9_last"
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { Row, Col } from 'react-flexbox-grid'
import styles from './forms/form_material_styles'
import TopCounter from "./topCounter"
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import { connect } from 'react-redux'
import { fetchAllCampaigns, fetchCompanies, saveToViewAdditionalQuestions,
  determinedIfAdditionalQuestionsExistAction,
  additionalQuestionsToDisplayAction,
  determineIfAdditionalQuestionsExistAction} from '../actions'

import MapComponent from "./mapComponent"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import SlideComponent from './slideComponent'
import {setLanguage} from 'redux-i18n'
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import './forms/forms_css/forms_backgr.css'
import './forms/forms_css/welcome-page.css'
import './forms/forms_css/tutorials.css'
import './forms/forms_css/search_map.css'

import { formValueSelector, change } from 'redux-form'

import Perf from 'react-addons-perf'

import pl_flag from './assets/pl.svg'
import uk_flag from './assets/gb2.svg'



config()

const google = window.google

class JobseekerParent extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateUserMarker = this.updateUserMarker.bind(this)
    this.autocompleteOnChange = this.autocompleteOnChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    this.handleUpdatingMarker = this.handleUpdatingMarker.bind(this)
    this.geoLocator = this.geoLocator.bind(this)
    this.createRoutes = this.createRoutes.bind(this)
    this.setRoutes = this.setRoutes.bind(this)
    this.sliderClick = this.sliderClick.bind(this)
    this.dismissTutorial = this.dismissTutorial.bind(this)
    this.dismissTutorialApply = this.dismissTutorialApply.bind(this)
    this.state = {
      slide: "toLeft",
      page: 1,
      userMarker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      geolocation:false,
      address: "",
      geocodeResults: null,
      loading: false,
      slider: "closed",
      width: '0', height: '0',
      languageSelectionModalOpen: false,
      tutorial_location: true,
      tutorial_apply:true
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.languages = ['pl', 'en']
    this.startLanguageSelection = this.startLanguageSelection.bind(this)

    //this.determineIfAdditionalQuestionsExist = this.determineIfAdditionalQuestionsExist.bind(this)
  }
  startLanguageSelection(languageChosen){
    this.props.dispatch(setLanguage(languageChosen))
    const first_time = localStorage.getItem('first_time');
    if(first_time === null){
      localStorage.setItem('first_time', true)
      this.setState({tutorialIsOpen: true})

    }
    else if(first_time === false){
      return
    }else{
      localStorage.setItem('first_time', true)
    }
  }
  sliderClick(){

    if(this.state.tutorialIsOpen){
      this.setState({tutorialIsOpen: false})
      localStorage.setItem('first_time', false)
    }
    const { slider } = this.state
    this.setState({slider: slider === "closed" ? "open" : "closed"})
  }
  nextPage() {

    if(this.state.tutorialIsOpen){
      this.setState({tutorialIsOpen: false})
      localStorage.setItem('first_time', false)
    }
    this.setState({
      page: this.state.page + 1,
      slide: "toLeft"
    })
  }
  previousPage() {
    this.setState({
      page: this.state.page - 1,
      slide: "toRight"
    })
  }


  componentWillMount(){

    function storageON(){
      try{
        localStorage.setItem('_test', 'data')
      }catch(e){
        alert('You must enable cookies storage in your browser.')
        return false
      }
      return true
    }
    if(storageON()){
      const first_time = localStorage.getItem('first_time');
      if(first_time === null){
        localStorage.setItem('first_time', true)
        this.setState({languageSelectionModalOpen:true})
        this.setState({tutorialIsOpen: true})

      }
      else if(first_time === false){
       this.setState({languageSelectionModalOpen:true})//false
       this.setState({tutorialIsOpen: true})//false
      }else{
        localStorage.setItem('first_time', true)//false
      }

    }

    this.props.fetchAllCampaigns()
    this.props.fetchCompanies()
    this.props.dispatch(setLanguage('en'))
    this.props.dispatch(change('wizard', 'answers_to_extra_questions', []))

  }
  componentDidMount() {
  //   const self = this
  //
  //   if(this.state.userMarker.position.lat === 0){
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //
  //           function(position) {
  //             const lat = position.coords.latitude
  //             const lng = position.coords.longitude
  //
  //             self.setState({
  //               userMarker:{
  //                   position: {
  //                     lat,lng
  //                   }
  //                 },
  //               geolocation:true
  //             })
  //           },
  //           function(error){
  //             if(error.code === 1){
  //                self.setState({geolocation:false})
  //               //alert('For best job search experience, allow Location Service in your device. Go to your device settings to enable location.')
  //             }else{
  //               console.log(error.code + ' ' + error.message);
  //             }
  //           },
  //           {
  //             enableHighAccuracy:true,
  //             timeout:10000,
  //             maximumAge: 60000
  //           }
  //       )
  //     } else {
  //       /* geolocation IS NOT available */
  //         alert('Your browser does not support geolocation, please tell us your location in the map field provided.')
  //     }
  //
  //
  // }

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);



  }


  updateUserMarker(newMarker={}){
    let self = this;
    this.setState({
      userMarker: newMarker
    })

    self.createRoutes()
  }

  shouldComponentUpdate(newProps,newState){


      return this.state.routes !== 0//this.state.userMarker.position.lat //0.45656566 !== 0 => true => re-render



  }

  // componentWillUpdate(){
  //   Perf.start()
  // }

  componentDidUpdate(prevProps,prevState){//same as willupdate
    //let self = this;

    // if(this.props.allCampaigns && this.props.allCampaigns.length > 0 && this.state.userMarker.position.lat === 0){
    //
    //   navigator.geolocation.getCurrentPosition(
    //
    //       function(position) {
    //         const lat = position.coords.latitude
    //         const lng = position.coords.longitude
    //
    //         self.setState({
    //           userMarker:{
    //               position: {
    //                 lat,lng
    //               }
    //             }
    //         })
    //       },
    //       function(error){
    //         if(error.code === 1){
    //           alert('Please allow geaolocation for best job search experience' + self.state.userMarker.position.lat)
    //         }else{
    //           console.log(error.code + ' ' + error.message);
    //         }
    //
    //       }
    //
    //   )
    // }else
    if(this.state.userMarker.position.lat !== 0 && prevState.userMarker.position.lat !== this.state.userMarker.position.lat){//break condition - stop rendering
      console.log('RE-RENDER ' + JSON.stringify(this.state.userMarker.position.lat));
      this.createRoutes()
    }

    console.log('RE-RENDERED');
    console.log(this.state);

    // Perf.stop()
    // Perf.printOperations()

  }


  componentWillReceiveProps(newProps){
     //console.log(newState);
     if(newProps.jobs_selected && newProps.jobs_selected !== this.props.jobs_selected){//break condition
       this.props.determineIfAdditionalQuestionsExistAction(newProps.jobs_selected)
     }


  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  onChangeLang = (e) => {
    this.props.dispatch(setLanguage(e.target.value))
  }
  autocompleteOnChange(address){
    this.setState({ address })
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })
    //this.refs.thingToBlur.focus()
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {

        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
        console.log(lat + ' ' +lng);
        this.handleUpdatingMarker(lat, lng)
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })

        this.handleUpdatingMarker(0, 0)
      })
  }
  handleUpdatingMarker(lat, lng){
    let newMarker = {
      position: {
        lat, lng
      }
    }
    this.updateUserMarker(newMarker)
    this.createRoutes()
  }
  renderGeocodeSuccess(lat, lng) {}
  renderGeocodeFailure(err) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{backgroundColor: "white"}}
      >
        {this.context.t('Not found.')}
      </div>
    )
  }
  createRoutes(){
  //  for(let i = 0; i < this.props.allCampaigns.length; i++){

    if(this.props.allCampaigns && this.props.allCampaigns.length > 0){

      let routesArray = []
      const lengthToMap = this.props.allCampaigns.length
      let routesMappedAlready = 0
      this.props.allCampaigns.forEach((venue, i) => {

        const RoutesService = new google.maps.DirectionsService();
        RoutesService.route({
          origin: this.state.userMarker.position,
          destination: {lat: parseFloat(venue.lat), lng: parseFloat(venue.lng)},
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if(this.state.userMarker.position.lat !== 0 && status === google.maps.DirectionsStatus.OK){
            routesArray.push(result)
          }
          routesMappedAlready++
          if(routesMappedAlready === lengthToMap){
            this.setRoutes(routesArray)
          }
        })
      })

      // const routesArray = this.props.allCampaigns.map((venue, i) => {
      //
      //   const RoutesService = new google.maps.DirectionsService();
      //   RoutesService.route({
      //     origin: this.state.userMarker.position,
      //     destination: {lat: parseFloat(venue.lat), lng: parseFloat(venue.lng)},
      //     travelMode: google.maps.TravelMode.DRIVING,
      //   }, (result, status) => {
      //     if (status === google.maps.DirectionsStatus.OK) {
      //     //  console.log('from google.DirectionsService');
      //     //  console.log(result);
      //       // this.setState({
      //       //   directions: result
      //       // })
      //       return result
      //     } else {
      //       console.error(`error fetching directions ${result}`);
      //     }
      //
      //   })
      //
      // })//map routesArray
      //
      // this.setState({
      //   routes: routesArray
      // })


    }
  }

  setRoutes(routesArray){

    if(routesArray.length >= 1){
      this.setState({
        routes: routesArray,
      })
    }
  }

  geoLocator(){
    const self = this

    if(this.state.userMarker.position.lat === 0){
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(

            function(position) {
              const lat = position.coords.latitude
              const lng = position.coords.longitude

              self.setState({
                userMarker:{
                    position: {
                      lat,lng
                    }
                  },
                geolocation:true
              })
            },
            function(error){
              if(error.code === 1){
                 self.setState({geolocation:false})
                //alert('For best job search experience, allow Location Service in your device. Go to your device settings to enable location.')
              }else{
                console.log(error.code + ' ' + error.message);
              }
            },
            {
              enableHighAccuracy:true,
              timeout:10000,
              maximumAge: 60000
            }
        )
      } else {
        /* geolocation IS NOT available */
          alert('Your browser does not support geolocation, please tell us your location in the map field provided.')
      }
    }
  }

  // determineIfAdditionalQuestionsExist(jobs_selected){
  // //  if(this.props.jobs_selected && !this.props.jobs_selected.length == 0){
  //     let iDsOfAllSelectedCampaigns = []
  //     // this.props.jobs_selected.map((job)=>{
  //     //   iDsOfAllSelectedCampaigns.push(job.campaign_id)
  //     // })
  //     jobs_selected.forEach((job)=>{
  //       iDsOfAllSelectedCampaigns.push(job.campaign_id)
  //     })
  //     let copyOfAllCampaigns = [...this.props.allCampaigns]
  //     let campaignsHeSelected = []
  //     if(iDsOfAllSelectedCampaigns !== []){
  //       iDsOfAllSelectedCampaigns.forEach((id)=>{
  //         copyOfAllCampaigns.forEach((campaign)=>{
  //           if(id === campaign.campaign_id){
  //             campaignsHeSelected.push(campaign)
  //           }
  //         })
  //       })
  //     }
  //
  //   let arrayOfCampaignsHeChoseThatHaveAdditionalQuestions = []
  //   campaignsHeSelected.((singleCampaignHeSelected)=>{
  //     if(singleCampaignHeSelected.map_q2camp && singleCampaignHeSelected.map_q2camp.length > 0){
  //       arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.push(singleCampaignHeSelected)
  //     }
  //   })
  //   let arrayOfAllAdditionalQuestions = []
  //   if(arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.length > 0){
  //     arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.map((campaignWithAdditionalQuestions)=>{
  //       arrayOfAllAdditionalQuestions.push(campaignWithAdditionalQuestions.map_q2camp)
  //     })
  //
  //     const concatOfAllAdditionalQuestions = arrayOfAllAdditionalQuestions.reduce((a,b)=> a.concat(b), [])
  //
  //     this.props.saveToViewAdditionalQuestions(concatOfAllAdditionalQuestions)
  //     this.props.determinedIfAdditionalQuestionsExistAction(true)
  //     this.props.additionalQuestionsToDisplayAction('exist')
  //
  //     // this.setState({
  //     //   determinedIfAdditionalQuestionsExist: true,
  //     //   additionalQuestionsToDisplay: 'exist'
  //     // })
  //   }
  //   else{
  //   //  this.props.determinedIfAdditionalQuestionsExist()
  //     this.props.saveToViewAdditionalQuestions([])
  //     this.props.determinedIfAdditionalQuestionsExistAction(false)
  //     this.props.additionalQuestionsToDisplayAction('none')
  //     // this.setState({
  //     //   determinedIfAdditionalQuestionsExist: true,
  //     //   additionalQuestionsToDisplay: 'none'
  //     // })
  //   }
  // //}
  //
  // }

  dismissTutorial(){
    this.setState({tutorial_location:false})
  }
  dismissTutorialApply(){
    this.setState({tutorial_apply:false})
  }
  render() {
    let footerStyle = {}
    if(this.state.width > 900){
      footerStyle = {
        textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        paddingBottom: "2px",
        minHeight: "40px",
        width: "100%",
        borderTop: "1px solid",
        borderColor: "#001d45",
        backgroundColor: "#001d45",
        zIndex: "20",
        overflow: "hidden"
      }
    }
    else{
      footerStyle = {}
    }
    let slideComponentStyle = {}
    if(this.state.width > 900){
      if(this.state.slider !== "closed"){
        this.setState({slider: 'closed'})
      }
      if(this.state.slider === "closed"){
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: this.state.height,
          backgroundColor: "#001d45",
          borderTop: "1px solid #CCCCCC",
          width: this.state.width / 100 * 40,
          left: this.state.width / 100 * 60,
          top: '0px',
          borderLeft: '1px solid #CCCCCC',
        }
      }
    }
    else{
      if(this.state.slider === "closed"){
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: "50px",
          backgroundColor: "white",
          borderTop: "1px solid #CCCCCC",
          width: this.state.width,
          top: this.state.height - 51
        }
      }
      else{
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: this.state.height,
          backgroundColor: "#001d45",
          width: this.state.width,
          top: "0px"
        }
      }
    }
    let openIconStyle = {}
    if(this.state.slider === "closed"){
      openIconStyle = {
        transition: "all .4s ease-in-out",
        width: "50px",
        marginLeft: "55%"
      }
    }
    else{
      openIconStyle = {
        transition: "all .4s ease-in-out",
        width: "50px",
        marginLeft: "65%",
        transform: "rotate(180deg)"
      }
    }
    let mapComponentStyle = {}
    if(this.state.width > 900){
      mapComponentStyle = {
        float: "left",
        width: "60%",
        position: "fixed",
        height: this.state.height - 50,

      }


    }
    else{
      mapComponentStyle = {
        float: "left",
        width: this.state.width,
        position: "fixed",
        height: this.state.height - 50,

      }

    }
    const mapHeight = {height:'100%'}
    let placesAutocompleteStyle
    if(this.state.width > 900){
      placesAutocompleteStyle = {
        input: { padding: "6px", width: this.state.width / 100 * 30, height: '30px',
        fontSize: '20px', boxShadow: '5px 5px 5px #888888'},
        autocompleteContainer: {
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }
    }
    else{
      placesAutocompleteStyle = {
        input: { padding: "6px", width: "calc(100vw - 24px)", height: '30px', fontSize: '20px', boxShadow: '5px 5px 5px #888888'},
        autocompleteContainer: {
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }
    }
    let inputStyling = {}
    let mapLoadingCircleStyle = {}
    let customModalStyle = {}
    let tutorialOneStyle = {}
    let tutorialTwoStyle = {}

    if(this.state.width > 900){
      inputStyling = {
        position: "fixed",
        top: "20%",
        margin: 'auto',
        width: '60%'
        //marginLeft: this.state.width / 100 * 4,

      }
      mapLoadingCircleStyle = {
        paddingTop: 'calc(50% - 140px)'
      }

      tutorialOneStyle = {
        top: '135px',
        left: '4%',
        zIndex: 1,
        position: 'absolute',
        width: "40%",
        height: "100px",
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }

      tutorialTwoStyle = {
        bottom: '95px',
        right: '41%',
        zIndex: 1,
        position: 'absolute',
        width: "50%",
        height: "100px",
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
      customModalStyle = {
        backgroundColor:'yellow'
      }
    }
    else{
      tutorialOneStyle = {
        top: '170px',
        right: '10px',
        zIndex: 1,
        position: 'absolute',
        width: "80%",
        height: "100px",
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
      tutorialTwoStyle = {
        bottom: '60px',
        left: '10px',
        zIndex: 1,
        position: 'absolute',
        width: "80%",
        height: "100px",
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
      inputStyling = {
        position: "fixed",
        top: "50px",
        marginLeft: "4px"
      }
      mapLoadingCircleStyle = {
        paddingTop: 'calc(50% - 40px)'
      }
    }
    const inputProps = {
      value: this.state.address,
      onChange: this.autocompleteOnChange,
      placeholder: this.context.t('Search with postcode or address')
    }
    const modalOpacity = {
      backgroundColor:'#8D6E63',
      zIndex:'21',
      opacity: '0.6'
    }

    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div className='main-background' style={{position: "relative", width: this.state.width - 1,
        height: this.state.height - 1, overflow: "hidden"}}>
            {page === 1 &&
              <div>
                <Dialog
                  modal={true}
                  overlayStyle={modalOpacity}
                  bodyClassName='modal-wrapper'
                  open={this.state.languageSelectionModalOpen}
                >
                  <div className='location-disclaimer'>
                    <p className='location-disc-txt'>
                      EN: For best job search experience, allow Location Service in your device. <br/>
                      PL: Zezwol na lokalizacje Twojego urzadzenia aby automatycznie wyswietlac najblizsze Ciebie oferty.
                    </p>
                  </div>
                  <div className='text-wrapper'><b>Select your language</b></div>

                  <IconButton tooltip="POLISH" touch={true} tooltipPosition="top-center" className='pl-flag-wrapper'
                    onClick={()=>{
                      this.setState({languageSelectionModalOpen: false})
                      this.startLanguageSelection('pl')
                    }}
                  ><img className='flag' src={pl_flag} alt='PL Flag'/>
                  </IconButton>
                  <IconButton tooltip="ENGLISH" touch={true} tooltipPosition="top-center" className='uk-flag-wrapper'
                    onClick={()=>{
                      this.setState({languageSelectionModalOpen: false})
                      this.startLanguageSelection('en')
                    }}
                  >  <img className='flag' src={uk_flag} alt='UK Flag'/>
                  </IconButton>
                  <div className='text-wrapper'><b>Wybierz swoj jezyk</b></div>
                  <div className='cookies-disclaimer'><p className='cookies-disc-txt'>This application is using cookies to store some data in your browser.
                    By selecting your preferred language you also agree to store application data in your browser memory. Copyright 2017 Bitrec Ltd</p></div>
                </Dialog>
                {this.state.tutorialIsOpen &&
                  <div>
                    {this.state.tutorial_location &&
                      <div className="location-bubble tri-right round border right-top">
                        <IconButton tooltip="DismissHelp" touch={true} tooltipPosition="top-right" onClick={this.dismissTutorial}>
                          <FontIcon className="material-icons dismiss-icon">highlight_off</FontIcon>
                        </IconButton>
                        <div className="talktext">
                          <p>{this.context.t('This will show you directions to nearest job we offer. Simply type in your address or postal code.')}</p>
                        </div>
                      </div>
                    }
                    {this.state.tutorial_apply &&
                      <div className="apply-bubble tri-right border round btm-left-in">
                        <IconButton tooltip="DismissHelp" touch={true} tooltipPosition="top-right" onClick={this.dismissTutorialApply}>
                          <FontIcon className="material-icons dismiss-icon">highlight_off</FontIcon>
                        </IconButton>
                        <div className="talktext">
                          {this.state.width > 900 ?
                          <p>{this.context.t('Once you decided which job to apply for, from the right menu. Press Apply button to start the application process.')}</p>
                          :
                          <p>{this.context.t('Once you found your location on the map, browse available jobs from the Job Search Tab. You can open and close it.')}</p>
                          }
                        </div>
                      </div>
                    }
                  </div>
                }
                <div style={mapComponentStyle}>
                {!this.props.allCampaigns ?
                  <div style={mapLoadingCircleStyle}>
                      <CircularProgress color="black" size={80}  thickness={7}/>
                  </div>
                  :
                  <MapComponent
                    zoom={10}
                    containerElement={<div style={mapHeight} />}
                    mapElement={<div style={mapHeight} />}
                    allCampaigns={this.props.allCampaigns}
                    routes={this.state.routes}
                  />
                }
                </div>

                <div style={inputStyling}>
                  <div style={{zIndex: '9'}}>
                    <div style={{display: 'inline-block', float: 'right', zIndex: '9'}}>
                      <select value={this.props.lang} onChange={this.onChangeLang}>
                        {this.languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                    </div>
                  </div>
                  {!this.state.geolocation ?
                  <div className='autolocator-wrapper' onClick={this.geoLocator}>
                    <FontIcon className="material-icons gps-icon safari-gps-icon" >gps_fixed</FontIcon>
                    <p className='mapsearch-locator safari-locator'>Find job near you. Use auto-location</p>
                  </div> :null }
                  <PlacesAutocomplete
                    onSelect={this.handleSelect}
                    styles={placesAutocompleteStyle}
                    inputProps={inputProps}
                    onEnterKeyDown={this.handleSelect}
                  />


                  {this.state.loading ? <div style={{backgroundColor: "white"}}>{this.context.t('Loading...')}</div> : null}
                  {!this.state.loading && this.state.geocodeResults ?
                    <div className='geocoding-results'>{this.state.geocodeResults}</div> : null}

                </div>
                <div style={slideComponentStyle}>
                  <SlideComponent
                    nextPage={this.nextPage}
                    screenWidth={this.state.width}
                    sliderClick={this.sliderClick}
                    openIconStyle={openIconStyle}
                    userMarker={this.state.userMarker}
                    width={this.state.width}
                    height={this.state.height}
                   />
                </div>
              </div>
            }
            {page > 1 &&
              <TopCounter
                finishedStep={this.state.page}
              />}
          <Row center="xs">
            <Col xs={12} sm={12} md={2} lg={8}>
              {page === 1 && this.state.width > 900 &&
                <div style={footerStyle}>
                  <RaisedButton primary={true}
                  style={styles.raisedButtonStyle}
                  label={this.context.t("APPLY")}
                  onClick={this.nextPage}
                  />
                </div>
              }
              <Animation
                transitionName={this.state.slide}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={500}
              >

                {/* {this.props.jobs_selected && this.props.jobs_selected.length > 0
                    && page === 2 &&
                    <FormLastPage
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                      width={this.state.width}
                    />
                  } */}

                {page === 2 &&
                  <FormFirstPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}

                {page === 3 &&
                  <FormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />
                }
                {page === 4 &&
                  <FormThirdPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 5 &&
                  <FormFourthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 66 &&
                  <FormFifthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 6 &&
                  <FormSixthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 7 &&
                  <FormSeventhPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 8 &&
                  <FormEithPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
              {/* {this.props.jobs_selected && this.props.jobs_selected.length > 0 && page === 9 && */}
              {page === 9 &&
                <div>
                  <div>
                    {!this.props.determinedIfAdditionalQuestionsExist && this.props.additionalQuestionsToDisplay === 'none'

                     ?
                      <FormLastPage
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                        width={this.state.width}
                      />
                      :
                      <FormLastPage
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                        width={this.state.width}
                      />
                      // <ExtraQuestionsPage
                      //   previousPage={this.previousPage}
                      //   onSubmit={this.nextPage}
                      //   width={this.state.width}
                      // />

                    }

                  </div>
                </div>

              }

              {this.props.jobs_selected && this.props.jobs_selected.length > 0 && this.props.additionalQuestionsToDisplay === 'exist' && page === 10 &&
                <FormLastPage
                  previousPage={this.previousPage}
                  onSubmit={onSubmit}
                  width={this.state.width}
                />
              }

            </Animation>
          </Col>
        </Row>
      </div>
    )
  }
}

// JobseekerParent.propTypes = {
//   onSubmit: PropTypes.func.isRequired
// }


JobseekerParent.contextTypes = {
  t: PropTypes.func.isRequired
}



const selector2 = formValueSelector('wizard')
JobseekerParent = connect(
  state => {
    const jobs_selected = selector2(state, 'jobs_selected')
    return {
      jobs_selected
    }
  }
)(JobseekerParent)



function mapStateToProps(state) {
  return {
    allCampaigns: state.jobseeker.allCampaigns,
    additionalQuestionsState: state.jobseeker.additionalQuestionsState,
    determinedIfAdditionalQuestionsExist: state.jobseeker.determinedIfAdditionalQuestionsExist,
    additionalQuestionsToDisplay: state.jobseeker.additionalQuestionsToDisplay

  };
}

export default connect(mapStateToProps, { fetchAllCampaigns, fetchCompanies, saveToViewAdditionalQuestions,
  determinedIfAdditionalQuestionsExistAction,
  additionalQuestionsToDisplayAction,
  determineIfAdditionalQuestionsExistAction })(
  connect(state => ({
    lang: state.i18nState.lang
  }))(JobseekerParent)
)
