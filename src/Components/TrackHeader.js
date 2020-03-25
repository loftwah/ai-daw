import React from 'react';
import "./TrackParts.css";
import Meter from "./Meter";

/*i have to do this - 2*0 bullshit in the height for some
reason in order to get it to update . . . no clue why.
I would think it has something to do with callbacks and
shit but + 2*0 doesn't work either!
 */

export default function TrackHeader(props) {
  return (
    <div className="track-part left bottom track-header" style={{height: props.data.trackHeight - 2*0}}>
      <div>{props.track.instrument.toString()}</div>
      <Meter source={props.track.instrument}/>
      <button className="delete-track" onClick={() => {props.methods.removeTrack(props.index)}}>x</button>
    </div>
  );
}
