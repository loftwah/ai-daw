import React from 'react';
// import {useRef, useEffect} from 'react';
import './Region.css';
// import $ from 'jquery';

import * as utils from '../CoolHelpers';



const strokeWidth = 4;
const svgSize = 100;

function renderRegion(region, data) {
  // console.log($(svgRef).css('height'));
  let pitches = region.notes.map(note => note.pitch);
  let minPitch = Math.min(...pitches);
  let maxPitch = Math.max(...pitches);
  let items = [];
  // console.log(minPitch);
  let pseudoBeatPixels = svgSize / utils.BBSToBeats(region.duration);
  region.notes.forEach((note, index) => {

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
export default function Region(props) {

  return (
    <div className="region" style={{height: props.data.trackHeight - 2*props.data.trackDisplayPadding, width:props.data.beatPixels * utils.BBSToBeats(props.region.duration)}}>
      <div className="region-wrapper" style={{width:-1* rightMargin + props.data.beatPixels * utils.BBSToBeats(props.region.duration)}}>
        <div className="region-title">
          {props.region.title}
        </div>
        <svg preserveAspectRatio="none" viewBox={"0 0 " + svgSize + " "+ svgSize} className="region-svg" style={{width:"calc(100% + 1px)"}}>
          {renderRegion(props.region, props.data)}
        </svg>
      </div>
    </div>
  );
}
