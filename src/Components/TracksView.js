import React, {Component} from 'react';
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

export default class TracksView extends Component {
  // constructor(props) {
  //   super(props);
  // }


  render() {

    return(
      <ScrollSync>
        <div className="master">
          <div className="column left">
            <div className="pane top left track-part top">header</div>
            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane bottom left hidden-scrollbar">
                {this.props.data.tracks.map((track, index) => {
                  return <TrackHeader key={index} index={index} track={this.props.data.tracks[index]} data={this.props.data} methods={this.props.methods}/>
                })}
              </div>
            </ScrollSyncPane>
          </div>
          <div className="column right">

            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane top right hidden-scrollbar">
                <Playhead variant={'top'} data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>
                <LoopScreen data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>
                <EndScreen variant={'top'} data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>
                <TimelineRuler data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>
              </div>
            </ScrollSyncPane>
            <ScrollSyncPane group={["horizontal", "vertical"]}>
              <div className="pane bottom right">
                <Playhead variant={'bottom'} data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>
                <EndScreen variant={'bottom'} data={Object.assign({}, this.props.data, {trackDisplayPadding: trackDisplayPadding})}/>

                {this.props.data.tracks.map((track, index) => {
                  return <TrackDisplay paddingLeft={trackDisplayPadding} key={index} index={index} track={this.props.data.tracks[index]} data={this.props.data} methods={this.props.methods}/>;
                })}
              </div>
            </ScrollSyncPane>
          </div>


        </div>
      </ScrollSync>
    );
  }
}
