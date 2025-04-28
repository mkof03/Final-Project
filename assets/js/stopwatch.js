// Helper to format stopwatch time (HH:MM:SS.CS)
function formatSw(ms) {
    const centis = Math.floor(ms / 10) % 100;
    const secs = Math.floor(ms / 1000) % 60;
    const mins = Math.floor(ms / 60000) % 60;
    const hrs = Math.floor(ms / 3600000);
    return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(centis).padStart(2,'0')}`;
  }

  // Stopwatch logic
  let swInterval, swStartTime, swElapsed = 0;
  const swDisplay = document.getElementById('sw-display');
  const swStartBtn = document.getElementById('sw-start');
  const swPauseBtn = document.getElementById('sw-pause');
  const swResetBtn = document.getElementById('sw-reset');
  const swLapBtn = document.getElementById('sw-lap');
  const swLaps = document.getElementById('sw-laps');

  swStartBtn.addEventListener('click', () => {
    swStartTime = Date.now() - swElapsed;
    swInterval = setInterval(() => {
      swElapsed = Date.now() - swStartTime;
      swDisplay.textContent = formatSw(swElapsed);
    }, 10);
    swStartBtn.disabled = true;
    swPauseBtn.disabled = false;
    swResetBtn.disabled = false;
    swLapBtn.disabled = false;
  });

  swPauseBtn.addEventListener('click', () => {
    clearInterval(swInterval);
    swStartBtn.disabled = false;
    swPauseBtn.disabled = true;
  });

  swResetBtn.addEventListener('click', () => {
    clearInterval(swInterval);
    swElapsed = 0;
    swDisplay.textContent = '00:00:00.00';
    swStartBtn.disabled = false;
    swPauseBtn.disabled = true;
    swResetBtn.disabled = true;
    swLapBtn.disabled = true;
    swLaps.innerHTML = '';
  });

  swLapBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = formatSw(swElapsed);
    swLaps.prepend(li);
  });

  // Timer helper (HH:MM:SS.CS)
  function formatTm(ms) {
    const centis = Math.floor(ms / 10) % 100;
    const secs = Math.floor(ms / 1000) % 60;
    const mins = Math.floor(ms / 60000) % 60;
    const hrs = Math.floor(ms / 3600000);
    return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(centis).padStart(2,'0')}`;
  }

  // Timer logic
  let tmInterval, tmRemaining = 0;
  const tmDisplay = document.getElementById('tm-display');
  const tmStartBtn = document.getElementById('tm-start');
  const tmPauseBtn = document.getElementById('tm-pause');
  const tmResetBtn = document.getElementById('tm-reset');
  const tmHr = document.getElementById('timer-hr');
  const tmMin = document.getElementById('timer-min');
  const tmSec = document.getElementById('timer-sec');
  const valToastEl = document.getElementById('validationToast');
  const valToast = bootstrap.Toast.getOrCreateInstance(valToastEl);

  tmStartBtn.addEventListener('click', () => {
    const hrs = parseInt(tmHr.value) || 0;
    const mins = parseInt(tmMin.value) || 0;
    const secs = parseInt(tmSec.value) || 0;
    if(hrs<0||mins<0||secs<0){valToast.show(); return;}
    tmRemaining = hrs*3600000 + mins*60000 + secs*1000;
    if (tmRemaining <= 0) return;
    const start = Date.now();
    tmInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const left = tmRemaining - elapsed;
      if (left <= 0) {
        clearInterval(tmInterval);
        tmDisplay.textContent = '00:00:00.00';
        new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg').play();
        tmStartBtn.disabled = false;
        tmPauseBtn.disabled = true;
        tmResetBtn.disabled = true;
      } else {
        tmDisplay.textContent = formatTm(left);
      }
    }, 10);
    tmDisplay.textContent = formatTm(tmRemaining);
    tmStartBtn.disabled = true;
    tmPauseBtn.disabled = false;
    tmResetBtn.disabled = false;
  });

  tmPauseBtn.addEventListener('click', () => {
    clearInterval(tmInterval);
    tmStartBtn.disabled = false;
    tmPauseBtn.disabled = true;
  });

  tmResetBtn.addEventListener('click', () => {
    clearInterval(tmInterval);
    tmDisplay.textContent = '00:00:00.00';
    tmHr.value = '';
    tmMin.value = '';
    tmSec.value = '';
    tmStartBtn.disabled = false;
    tmPauseBtn.disabled = true;
    tmResetBtn.disabled = true;
  });