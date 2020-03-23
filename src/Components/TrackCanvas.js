import React from 'react';
// import {useRef, useEffect} from 'react';
import './TrackParts.css';
import './Block.css';
import $ from 'jquery';

import * as utils from '../CoolHelpers';


function trackLength(track) {
  let length = '0:0:0';
  track.notes.forEach((note) => {
    let endPosition = utils.addBBSTimes(note.position, note.duration);
    if (utils.compareBBSTimes(endPosition, length) > 0) {
      length = endPosition;
    }
  });
  // console.log(length);
  return length;
}

const strokeWidth = 4;
const svgSize = 100;

function renderRegion(track, data) {
  // console.log($(svgRef).css('height'));
  let pitches = track.notes.map(note => note.pitch);
  let minPitch = Math.min(...pitches);
  let maxPitch = Math.max(...pitches);
  let items = [];
  // console.log(minPitch);
  let pseudoBeatPixels = svgSize / utils.BBSToBeats(trackLength(track));
  track.notes.forEach((note, index) => {

    let x = utils.BBSToBeats(note.position) * pseudoBeatPixels;
    let y = svgSize - (0.6*((note.pitch - minPitch) / (maxPitch - minPitch))+0.2)  * svgSize ;
    // let y = 30;
    let x2 = x + pseudoBeatPixels *utils.BBSToBeats(note.duration);

    items.push(
      <line x1={x} y1={y} x2={x2} y2={y} stroke="black" strokeWidth={strokeWidth} key={index}/>
    );
  });
  return (
    <>
      {items}
    </>
  );
}

const rightMargin = 1;
export default function TrackCanvas(props) {

  return (
    <div className="track-region" style={{width:props.data.beatPixels * utils.BBSToBeats(trackLength(props.track))}}>
      <div className="track-canvas-wrapper" style={{width:-1* rightMargin + props.data.beatPixels * utils.BBSToBeats(trackLength(props.track))}}>
        <div className="block-title">heyo
        </div>
        <svg preserveAspectRatio="none" viewBox={"0 0 " + svgSize + " "+ svgSize} className="track-canvas" style={{width:"calc(100% + 1px)"}}>
          {renderRegion(props.track, props.data)}
        </svg>
      </div>
    </div>
  );
}
