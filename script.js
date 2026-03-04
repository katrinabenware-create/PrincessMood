
// --- UI logic ---
const slider = document.getElementById('slider');
const princess = document.getElementById('princess');
const moodStrip = document.getElementById('moodStrip');


function positionPrincess(level) {
  // Horizontal: 7 stops across the mood image
  const stripRect = moodStrip.getBoundingClientRect();
  const step = stripRect.width / 6;           // 6 gaps for 7 positions
  const x = (level - 1) * step;
  princess.style.left = (x + 0.5 * step) + 'px';

  // Vertical: directly BELOW the slider
  const sliderRect = slider.getBoundingClientRect();
  const stageRect  = stage.getBoundingClientRect();
  const offset = 16;                           // tweak spacing below slider
  princess.style.top = (sliderRect.bottom - stageRect.top + offset) + 'px';
}


 
function setLevel(level, {broadcast=true} = {}) {
  level = Math.max(1, Math.min(7, parseInt(level, 10)));
  slider.value = level;
  positionPrincess(level);
  if (broadcast) sendRealtime({ type: 'mood-change', level });
}

slider.addEventListener('input', () => setLevel(slider.value));

// Position after images load / on resize
window.addEventListener('load', () => setLevel(slider.value, {broadcast:false}));
window.addEventListener('resize', () => setLevel(slider.value, {broadcast:false}));

// --- Realtime binding (implemented in realtime.js) ---
subscribeRealtime((msg) => {
  if (msg && msg.type === 'mood-change' && Number.isFinite(msg.level)) {
    setLevel(msg.level, {broadcast:false});
  }
});
