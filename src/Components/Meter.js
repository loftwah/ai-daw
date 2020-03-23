import React from 'react';
import { useState, useEffect } from 'react';

import Tone from "tone";
import './Meter.css';

import AnimatedRenderer from './AnimatedRenderer';

const scalar = 50; //scalar = 20 is the mathematically correct

function dbToAmplitude(db) {
  return 10**(db/scalar);
}

// function amplitudeToDb(amplitude) {
//   return Math.log10(amplitude)*scalar;
// }

// function roundTo(x, places) {
//   parseFloat((x).toFixed(places));
// }

const width = 100;

export default function Meter(props) {
  const [volume, setVolume] = useState(props.source.volume.value);
  useEffect(() => {
    props.source.volume.value = volume;
  });

  var meter = new Tone.Meter();
  props.source.connect(meter);

// <input className="fader" style={{position:"absolute", width: width, margin:0}} type='range' min="-50" max="10" step="0.1" value={volume} onChange={(e) => {setVolume(e.target.value)}}/>

  return (
    <AnimatedRenderer render={data => (
      <>
      <div style={{width: width, textAlign:"left", position:"relative"}} className="menu-button disabled">

        <input className="fader" style={{position:"absolute", width: width, margin:0}} type='range' min="-100" max="10" step="0.1" value={volume} onChange={(e) => {setVolume(e.target.value)}}/>
        <input type='number' value={volume} onChange={(e) => {setVolume(e.target.value)}} style={{width: "100%"}}/>
        <div className="meter" style={{width: (Math.round(100*dbToAmplitude(Math.min(meter.getLevel(), 0))))+"%"}}></div>

      </div>
      <span className="clipping" style={{opacity: meter.getLevel() > 0 ? 1 : 0, transition: meter.getLevel() > 0 ? "none" : "opacity 2s"}}>!</span>
      {/*Math.round(meter.getLevel())*/}
      </>
    )} />
  );
}

// fader-volume combo?
