
// --- UI logic ---
const slider = document.getElementById('slider');
const princess = document.getElementById('princess');
const moodStrip = document.getElementById('moodStrip');

function positionPrincess(level) {
  const rect = moodStrip.getBoundingClientRect();
  const step = rect.width / 6;
  const x = (level - 1) * step;

  // Horizontal position
  princess.style.left = (x + 0.5 * step) + 'px';

  // Vertical position (choose ONE of the following approaches)

  // Using bottom: more negative moves it further down
  princess.style.bottom = '-60px';


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
