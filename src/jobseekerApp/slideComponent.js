import React, { Component } from 'react'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton'
import styles from './forms/form_material_styles'
import { config } from "dotenv"
import JobCards from "./jobCards"
import {connect} from 'react-redux'

import './forms/forms_css/search_map.css'


config()

class SlideElement extends Component {
 render() {
   const footerStyle = {
     backgroundColor: 'white',
     position: "absolute",
     left: "0",
     top: this.props.height - 60,
     paddingBottom: "32px",
     width: "100%",
     borderTop: "1px solid",
     borderColor: "#DCDCDC ",
     zIndex: "20",
     overflow: "hidden",
     height: "60px"
   }

   return (
     <div style={{position: "relative"}}>
       {this.props.screenWidth <= 900 &&
         <div onClick={this.props.sliderClick} style={{height: '50px', borderBottom: "1px solid #CCCCCC "}}>
           <div style={{position: "relative", width: "400px", margin: "0 auto"}}>
             <div className='search-title safari-search-title'>
               <b>{this.context.t('JOB OFFERS')}</b>
             </div>
             <div style={this.props.openIconStyle} >
               <div >
                 <svg xmlns="http://www.w3.org/2000/svg" className='safari-search-arrow-icon' style={{marginLeft: "0px", marginTop: "5px", width: "40px", height: "40px"}} width="48" height="48" viewBox="0 0 58 58"><path d="M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z"/></svg>
               </div>
             </div>
           </div>
         </div>
       }
       <div style={{margin: "10px", marginTop: "0px", height: "calc(100vh - 80px)", overflowY: "scroll", backgroundColor:"#001d45"}}>
         <h3 style={{color:'white'}}>{this.context.t('WELCOME TO BITREC JOB SEARCH')}</h3>
         <h4 style={{color:'white'}}>{this.context.t('Click the job you like, to browse for details')}<br/>
             {this.context.t('Select one or maximum of three jobs to apply')}</h4>
         <p style={{fontSize:'12px', color:'white'}}>{this.context.t("You don't have to select any job to leave your application, just click Apply")}</p>
         <div style={{width: '100%'}}>
           <JobCards userMarker={this.props.userMarker} screenWidth={this.props.screenWidth} width={this.props.width}/>
         </div>
       </div>


       {this.props.screenWidth <= 900 &&
         <div style={footerStyle}>
           <RaisedButton primary={true}
           onClick={this.props.nextPage}
           style={{...styles.raisedButtonStyle, marginTop: "10px"}}
           label={this.context.t("APPLY")} />
         </div>
       }
     </div>
   )
 }
}


SlideElement.contextTypes = {
 t: PropTypes.func.isRequired
}

export default connect(state => ({
   lang: state.i18nState.lang
 }))(SlideElement)
