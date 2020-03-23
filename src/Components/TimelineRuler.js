import React from 'react';
import "./TrackParts.css";
import Tone from "tone";
import {Fragment} from 'react';
import * as utils from '../CoolHelpers';
// import $ from 'jquery';

const padding = 4;
const beatPixelsCutoff=50;

function renderBeat(x, bar, beat, beatPixels, key) {

  if (beatPixels < beatPixelsCutoff) {
    return(
      <Fragment key={key}>
        {beat === 0 ? <text x={x+padding} y="1em" >{bar}</text> : <></>}
        <rect x={x} y={beat===0? "0" : "1.5em"} width="1" height="100" fill="#e6e6e6" />
      </Fragment>
    );
  } else {
    return(
      <Fragment key={key}>
        <text x={x+padding} y="1em" >{bar}.{beat}</text>
        <rect x={x} y={beat===0? "0" : "1.5em"} width="1" height="100" fill="#e6e6e6" />
      </Fragment>
    );
  }

}

function renderRuler(data) {
  let items = [];
  let ts = Tone.Transport.timeSignature;
  for (let i = 0; i < utils.BBSToBeats(data.projectMaxLength); i++) {
    items.push(
      renderBeat(i * data.beatPixels, Math.floor(i/ts), i%ts, data.beatPixels, i)
    );
  }
  return (
    <>
      {items}
    </>
  );
}

export default function TimelineRuler(props) {
  return (
    <div className="track-part top" style={{padding: props.trackDisplayPadding, width: utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
      <svg height="100" width={utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}>
          {renderRuler(props.data)}
      </svg>
    </div>
  );
}
