import Tone from "tone";

export function BBSToBeats(bbs) {
  return Tone.Time(bbs).valueOf() * Tone.Transport.bpm.value / 60;
}

export function addBBSTimes(time1, time2) {
	return Tone.Time( Tone.Time(time1).valueOf() + Tone.Time(time2).valueOf() ).toBarsBeatsSixteenths();
}

export function subtractBBSTimes(time1, time2) {
	return Tone.Time( Tone.Time(time1).valueOf() - Tone.Time(time2).valueOf() ).toBarsBeatsSixteenths();
}

export function compareBBSTimes(time1, time2) {
  if (Tone.Time(time1).valueOf() > Tone.Time(time2).valueOf()) {
    return 1;
  } else if (Tone.Time(time1).valueOf() === Tone.Time(time2).valueOf()) {
    return 0;
  } else {
    return -1;
  }
}
