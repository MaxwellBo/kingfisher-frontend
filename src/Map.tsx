import * as React from 'react';
import * as firebase from 'firebase';

import * as fetch from 'isomorphic-fetch';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  MarkerClusterer
} from 'react-google-maps';

interface Props {
  sites: Site[];
}

interface Site {
  name: string;
  latitude: number;
  longitude: number;
}

const sitesRef = firebase.database().ref('sites');

// https://tomchentw.github.io/react-google-maps/#markerclusterer
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
      this.setState({ sites: [] });
    },

    componentWillUnmount() {
      sitesRef.off();
    },

    componentDidMount() {
      sitesRef.on('value', (sites) => {

        if (sites) {
          // This is a disaster, sorry ~mbo 15/09/17
          const sitesDict = sites.val();
          const sitesList: Site[] = Object.keys(sitesDict).map(key => {
            return { ...sitesDict[key], name: key };
          }
          );

          this.setState({ sites: sitesList });
        }
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
        {(props as Props).sites.map(site => (
          <Marker
            key={site.name}
            position={{ lat: site.latitude, lng: site.longitude }}
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  ));

export default MapWithAMarkerClusterer;