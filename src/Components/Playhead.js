import React from 'react';
import Tone from "tone";
import './Playhead.css';
import * as utils from '../CoolHelpers';

import AnimatedRenderer from './AnimatedRenderer';

const topWidth = 11;
const bottomWidth = 1;
const trackHeight = 120; //a quick hack. can be found in the trackparts.css

export default function Playhead(props) {
  return (

    <AnimatedRenderer render={data => (
      <div className={"playhead " + props.variant} style={{height: (props.variant === 'top' ? topWidth : props.data.tracks.length * trackHeight), width: (props.variant === 'top' ? topWidth : bottomWidth), left: (props.variant === 'top' ? Math.ceil(-topWidth/2) : 0) + props.data.trackDisplayPadding + props.data.beatPixels * utils.BBSToBeats(Tone.Transport.position)}}>

      </div>
    )}/>


  );
}
