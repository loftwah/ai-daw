import React from 'react';
import "./TrackParts.css";
import Meter from "./Meter";

export default function TrackHeader(props) {
  return (
    <div className="track-part track-header">
      <div>{props.track.instrument.toString()}</div>
      <Meter source={props.track.instrument}/>
      <button className="delete-track" onClick={() => {props.methods.removeTrack(props.index)}}>x</button>
    </div>
  );
}

// at some point: maybe trasition to using data (which contains tracks) only, instead of getting an additional track prop?
