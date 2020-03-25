import Tone from 'tone'
import hihat from "../sounds/hihat.wav"
import clap from "../sounds/clap.wav"
import snare from "../sounds/snare.wav"
import kick from "../sounds/kick.wav"

import {getRandomInt} from "../CoolHelpers";

const hihatNum = 42;
const snareNum = 40;
const clapNum = 39;
const kickNum = 32;
const buffers = {
  hihat: new Tone.Buffer(hihat),
  clap: new Tone.Buffer(clap),
  snare: new Tone.Buffer(snare),
  kick: new Tone.Buffer(kick),
}

export default function gen() {
    let instrument = new Tone.Sampler({
      "42" :  buffers.hihat,
      "40" : buffers.snare,
      "39" : buffers.clap,
      "32" : buffers.kick,

    }).toMaster();
    return {
      tempo: getRandomInt(108, 200),
      tracks: [
      {instrument: instrument, regions: [
          {title: "Trap Kit", duration:"2:0:0", position:"0:0:0", notes: newNotes()}
        ]
      }
    ]};
}


function newNotes() {
  let notes = [];
	for (let i = 0; i < 16; i++) {
		if (Math.random() < 0.1) {
			notes.push({pitch: hihatNum, position: "0:0:" + 2*i, duration: "16n"});
			notes.push({pitch:hihatNum, position: "0:0:" + 2*(i + 0.5), duration: "16n"});
		} else if (Math.random() < 0.02) {
			notes.push({pitch:hihatNum, position: "0:0:" + 2*i, duration: "32n"});
			notes.push({pitch:hihatNum, position: "0:0:" + 2*(i + 0.25), duration: "32n"});
			notes.push({pitch:hihatNum, position: "0:0:" + 2*(i + 0.5), duration: "32n"});
			notes.push({pitch:hihatNum, position: "0:0:" + 2*(i + 0.75), duration: "32n"});
		} else {
			notes.push({pitch:hihatNum, position: "0:0:" + 2*i, duration: "16n"});
		}

		if (Math.random() < 0.2 && i % 2 === 1) {
			notes.push({pitch:snareNum, position: "0:0:" + 2*i, duration: "16n"});
		}

		if (i % 8 === 4) {
			notes.push({pitch:clapNum, position: "0:0:" + 2*i, duration: "16n"});
		}
    if (i % 16 === 0) {
			notes.push({pitch:kickNum, position: "0:0:" + 2*i, duration: "16n"});
		}
    if (Math.random() < 0.1) {
      notes.push({pitch:kickNum, position: "0:0:" + 2*i, duration: "16n"});
    }
	}
  return notes;
}
