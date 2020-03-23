import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import "../HiddenScrollbar.css";
import "./TracksView.css";
// import Tone from 'tone';

import TrackHeader from './TrackHeader';
import TrackDisplay from './TrackDisplay';
import Playhead from './Playhead';
import EndScreen from './EndScreen';
import LoopScreen from './LoopScreen';
import TimelineRuler from './TimelineRuler.js';

const trackDisplayPadding = 8;
// const trackHeight = 120;

export default function TracksView(props) {
    const [trackHeight, setTrackHeight] = useState(120);
    let newData = Object.assign({}, props.data, {trackDisplayPadding: trackDisplayPadding, trackHeight: trackHeight});



    return(
      <ScrollSync>
        <div className="master">
          <div className="column left">
            <div className="pane top left track-part top">header</div>
            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane bottom left hidden-scrollbar">
                {props.data.tracks.map((track, index) => {
                  return <TrackHeader key={index} index={index} track={props.data.tracks[index]} data={newData} methods={props.methods}/>
                })}
              </div>
            </ScrollSyncPane>
          </div>
          <div className="column right">

            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane top right hidden-scrollbar">
                <input type="range" style={{position:"fixed", zIndex:17}}  min="10" max="310" step="10" value={trackHeight} onChange={(e) => setTrackHeight(e.target.value)}></input>
                <Playhead variant={'top'} data={newData}/>
                <LoopScreen data={newData}/>
                <EndScreen variant={'top'} data={newData}/>
                <TimelineRuler data={newData}/>
              </div>
            </ScrollSyncPane>
            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane bottom right">
                <Playhead variant={'bottom'} data={newData}/>
                <EndScreen variant={'bottom'} data={newData}/>
                {props.data.tracks.map((track, index) => {
                  return <TrackDisplay key={index} index={index} track={props.data.tracks[index]} data={newData} methods={props.methods}/>;
                })}
              </div>
            </ScrollSyncPane>
          </div>


        </div>
      </ScrollSync>
    );
}
