import React from 'react';
import Tone from "tone";
import './LoopScreen.css';
import * as utils from '../CoolHelpers';

export default function Playhead(props) {
  // console.log('i think its' + utils.BBSToBeats(props.data.projectLength))
  return (

    <div className="loop-screen" style={{left: props.data.trackDisplayPadding + utils.BBSToBeats(Tone.Transport.loopStart) * utils.BBSToBeats(props.data.projectLength), width: props.data.beatPixels * utils.BBSToBeats(utils.subtractBBSTimes(Tone.Transport.loopEnd, Tone.Transport.loopStart))}}></div>

  );
}
