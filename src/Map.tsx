import * as React from 'react';

import * as fetch from 'isomorphic-fetch';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import MarkerClusterer from '../node_modules/react-google-maps/lib/components/addons/MarkerClusterer';

interface Props {
  markers: Marker[];
}

interface Marker {
  photo_id: string;
  latitude: number;
  longitude: number;
}

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.setState({ markers: [] });
    },

    componentDidMount() {
      const url = [
        // Length issue
        `https://gist.githubusercontent.com`,
        `/farrrr/dfda7dd7fccfec5474d3`,
        `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
      ].join('');

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ markers: data.photos });
        });
    }
  })
)(props =>
  (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
      <MarkerClusterer
        averageCenter={true}
        enableRetinaIcons={true}
        gridSize={60}
      >
        {(props as Props).markers.map(marker => (
          <Marker
            key={marker.photo_id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  ));

export default MapWithAMarkerClusterer;