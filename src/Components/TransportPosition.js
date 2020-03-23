import React from 'react';
import Tone from "tone";
import './TransportPosition.css';

import AnimatedRenderer from './AnimatedRenderer';

let numTitles = ['bar', 'beat', 'sixteenth'];

export default function TransportPosition() {
  return (

    <AnimatedRenderer render={data => (
      <>
        <div className="menu-button disabled">{Tone.Transport.position.split(':').map((num, index) => {
          return (
            <span className='num-box' key={index}><span className='num'>{Math.floor(num)}</span><span className='num-title'>{numTitles[index]}</span></span>
          );
        })}</div>
      </>
    )} />
    

  );
}
