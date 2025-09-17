const synth = new Tone.Synth().toDestination();

function toMidi(y) {
  return Math.floor(((y + 1) / 2) * 24 + 60); // 60–84 range... is this normal? should be for C4 octave
}

function playWave(waveform) {
  waveform.forEach((y, i) => {
    const midi = toMidi(y);
    const freq = Tone.Frequency(midi, "midi").toFrequency();
    synth.triggerAttackRelease(freq, "32n", Tone.now() + i * 0.05);
  });
}

const socket = new WebSocket("ws://localhost:8009");
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  drawWave(data.waveform);   // calls ui.js
  playWave(data.waveform);   // calls this file
};