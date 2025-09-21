# Arm Waveform Music

This project turns arm movement into sound and visuals using computer vision and real-time audio synthesis.  
It uses MediaPipe to track arm positions, streams them over WebSockets with Python. 
Visual and audio output of the motion happens in the browser using p5.js and Tone.js.

---

## Features
- Tracks 6 points across your wingspan with MediaPipe
- Generates a waveform based on your arm shape
- Visualizes the waveform in real time with p5.js
- Maps arm movement to a theremin-like synthesizer in Tone.js

---

## Steps to run this code on your own
   ```
   git clone https://github.com/YOUR_USERNAME/arm-waveform-music.git
   cd arm-waveform-music
   pip install -r requirements.txt
   python server.py
   ```
  Then, open index.html in browser, and click the screen to start audio output.
  Enjoy!


  ## Next steps

  If / when I come back to this project, I would like to implement some form of volume control by moving arms closer and farther from the screen.
  This entire project was inspired by a theremin, so that would add another layer of realism and similarity to the instrument.
  Additionally, I would add some sort of visual aid for moving parts of the wave. For example, if your arm is moving, I would turn it red until it becomes stationary again.
