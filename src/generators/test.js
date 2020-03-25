import Tone from 'tone'

function hackNewRegion() {
  let notes = [];
  for (let i = 0; i < 30; i++) {
    notes.push({pitch: Math.floor(Math.random() * (80 - 50)) + 40, duration: '8n', position: '0:0:' + 2*i});
  }
  return {title: "melodyy", duration:"0:16:0", position:"0:0:0", notes: notes}
}

export default function test() {
    return [
      {instrument: new Tone.Synth().toMaster(), regions: [hackNewRegion()]}
    ];
}
