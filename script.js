/**
 * Web Audio API Synthesizer (No external files)
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTick(freq = 660, type = 'sine', duration = 0.05, gainVal = 0.1) {
        if (this.muted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.error(e);
        }
    }

    playCascade(index) {
        const freqs = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
        this.playTick(freqs[index] || 660, 'sine', 0.06, 0.12);
    }

    playWhoosh() {
        if (this.muted) return;
        this.init();
        try {
            const bufferSize = this.ctx.sampleRate * 0.4;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(300, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
            filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.4);
            filter.Q.value = 3;

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            whiteNoise.start();
            whiteNoise.stop(this.ctx.currentTime + 0.4);
        } catch(e) {}
    }

    playConvergence() {
        if (this.muted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.35);

            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.35);
        } catch(e) {}
    }

    playBoom() {
        if (this.muted) return;
        this.init();
        try {
            const o = this.ctx.createOscillator(), g = this.ctx.createGain(), t = this.ctx.currentTime;
            o.type = 'sine';
            o.frequency.setValueAtTime(140, t);
            o.frequency.exponentialRampToValueAtTime(42, t + 0.4);
            g.gain.setValueAtTime(0.28, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            o.connect(g); g.connect(this.ctx.destination);
            o.start(); o.stop(t + 0.4);
        } catch (e) {}
        [2093, 2637, 3136, 4186].forEach((f, i) => setTimeout(() => this.playTick(f, 'sine', 0.22, 0.035), 320 + i * 55));
    }

    playSuccess() {
        if (this.muted) return;
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTick(freq, 'sine', 0.3, 0.12);
            }, idx * 70);
        });
        // Sharp shimmer overlay
        setTimeout(() => {
            this.playTick(2093.00, 'sine', 0.15, 0.08); // C7
        }, 280);
    }

    playError() {
        if (this.muted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(130, this.ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch(e) {}
    }
}

const sound = new SoundEngine();

// DOM Elements
const realInput = document.getElementById('realInput');
const digitsGrid = document.getElementById('digitsGrid');
const focusRing = document.getElementById('focusRing');
const digitBoxes = document.querySelectorAll('.digit-box');
const notificationBar = document.getElementById('notificationBar');
const fillBtn = document.getElementById('fillBtn');
const countdownArea = document.getElementById('countdownArea');
const resendLink = document.getElementById('resendLink');
const timerSec = document.getElementById('timerSec');
const orbitArea = document.getElementById('orbitArea');
const orbitRing = document.getElementById('orbitRing');
const orbitCenterDot = document.getElementById('orbitCenterDot');
const orbitItems = [
    document.getElementById('orbitItem0'),
    document.getElementById('orbitItem1'),
    document.getElementById('orbitItem2'),
    document.getElementById('orbitItem3')
];
const convergedBox = document.getElementById('convergedBox');
const successFooterArea = document.getElementById('successFooterArea');
const cardTitle = document.getElementById('cardTitle');
const cardSubtitle = document.getElementById('cardSubtitle');
const continueBtn = document.getElementById('continueBtn');
const replayBtn = document.getElementById('replayBtn');
const muteToggle = document.getElementById('muteToggle');
const speakerIcon = document.getElementById('speakerIcon');
const particleCanvas = document.getElementById('particleCanvas');
const ripple1 = document.getElementById('ripple1');
const ripple2 = document.getElementById('ripple2');
const ripple3 = document.getElementById('ripple3');
const halo1 = document.getElementById('halo1');
const halo2 = document.getElementById('halo2');
const mergeFlash = document.getElementById('mergeFlash');

// State Machine
let state = 'idle'; // idle, typing, orbit, verifying, success, error
let otpValues = ['', '', '', ''];
let activeIndex = 0;
let countdownTimer = null;
let timeLeft = 24;
let orbitAnimId = null;
let angle = 0;
let particles = [];
let particleAnimId = null;
let activeTimeouts = [];
let ringBusy = false, ringTimer = null;

const CORRECT_CODE = '2365';
const DIGIT_FREQS = [523.25, 587.33, 659.25, 783.99];

function updateMuteIcon() {
    if (sound.muted) {
        speakerIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        muteToggle.title = 'Unmute audio';
        speakerIcon.style.opacity = '1';
    } else {
        speakerIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        muteToggle.title = 'Toggle audio';
        speakerIcon.style.opacity = '1';
    }
}

muteToggle.addEventListener('click', () => {
    sound.muted = !sound.muted;
    updateMuteIcon();
    if (!sound.muted) {
        sound.playTick(523, 'sine', 0.05, 0.05);
    }
});

document.addEventListener('click', (e) => {
    sound.init();
    if (state === 'idle' || state === 'typing') {
        if (!e.target.closest('.card-wrapper')) return;
        realInput.focus();
    }
});

digitBoxes.forEach((box, idx) => {
    box.addEventListener('click', () => {
        sound.init();
        if (state === 'idle' || state === 'typing') {
            activeIndex = Math.min(idx, otpValues.filter(v => v !== '').length);
            realInput.focus();
            updateDisplay();
        }
    });
});

realInput.addEventListener('input', (e) => {
    sound.init();
    let inputType = e.inputType;
    let val = realInput.value.replace(/\D/g, '');
    if (inputType === 'deleteContentBackward' || val.length < otpValues.filter(v=>v!=='').length) {
        handleBackspace();
    } else {
        handleInputString(val);
    }
});

realInput.addEventListener('keydown', (e) => {
    sound.init();
    if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeIndex > 0) {
            activeIndex--;
            updateDisplay();
        }
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeIndex < 3) {
            activeIndex++;
            updateDisplay();
        }
    }
});

function handleBackspace() {
    if (state !== 'idle' && state !== 'typing') return;
    if (activeIndex > 0 || otpValues[activeIndex] !== '') {
        if (otpValues[activeIndex] !== '') {
            otpValues[activeIndex] = '';
        } else if (activeIndex > 0) {
            activeIndex--;
            otpValues[activeIndex] = '';
        }
        sound.playTick(330, 'sine', 0.04, 0.08);
        updateDisplay();
    }
}

function handleInputString(str) {
    if (state !== 'idle' && state !== 'typing') return;
    state = 'typing';

    const cleanStr = str.slice(0, 4);
    const prevFilledCount = otpValues.filter(v => v !== '').length;
    otpValues = ['', '', '', ''];

    for (let i = 0; i < cleanStr.length; i++) {
        otpValues[i] = cleanStr[i];
        if (i >= prevFilledCount) {
            sound.playTick(DIGIT_FREQS[i] || 660, 'sine', 0.05, 0.1);
            triggerRingBurst(i);
        }
    }
    activeIndex = Math.min(cleanStr.length, 3);
    if (cleanStr.length === 0) activeIndex = 0;

    updateDisplay();

    if (cleanStr.length === 4) {
        realInput.blur();
        processCompletion();
    }
}

function moveRing(i) {
    const b = digitBoxes[i];
    if (b) focusRing.style.transform = `translateX(${b.offsetLeft - 2}px)`;
}

// Ring spins ONLY on the box receiving the digit, then glides (static) to the next one
function triggerRingBurst(i = activeIndex) {
    clearTimeout(ringTimer);
    ringBusy = true;
    moveRing(i);
    focusRing.classList.remove('spin');
    void focusRing.offsetWidth;
    focusRing.classList.add('spin');
    digitBoxes[i]?.animate(
        [{ transform: 'scale(.92)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
        { duration: 300, easing: 'ease-out' }
    );
    ringTimer = setTimeout(() => {
        focusRing.classList.remove('spin');
        ringBusy = false;
        moveRing(activeIndex);
    }, 620);
    activeTimeouts.push(ringTimer);
}

function updateDisplay() {
    // Position focus ring smoothly using offsetLeft
    if (!ringBusy) moveRing(activeIndex);

    digitBoxes.forEach((box, idx) => {
        box.classList.remove('active', 'error', 'filled');
        const valContainer = box.querySelector('.digit-value');
        const indicator = box.querySelector('.cursor-line, .empty-circle');

        if (otpValues[idx] !== '') {
            box.classList.add('filled');
            if (!valContainer) {
                box.innerHTML = `<span class="digit-value">${otpValues[idx]}</span>`;
            } else if (valContainer.textContent !== otpValues[idx]) {
                valContainer.textContent = otpValues[idx];
            }
        } else {
            if (valContainer) valContainer.remove();
            if (idx === activeIndex && (state === 'idle' || state === 'typing')) {
                box.classList.add('active');
                if (!indicator) {
                    if (idx === 0 && otpValues.every(v => v === '')) {
                        box.innerHTML = `<div class="empty-circle"></div>`;
                    } else {
                        box.innerHTML = `<div class="cursor-line"></div>`;
                    }
                }
            } else {
                if (indicator) indicator.remove();
            }
        }
    });
    realInput.value = otpValues.join('');
}

// Fill Button action (Phase 1 auto-fill)
fillBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.init();
    if (state !== 'idle' && state !== 'typing') return;

    fillBtn.disabled = true;
    let currentIdx = 0;

    const interval = setInterval(() => {
        if (currentIdx < 4) {
            otpValues[currentIdx] = CORRECT_CODE[currentIdx];
            sound.playCascade(currentIdx);
            activeIndex = currentIdx;
            triggerRingBurst();
            updateDisplay();

            digitBoxes[currentIdx].style.transform = 'scale(1.1)';
            activeTimeouts.push(setTimeout(() => {
                digitBoxes[currentIdx].style.transform = 'scale(1)';
            }, 150));

            currentIdx++;
        } else {
            clearInterval(interval);
            realInput.blur();
            processCompletion();
        }
    }, 90);
});

// Process Completion & Transition to Phase 2 & 3
function processCompletion() {
    const enteredCode = otpValues.join('');

    if (enteredCode === CORRECT_CODE) {
        state = 'orbit';

        notificationBar.classList.add('hidden');
        countdownArea.classList.add('visible');
        startCountdown();

        // 4th digit extra burst / delay
        activeTimeouts.push(setTimeout(() => {
            sound.playWhoosh();
            transitionToOrbit();
        }, 720));

    } else {
        state = 'error';
        sound.playError();

        digitBoxes.forEach(box => box.classList.add('error'));
        focusRing.classList.add('error');

        activeTimeouts.push(setTimeout(() => {
            digitBoxes.forEach(box => box.classList.remove('error'));
            focusRing.classList.remove('error', 'spin');
            clearTimeout(ringTimer); ringBusy = false;
            otpValues = ['', '', '', ''];
            activeIndex = 0;
            state = 'typing';
            updateDisplay();
            realInput.focus();
        }, 600));
    }
}

// Countdown logic
function startCountdown() {
    timeLeft = 24;
    timerSec.textContent = timeLeft;
    resendLink.classList.add('disabled');

    if (countdownTimer) clearInterval(countdownTimer);

    countdownTimer = setInterval(() => {
        timeLeft--;
        timerSec.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            resendLink.classList.remove('disabled');
        }
    }, 1000);
}

resendLink.addEventListener('click', (e) => {
    if (resendLink.classList.contains('disabled')) return;
    sound.playTick(700, 'sine', 0.05, 0.1);
    startCountdown();
});

// Transition to Orbit Formation (Phase 2 & 3 with real travel)
function transitionToOrbit() {
    focusRing.style.opacity = '0';
    digitsGrid.style.opacity = '0';
    digitsGrid.style.transform = 'scale(0.8)';
    digitsGrid.style.pointerEvents = 'none';

    activeTimeouts.push(setTimeout(() => {
        orbitArea.classList.add('visible');
        startOrbitAnimation();
    }, 300));

    activeTimeouts.push(setTimeout(() => {
        triggerConvergence();
    }, 1800));
}

// Orbit loop + real convergence (items spiral into the center, accelerating)
let convergeStart = 0, merged = false;
function startOrbitAnimation() {
    angle = 0; convergeStart = 0; merged = false;
    const R = 52, C = 75;

    function animateOrbit() {
        if (state !== 'orbit' && state !== 'verifying') return;
        let r = R, sp = 0.025, sc = 1;
        if (convergeStart) {
            const t = Math.min(1, (performance.now() - convergeStart) / 650), e = t * t * t;
            r = R * (1 - e); sp = 0.025 + e * 0.35; sc = 1 - 0.45 * e;
            if (t >= 1 && !merged) { merged = true; finishConvergence(); return; }
        }
        angle += sp;
        for (let i = 0; i < 4; i++) {
            const ia = angle + i * Math.PI / 2;
            orbitItems[i].style.left = `${C + Math.cos(ia) * r - 20}px`;
            orbitItems[i].style.top = `${C + Math.sin(ia) * r - 20}px`;
            orbitItems[i].style.transform = `scale(${sc})`;
        }
        orbitAnimId = requestAnimationFrame(animateOrbit);
    }
    animateOrbit();
}

function triggerConvergence() {
    state = 'verifying';
    sound.playConvergence();
    orbitRing.classList.add('success');
    orbitCenterDot.classList.add('success');
    orbitItems.forEach(item => item.classList.add('success'));
    convergeStart = performance.now();
}

// Grand finale: flash + boom + ripples + halos + 2-wave particles + card aura + title shine
function finishConvergence() {
    orbitArea.classList.remove('visible');
    mergeFlash.classList.add('go');
    document.getElementById('otpCard').classList.add('celebrate');
    convergedBox.classList.add('active');
    sound.playBoom();
    sound.playSuccess();
    triggerRipples();
    createParticles();
    [halo1, halo2].forEach((h, i) => activeTimeouts.push(setTimeout(() => h.classList.add('on'), 350 + i * 180)));

    activeTimeouts.push(setTimeout(() => {
        state = 'success';
        cardTitle.style.opacity = '0';
        activeTimeouts.push(setTimeout(() => {
            cardTitle.textContent = 'Verified successfully';
            cardTitle.style.color = 'var(--success-color)';
            cardTitle.classList.add('title-success');
            cardTitle.style.opacity = '1';
        }, 250));
        cardSubtitle.textContent = 'Your number has been verified.';
        countdownArea.classList.remove('visible');
        successFooterArea.classList.add('visible');
        replayBtn.style.display = 'inline-block';
    }, 450));
}

function triggerRipples() {
    [ripple1, ripple2, ripple3].forEach((r, i) => activeTimeouts.push(setTimeout(() => r.classList.add('animate'), i * 260)));
}

// Particles: additive glow, 4-point sparkles, two bursts, soft floaters at the end
function createParticles() {
    const c = particleCanvas, ctx = c.getContext('2d'), dpr = window.devicePixelRatio || 1;
    c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = c.offsetWidth, H = c.offsetHeight, cx = W / 2, cy = H / 2;
    const cols = ['#2ee6a6', '#6ef3c5', '#ffffff', '#2ee6a6'];
    let floaters = 0, pending = true;
    particles = [];

    const burst = (n, s0, s1) => {
        for (let i = 0; i < n; i++) {
            const a = Math.random() * 6.283, sp = s0 + Math.random() * (s1 - s0);
            particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                r: 1.2 + Math.random() * 2.6, a: 1, ba: 1, d: 0.009 + Math.random() * 0.012,
                col: cols[i % 4], star: Math.random() < 0.3, fl: false, tw: Math.random() * 6.28 });
        }
    };
    burst(40, 2, 7);
    activeTimeouts.push(setTimeout(() => { burst(24, 1, 4); pending = false; }, 220));

    const drawStar = (x, y, r) => {
        const k = r * 2.4;
        ctx.beginPath();
        ctx.moveTo(x, y - k); ctx.quadraticCurveTo(x, y, x + k, y);
        ctx.quadraticCurveTo(x, y, x, y + k); ctx.quadraticCurveTo(x, y, x - k, y);
        ctx.quadraticCurveTo(x, y, x, y - k); ctx.fill();
    };

    function render() {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        particles.forEach(p => {
            if (!p.fl) {
                if (p.a <= 0) return;
                p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; p.vy += 0.02; p.a -= p.d;
                if (p.a <= 0) {
                    if (floaters < 10) {
                        floaters++; p.fl = true; p.ba = 0.3 + Math.random() * 0.3; p.a = p.ba;
                        p.vx = (Math.random() - 0.5) * 0.25; p.vy = (Math.random() - 0.5) * 0.25;
                    } else return;
                }
            } else {
                p.x += p.vx; p.y += p.vy; p.tw += 0.04;
                if (p.x < 10 || p.x > W - 10) p.vx *= -1;
                if (p.y < 10 || p.y > H - 10) p.vy *= -1;
                p.a = p.ba * (0.6 + 0.4 * Math.sin(p.tw));
            }
            ctx.globalAlpha = Math.max(0, p.a);
            ctx.fillStyle = p.col; ctx.shadowColor = p.col; ctx.shadowBlur = 10;
            if (p.star) drawStar(p.x, p.y, p.r);
            else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
        });
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
        particleAnimId = requestAnimationFrame(render);
    }
    render();
}

// Continue / Replay Buttons handler
continueBtn.addEventListener('click', () => {
    sound.playTick(880, 'sine', 0.06, 0.1);
    resetAll();
});

replayBtn.addEventListener('click', () => {
    sound.playTick(880, 'sine', 0.06, 0.1);
    resetAll();
});

function resetAll() {
    activeTimeouts.forEach(t => clearTimeout(t));
    activeTimeouts = [];
    if (countdownTimer) clearInterval(countdownTimer);
    if (orbitAnimId) cancelAnimationFrame(orbitAnimId);
    if (particleAnimId) cancelAnimationFrame(particleAnimId);

    const canvas = particleCanvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    state = 'idle';
    otpValues = ['', '', '', ''];
    activeIndex = 0;

    cardTitle.textContent = 'Verify your number';
    cardTitle.style.color = 'var(--text-primary)';
    cardTitle.style.opacity = '1';
    cardSubtitle.innerHTML = 'Enter the 4-digit code we sent to <strong>+51 934 ••• 0142</strong>.';
    replayBtn.style.display = 'none';

    focusRing.style.opacity = '1';
    focusRing.classList.remove('error');
    digitsGrid.style.opacity = '1';
    digitsGrid.style.transform = 'scale(1)';
    digitsGrid.style.pointerEvents = 'auto';

    orbitArea.classList.remove('visible');
    orbitRing.classList.remove('success');
    orbitCenterDot.classList.remove('success');
    orbitItems.forEach(item => {
        item.classList.remove('success');
        item.style.top = '';
        item.style.left = '';
        item.style.transform = '';
    });

    convergedBox.classList.remove('active');
    ripple1.classList.remove('animate');
    ripple2.classList.remove('animate');
    ripple3.classList.remove('animate');
    halo1.classList.remove('on'); halo2.classList.remove('on');
    mergeFlash.classList.remove('go');
    document.getElementById('otpCard').classList.remove('celebrate');
    cardTitle.classList.remove('title-success');
    clearTimeout(ringTimer); ringBusy = false; focusRing.classList.remove('spin');

    notificationBar.classList.remove('hidden');
    fillBtn.disabled = false;
    countdownArea.classList.remove('visible');
    successFooterArea.classList.remove('visible');

    updateDisplay();
    realInput.focus();
}

updateDisplay();
updateMuteIcon();
setTimeout(() => {
    realInput.focus();
}, 100);