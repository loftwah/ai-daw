import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
// import AnimatedRenderer from './Components/AnimatedRenderer';
import TransportPosition from './Components/TransportPosition';
import Meter from './Components/Meter';
import TracksView from './Components/TracksView';

import * as utils from './CoolHelpers';

//font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faPlus, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'

import Tone from "tone";





Tone.Transport.setLoopPoints(0, "1m");
Tone.Transport.loop = true;


function hackNewNotes() {
  let notes = [];
  for (let i = 0; i < 32; i++) {
    notes.push({pitch: Math.floor(Math.random() * (80 - 50)) + 40, duration: '8n', position: '0:0:' + 2*i});
  }
  return notes
}


function projectLength(tracks) {
  let length = '0:0:0';
  if (Tone.Transport.loop) {
    length = Tone.Time(Tone.Transport.loopEnd).toBarsBeatsSixteenths();
  }
  tracks.forEach((track) => {
    track.notes.forEach((note) => {
      let endPosition = utils.addBBSTimes(note.position, note.duration);
      if (utils.compareBBSTimes(endPosition, length) > 0) {
        length = endPosition;
      }
    });
  });
  // console.log(length);
  return '0:' + Math.ceil(utils.BBSToBeats(length)) + ':0';
}

function projectMaxLength(tracks) {
  let maxLength = "96:0:0";
  if (utils.compareBBSTimes(projectLength(tracks), maxLength) > 0) {
    maxLength = projectLength(tracks);
  }
  return maxLength;
}


function App() {
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [key, setKey] = useState(0);
  const [beatPixels, setBeatPixels] = useState(110);
  const [tracks, setTracks] = useState([
    {instrument: new Tone.Synth().toMaster(), notes: [{pitch: 60, duration: '8n', position: '0:0:0'}, {pitch: 62, duration: '8n', position: '0:1:0'}, {pitch: 64, duration: '8n', position: '0:2:0'}]}
  ]);


  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }

    Tone.Transport.bpm.value = tempo;


    updateTransport();


  });

  function updateTransport() {
    Tone.Transport.cancel();
    tracks.forEach((track) => {
      track.notes.forEach((note) => {
        Tone.Transport.schedule(function(time) {
          track.instrument.triggerAttackRelease(Tone.Frequency(note.pitch, "midi").toNote(), note.duration, time);
        }, note.position);
      });
    });


  }

  function removeTrack(index) {
    setTracks(tracks.slice(0, index).concat(tracks.slice(index+1)));
  }



  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <div className="App-menu-bar">
          <input id="title" type="text" placeholder="Untitled Project"></input>
        </div>
        <div className="App-menu-bar">
          <button className="menu-button" onClick={() => {
            // console.log('hi');
            setTracks(tracks.concat({instrument: new Tone.Synth().toMaster(), notes: hackNewNotes()}));
            // console.log(tracks.length);
          }}>
            <FontAwesomeIcon icon={faPlus} /> new beat
          </button>
          <button className="menu-button" onClick={() => {
            Tone.Transport.pause();
            Tone.Transport.position = "0:0:0";
            if (playing) {
              Tone.Transport.start();
            } else {
              Tone.Transport.pause();
            }
          }}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className="menu-button" onClick={() => {

            if (Tone.context.state !== 'running') {
              Tone.context.resume();
            }
            setPlaying(!playing);

          }}>
            {playing? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <button className="menu-button">
            <FontAwesomeIcon icon={faStepForward} />
          </button>
          <button className="menu-button">
            <label>Tempo:</label> <input id="tempo" type="number" value={tempo} onChange={(e) => setTempo(e.target.value)}></input>
          </button>
          <button className="menu-button">
            <label>Key:</label> <select id="key" value={key} onChange={(e) => setKey(e.target.value)}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
            </select>
          </button>


          <TransportPosition/>

          <Meter source={Tone.Master}/>

          <input type="range" min="10" max="310" step="50" value={beatPixels} onChange={(e) => setBeatPixels(e.target.value)}></input>
          {beatPixels}

        </div>
      </header>
      <TracksView data={{tracks: tracks, beatPixels: beatPixels, projectLength: projectLength(tracks), projectMaxLength: projectMaxLength(tracks)}} methods={{removeTrack: removeTrack}}/>
      <footer className="App-menu-bar">fotoer
      </footer>
    </div>
  );
}

export default App;