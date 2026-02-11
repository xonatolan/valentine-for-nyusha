// ===== OPIUM 2026 · ПОЛНЫЙ ИНТЕРАКТИВ =====
let state = {
    found: [],
    total: 10,
    musicOn: false,
    giftOpened: false
};

// ЭЛЕМЕНТЫ
const screens = document.querySelectorAll('.screen');
const entrance = document.getElementById('entranceScreen');
const game = document.getElementById('gameScreen');
const compliment = document.getElementById('complimentScreen');
const final = document.getElementById('finalScreen');
const photo = document.getElementById('photoScreen');

const startBtn = document.getElementById('startBtn');
const grid = document.getElementById('valentineGrid');
const progressFill = document.getElementById('progressFill');
const progressSkull = document.getElementById('progressSkull');
const previewCount = document.getElementById('previewCount');
const rewardVault = document.getElementById('rewardVault');
const rewardBtn = document.getElementById('rewardBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const giftPedestal = document.getElementById('giftPedestal');
const backBtn = document.getElementById('backBtn');
const hintBtn = document.getElementById('hintBtn');
const musicBtn = document.getElementById('musicBtn');
const resetBtn = document.getElementById('resetBtn');

// АУДИО
const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxSuccess = document.getElementById('sfxSuccess');

function play(snd) { snd?.play().catch(()=>{}); }

// ===== ИНИЦИАЛИЗАЦИЯ =====
function init() {
    state.found = [];
    state.giftOpened = false;
    updateProgress();
    renderGrid();
    showScreen(entrance);
    rewardVault?.classList.add('hidden');
}

function showScreen(screen) {
    screens.forEach(s => s.classList.add('hidden'));
    screen?.classList.remove('hidden');
}

// ===== СЕТКА =====
function renderGrid() {
    grid.innerHTML = '';
    const shuffled = [...compliments].sort(() => Math.random() - 0.5);
    shuffled.forEach(v => {
        const card = document.createElement('div');
        card.className = 'valentine-card';
        if (state.found.includes(v.number)) card.classList.add('found');
        card.innerHTML = `<div class="valentine-heart-big">${v.heart}</div>
                         <div class="valentine-number">#${v.number}</div>`;
        if (!state.found.includes(v.number)) {
            card.addEventListener('click', (e) => openValentine(v, e));
        }
        grid.appendChild(card);
    });
}

// ===== ОТКРЫТИЕ ВАЛЕНТИНКИ =====
function openValentine(v, e) {
    play(sfxClick);
    if (!state.found.includes(v.number)) {
        state.found.push(v.number);
        updateProgress();
        play(sfxSuccess);
        createHeartBurst(e?.clientX || window.innerWidth/2, e?.clientY || window.innerHeight/2);
    }
    document.getElementById('complimentNumber').innerText = `#${v.number}`;
    document.getElementById('complimentHeart').innerText = v.heart;
    document.getElementById('complimentMessage').innerHTML = `<h3>${v.title}</h3><p>${v.text}</p>`;
    showScreen(compliment);
}

// ===== ПРОГРЕСС =====
function updateProgress() {
    const f = state.found.length;
    const percent = (f / state.total) * 100;
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressSkull) progressSkull.innerText = f + '/10';
    if (previewCount) previewCount.innerText = f;
    
    // ВАЖНО: кнопка появляется ТОЛЬКО после 10
    if (f === state.total) {
        rewardVault?.classList.remove('hidden');
        createConfettiBurst();
    } else {
        rewardVault?.classList.add('hidden');
    }
    
    renderGrid();
}

// ===== ВЗРЫВ СЕРДЕЦ =====
function createHeartBurst(x, y) {
    for (let i=0;i<15;i++) {
        const h = document.createElement('span');
        h.innerText = ['💗','🖤','💘','🥀'][Math.floor(Math.random()*4)];
        h.style.position = 'fixed';
        h.style.left = x + 'px';
        h.style.top = y + 'px';
        h.style.fontSize = (Math.random()*30+20) + 'px';
        h.style.pointerEvents = 'none';
        h.style.zIndex = '99999';
        h.style.animation = `floatHeart ${Math.random()*1.5+1}s ease-out forwards`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    }
}

function createConfettiBurst() {
    for (let i=0;i<40;i++) {
        setTimeout(() => {
            const h = document.createElement('span');
            h.innerText = ['💗','🖤','🎉','✨','💥'][Math.floor(Math.random()*5)];
            h.style.position = 'fixed';
            h.style.left = Math.random()*100 + 'vw';
            h.style.top = '-50px';
            h.style.fontSize = (Math.random()*40+20) + 'px';
            h.style.animation = `floatHeart ${Math.random()*2+2}s ease-in forwards`;
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 3000);
        }, i*30);
    }
}

// ===== КНОПКИ =====
startBtn?.addEventListener('click', () => {
    play(sfxClick);
    showScreen(game);
    renderGrid();
});

nextBtn?.addEventListener('click', () => {
    play(sfxClick);
    showScreen(game);
});

rewardBtn?.addEventListener('click', () => {
    play(sfxSuccess);
    showScreen(final);
});

giftPedestal?.addEventListener('click', () => {
    if (state.found.length === state.total && !state.giftOpened) {
        state.giftOpened = true;
        play(sfxSuccess);
        showScreen(photo);
    }
});

backBtn?.addEventListener('click', () => {
    play(sfxClick);
    showScreen(final);
});

restartBtn?.addEventListener('click', () => {
    play(sfxClick);
    init();
});

hintBtn?.addEventListener('click', () => {
    play(sfxClick);
    alert(hints[Math.floor(Math.random() * hints.length)]);
});

musicBtn?.addEventListener('click', () => {
    if (state.musicOn) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-headphones"></i> САУНД';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> ТИШИНА';
    }
    state.musicOn = !state.musicOn;
});

resetBtn?.addEventListener('click', () => {
    if (confirm('СТЕРЕТЬ ПРОГРЕСС?')) init();
});

// ===== КУРСОР =====
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursorNeon');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// СТАРТ
document.addEventListener('DOMContentLoaded', init);
