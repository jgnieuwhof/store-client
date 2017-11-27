
import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

import { googleMaps as key } from '../app.config'
import { isDevelopment } from '../helpers/app'

const url = [
  `https://maps.googleapis.com/maps/api/js`,
  `?v=3.exp&libraries=geometry,drawing,places`,
  isDevelopment ? `` : `&key=${key}`,
].join(``)

class MyGoogleMap extends Component {
  state = { selectedMarker: null }
  setSelectedMarker = i => this.setState({ selectedMarker: i })
  clearSelectedMarker = () => this.setState({ selectedMarker: null })
  render() {
    let { defaultZoom, defaultCenter, positions } = this.props
    let { selectedMarker } = this.state
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
      >
        { positions.map(({ lat, lng, info }, i) => (
          <Marker key={i}
            position={{ lat, lng }}
            onClick={() => this.setSelectedMarker(i)}
          >
            { info && selectedMarker === i && (
              <InfoWindow onCloseClick={this.clearSelectedMarker}>
                <div className='info-window'>
                  { info }
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='google-maps-container' />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MyGoogleMap)
