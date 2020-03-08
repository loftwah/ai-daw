import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import MyComponent from './MyComponent';

//font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faPlus, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'

import Tone from "tone";



function App() {
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
  });

  const tracks = [
    {instrument: 0, notes: [{pitch: 60, duration: 0.5, position: 0}, {pitch: 62, duration: 0.5, position: .5}, {pitch: 64, duration: 0.5, position: 1}]}
  ];



  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <div className="App-menu-bar">
          <input id="title" type="text" placeholder="Untitled Project"></input>
        </div>
        <div className="App-menu-bar">
          <div className="menu-button">
            <FontAwesomeIcon icon={faPlus} /> new beat
          </div>
          <div className="menu-button">
            <FontAwesomeIcon icon={faStepBackward} />
          </div>
          <div className="menu-button" onClick={() => {


            if (Tone.context.state !== 'running') {
              Tone.context.resume();
            }

            setPlaying(!playing);
            let synth = new Tone.Synth().toMaster();

            tracks.forEach((track) => {
              track.notes.forEach((note) => {
                Tone.Transport.schedule(function(time) {
  								synth.triggerAttackRelease(Tone.Frequency(note.pitch, "midi").toNote(), note.duration, time);
  							}, note.position);
              });
            });

          }}>
            {playing? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </div>
          <div className="menu-button">
            <FontAwesomeIcon icon={faStepForward} />
          </div>
          <div className="menu-button">
            <label>Tempo:</label> <input id="tempo" type="number" value={tempo} onChange={(e) => setTempo(e.target.value)}></input>
          </div>
          <div className="menu-button">
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
          </div>
          <div className="menu-button">
            {time}
          </div>
        </div>
      </header>
      <MyComponent />
      <footer>fotoer
      </footer>
    </div>
  );
}

export default App;
