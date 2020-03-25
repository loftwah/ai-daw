import React from 'react';
import './Generator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import Tone from 'tone'

// generator imports:
// import test from '../generators/test.js'
import trap1 from '../generators/trap1.js'

const generators = [
  // {name: 'Test', f: test},
  {name: 'Trap 1', f: trap1},
];

export default function Generator(props) {
  return (
    <div className="dropdown">
      <div className="dropbtn menu-button"><FontAwesomeIcon icon={faPlus} /> new beat</div>
      <div className="dropdown-content">
        {generators.map((generator, index) => {
          return (<button key={index} className="dropdown-option" onClick={() => {
            let genF = generator.f;
            let proj = genF();

            props.methods.setTracks(proj.tracks);
            props.methods.setTempo(proj.tempo);
            console.log(props.methods.contentLength(proj.tracks));
            Tone.Transport.setLoopPoints(0, props.methods.contentLength(proj.tracks));
          }}>{generator.name}</button>)
        })}
      </div>
    </div>
  );
}
