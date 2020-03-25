import React from 'react';
import './TrackParts.css';
import Region from './Region';

import * as utils from '../CoolHelpers';
import TimelineGrid from './TimelineGrid';

/*i have to do this - 2*0 bullshit in the height for some
reason in order to get it to update . . . no clue why.
I would think it has something to do with callbacks and
shit but + 2*0 doesn't work either!
 */

export default function TrackDisplay(props) {
  // console.log(props.data.trackHeight);
  return (
    <div className="track-part bottom right track-display" style={{height: props.data.trackHeight - 2*0, padding: props.data.trackDisplayPadding, width: utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
      <TimelineGrid data={props.data}/>
        {props.track.regions.map((region, index) => {
          return <Region region={region} data={props.data} key={index} />;
        })}
    </div>
  );
}

// <div className="track-part track-display-wrapper" style={{padding: props.trackDisplayPadding}}>
//   <div className="track-display" style={{width: utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
//     <TrackCanvas track={props.track} data={props.data} />
//   </div>
// </div>
