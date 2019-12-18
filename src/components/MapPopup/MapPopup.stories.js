import React from 'react';
import MapPopup from './MapPopup';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapLayers from '../../util/mockMapLayers';

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3
});

const popupLayers = [
  {
    layerId: 'states-layer', // id of layer on map
    title: {
      field: 'name'
    }, // popup title field
    attributes: [
      {
        field: 'wikipedia', // original field name
        label: 'Wiki', // desired label
        type: 'link' // text, link, image
      },
      {
        field: 'postal',
        label: 'Postal',
        type: 'text'
      },
      {
        field: 'region',
        label: 'Region',
        type: 'text'
      },
      {
        field: 'name',
        label: 'Image',
        type: 'image',
        expression: function(val) {
          return `https://raw.githubusercontent.com/tannerjt/state_images.json/master/images/${val
            .toLowerCase()
            .replace(' ', '_')}.jpg`;
        }
      }
    ]
  }
];

storiesOf('Popup', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} mapLayers={mapLayers} />
        <MapPopup layers={popupLayers} />
      </ElementsProvider>
    );
  });