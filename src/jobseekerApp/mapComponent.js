import React, { PureComponent } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"

class MapComponent extends PureComponent {

  constructor(props){
    super(props)

    this.state = {
      center: null
    }
    this.setMapCenter = this.setMapCenter.bind(this)
    this.mapStyles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
    ]


  }

  componentDidMount(){
    if(!this.state.center){
      this.setMapCenter() //THIS FUNCTION DOES setState that is forbidden in render()
    }
  }
  //
  // shouldComponentUpdate(newProps,newState){
  //   if(this.props.routes){
  //       return this.props.routes !== newProps.routes
  //   }else return true
  //
  // }


  setMapCenter(){

    let centerPoint = this.props.allCampaigns.filter((campaign, i)=>{
      return i === 0
    })

    let centerPointFiltered = {}
    centerPointFiltered.lat = parseFloat(centerPoint[0].lat)
    centerPointFiltered.lng = parseFloat(centerPoint[0].lng)

    this.setState({center: centerPointFiltered})


  }

  render(){



    let mappedMarkers = []
    if(!this.props.routes){
      mappedMarkers = this.props.allCampaigns.map((venue, i) => {
        let marker = {
          position: {
            lat: parseFloat(venue.lat),
            lng: parseFloat(venue.lng)
          },
          title: venue.campaign_name,


        }
        return (
          <Marker
            key={i}
            {...marker}
          />
        )
      })
    }
    let mappedRoutes = []
    if(this.props.routes === {} || this.props.routes){

      mappedRoutes = this.props.routes.map((venue, i) => {

        return (
          <DirectionsRenderer key={i} directions={venue} />
        )
      })
    }
    return(
      <div>
        {this.state.center &&
        <GoogleMap

          defaultZoom={this.props.zoom}
          defaultCenter={this.state.center}
          onMarkerClick={_.noop}
          options={
            {
              styles:this.mapStyles,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: false
            }
          }>
          {mappedRoutes}
          {this.props.allCampaigns && mappedMarkers}
        </GoogleMap>
      }
      </div>
    )
  }
}

export default withGoogleMap(MapComponent)
