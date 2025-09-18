const synth = new Tone.Synth({
  oscillator: { type: "sine" },  envelope: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.2 }
}).toDestination();

let sound = false;

async function startSynth() {
  await Tone.start();
  if (!sound) {
    synth.triggerAttack("C4"); // base note
    sound = true;
  }
}

function toMidi(y) {
  return Math.floor(((y + 1) / 2) * 24 + 60); // 60–84 range for C4 octave
}

function playWave(waveform) {
  startSynth();

  const avg = waveform.reduce((a, b) => a + b, 0) / waveform.length;
  const midi = yToMidi(avg);
  const freq = Tone.Frequency(midi, "midi").toFrequency();

}

const socket = new WebSocket("ws://localhost:8009");
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  drawWave(data.waveform);   // calls ui.js
  playWave(data.waveform);   // calls this file
};