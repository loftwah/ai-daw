import React from 'react';
import "./TrackParts.css";
import Tone from "tone";
import {Fragment} from 'react';
import * as utils from '../CoolHelpers';
// import $ from 'jquery';

function renderBeat(x, bar, beat, beatPixels, key, height) {
  return(
    <Fragment key={key}>
      <rect x={x} y='0' width="1" height={height} fill="#e6e6e6" />
    </Fragment>
  );

}

function renderRuler(data) {
  let items = [];
  let ts = Tone.Transport.timeSignature;
  for (let i = 0; i < utils.BBSToBeats(data.projectMaxLength); i++) {
    items.push(
      renderBeat(i * data.beatPixels, Math.floor(i/ts), i%ts, data.beatPixels, i, data.trackHeight)
    );
  }
  return (
    <>
      {items}
    </>
  );
}

export default function TimelineGrid(props) {
  return (
    <div className="timeline-grid" style={{ width: -1* props.data.trackDisplayPadding + utils.BBSToBeats(props.data.projectMaxLength) * props.data.beatPixels}}>
      <svg height="100%" width="100%">
          {renderRuler(props.data)}
      </svg>
    </div>
  );
}
