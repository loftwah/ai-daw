import React from 'react';
import './TrackParts.css';
import Region from './Region';

import * as utils from '../CoolHelpers';

export default function TrackDisplay(props) {
  return (
    <div className="track-part track-display" style={{padding: props.trackDisplayPadding, width: utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
        {props.track.regions.map((region, index) => {
          return <Region region={region} data={props.data} />;
        })}
    </div>
  );
}

// <div className="track-part track-display-wrapper" style={{padding: props.trackDisplayPadding}}>
//   <div className="track-display" style={{width: utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
//     <TrackCanvas track={props.track} data={props.data} />
//   </div>
// </div>
