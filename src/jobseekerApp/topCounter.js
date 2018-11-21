import React, { Component } from "react"

const circleStyle = {
  display: "inline-block",
  borderRadius: "50%",
  border: "1px solid #bdbdbd",
  width: "35px",
  height: "35px",
  margin: "5px",
  fontSize: "24px",
  boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.4)",
}

const colouredBg = {
  backgroundColor: "#f0c27b"
}

const emptyBg = {
  backgroundColor: "#4b1248"

}

const arrows = {
  display: "inline-block",
  color: "#bdbdbd",
  margin: "-4px"
}
//this margin top could be done with :before center like in wordpress tutorial
const label = {
  "marginTop": "7px",
  color:"#bdbdbd",
  fontSize:'18px'
}
const labelActive = {
  "marginTop": "7px",
  color:"#4b1248",
  fontSize:'18px'
}

class TopCounter extends Component {
  render(){
    const bgColorOne = this.props.finishedStep <= 1 ? emptyBg : colouredBg
    const bgColorTwo = this.props.finishedStep <= 3 ? emptyBg : colouredBg
    const bgColorThree = this.props.finishedStep <= 5 ? emptyBg : colouredBg
    const bgColorFour = this.props.finishedStep <= 7 ? emptyBg : colouredBg
    const bgColorFive = this.props.finishedStep <= 8 ? emptyBg : colouredBg

    const labelOne = this.props.finishedStep <= 1 ? label : labelActive
    const labelTwo = this.props.finishedStep <= 3 ? label : labelActive
    const labelThree = this.props.finishedStep <= 5 ? label : labelActive
    const labelFour = this.props.finishedStep <= 7 ? label : labelActive
    const labelFive = this.props.finishedStep <= 8 ? label : labelActive
    return(
      <div style={{margin: "20px"}}>
        <div style={{...circleStyle, ...bgColorOne}} ><h4 style={{...labelOne}}>1</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorTwo}}><h4 style={{...labelTwo}}>2</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorThree}}><h4 style={{...labelThree}}>3</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorFour}}><h4 style={{...labelFour}}>4</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorFive}}><h4 style={{...labelFive}}>5</h4></div>
        <p style={{color:'#bdbdbd', fontSize:'10px'}}>This form should take you only 5 minutes to complete!</p>
      </div>
    )}
}

export default TopCounter
