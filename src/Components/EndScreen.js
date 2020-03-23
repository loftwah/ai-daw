import React from 'react';
// import Tone from "tone";
import './EndScreen.css';
import * as utils from '../CoolHelpers';

export default function EndScreen(props) {
  // console.log('i think its' + utils.BBSToBeats(props.data.projectLength))
  return (

    <div className="end-screen" style={{height: (props.variant === 'top' ? "100%" : props.data.tracks.length * props.data.trackHeight), left: props.data.trackDisplayPadding + props.data.beatPixels * utils.BBSToBeats(props.data.projectLength), width: props.data.trackDisplayPadding + props.data.beatPixels * utils.BBSToBeats(utils.subtractBBSTimes(props.data.projectMaxLength, props.data.projectLength))}}>

    </div>


  );
}
