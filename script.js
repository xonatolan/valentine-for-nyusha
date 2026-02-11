// Элементы DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const complimentScreen = document.getElementById('complimentScreen');
const finalScreen = document.getElementById('finalScreen');
const photoScreen = document.getElementById('photoScreen');
const startBtn = document.getElementById('startBtn');
const valentinesGrid = document.getElementById('valentinesGrid');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const hintBtn = document.getElementById('hintBtn');
const musicBtn = document.getElementById('musicBtn');
const resetBtn = document.getElementById('resetBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const backToGiftBtn = document.getElementById('backToGiftBtn');
const restartFromPhotoBtn = document.getElementById('restartFromPhotoBtn');
const collectedCount = document.getElementById('collectedCount');
const giftBox = document.getElementById('giftBox');
const giftContainer = document.getElementById('giftContainer');
const photoWrapper = document.getElementById('photoWrapper');

// Аудио элементы
const backgroundMusic = document.getElementById('backgroundMusic');
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const giftSound = document.getElementById('giftSound');
const sparkleSound = document.getElementById('sparkleSound');

// Состояние игры
let gameState = {
    foundValentines: [],
    currentCompliment: null,
    musicEnabled: false,
    totalValentines: compliments.length,
    giftOpened: false
};

// Инициализация игры
function initGame() {
    gameState.foundValentines = [];
    gameState.giftOpened = false;
    updateProgress();
    createValentinesGrid();
    createBackgroundHearts();
    showScreen(welcomeScreen);
    
    // Сброс анимации подарка
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.style.animation = 'giftFloat 3s ease-in-out infinite';
    }
}

// Создание летающих сердечек на фоне
function createBackgroundHearts() {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    backgroundAnimation.innerHTML = '';
    
    // Создаем 20 летающих сердечек
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = ['💖', '💕', '💞', '💓', '💗', '💘', '💝', '💟'][Math.floor(Math.random() * 8)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 40 + 20}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: bgHeartFloat ${Math.random() * 30 + 20}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            filter: blur(${Math.random() * 2}px);
            z-index: -1;
        `;
        backgroundAnimation.appendChild(heart);
    }
    
    // Добавляем анимацию для фоновых сердечек
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bgHeartFloat {
            0% {
                transform: 
                    translate(
                        ${Math.random() * 200 - 100}px,
                        ${Math.random() * 200 - 100}px
                    )
                    rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: ${Math.random() * 0.5 + 0.2};
            }
            90% {
                opacity: ${Math.random() * 0.5 + 0.2};
            }
            100% {
                transform: 
                    translate(
                        ${Math.random() * 400 - 200}px,
                        ${Math.random() * 400 - 200}px
                    )
                    rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Показать определенный экран
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.add('hidden');
        s.style.display = 'none';
    });
    screen.classList.remove('hidden');
    screen.style.display = 'block';
    
    // Добавляем анимацию появления
    screen.style.animation = 'none';
    setTimeout(() => {
        screen.style.animation = 'fadeIn 0.8s ease';
    }, 10);
}

// Создание сетки валентинок
function createValentinesGrid() {
    valentinesGrid.innerHTML = '';
    
    // Перемешиваем валентинки
    const shuffledValentines = [...compliments].sort(() => Math.random() - 0.5);
    
    shuffledValentines.forEach((valentine, index) => {
        const card = document.createElement('div');
        card.className = 'valentine-card';
        card.dataset.id = valentine.number;
        
        // Случайная задержка анимации
        const animationDelay = Math.random() * 2;
        card.style.animationDelay = `${animationDelay}s`;
        
        // Добавляем блестки
        if (Math.random() > 0.6) {
            addSparkles(card);
        }
        
        const heart = document.createElement('div');
        heart.className = 'valentine-heart-big';
        heart.textContent = valentine.heart;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        const number = document.createElement('div');
        number.className = 'valentine-number';
        number.textContent = `#${valentine.number}`;
        
        card.appendChild(heart);
        card.appendChild(number);
        
        // Обработчик клика
        if (!gameState.foundValentines.includes(valentine.number)) {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                openValentine(valentine, e);
            });
        } else {
            card.classList.add('found');
            heart.style.opacity = '0.7';
            card.style.cursor = 'default';
            card.style.animation = 'none';
        }
        
        valentinesGrid.appendChild(card);
    });
}

// Добавление блесток к элементу
function addSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.9), 
                rgba(255, 215, 0, 0.8), 
                transparent);
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkleTwinkle ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        element.appendChild(sparkle);
    }
    
    // Добавляем стили для анимации блесток
    const style = document.createElement('style');
    if (!document.querySelector('#sparkleStyles')) {
        style.id = 'sparkleStyles';
        style.textContent = `
            @keyframes sparkleTwinkle {
                0%, 100% { 
                    opacity: 0; 
                    transform: scale(0) rotate(0deg); 
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1) rotate(180deg); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Открытие валентинки
function openValentine(valentine, event) {
    playSound(clickSound);
    
    // Создаем эффект взрыва сердечек
    createHeartExplosion(event.clientX, event.clientY);
    
    // Помечаем как найденную
    if (!gameState.foundValentines.includes(valentine.number)) {
        gameState.foundValentines.push(valentine.number);
        updateProgress();
        playSound(successSound);
        showNotification(`✨ Найдена валентинка #${valentine.number}! ✨`, 'success');
        
        // Добавляем эффект к найденной карточке
        const card = document.querySelector(`[data-id="${valentine.number}"]`);
        if (card) {
            card.classList.add('found');
            createSparkleBurst(card);
        }
    }
    
    // Показываем комплимент
    gameState.currentCompliment = valentine;
    showComplimentScreen(valentine);
}

// Создание взрыва сердечек
function createHeartExplosion(x, y) {
    const hearts = ['💖', '💕', '💞', '💓', '💗', '💘', '💝'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10000;
            animation: heartExplode 1s ease-out forwards;
            animation-delay: ${Math.random() * 0.3}s;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
    
    // Добавляем стили для анимации взрыва
    const style = document.createElement('style');
    if (!document.querySelector('#explosionStyles')) {
        style.id = 'explosionStyles';
        style.textContent = `
            @keyframes heartExplode {
                0% {
                    opacity: 1;
                    transform: 
                        translate(0, 0) 
                        scale(1) 
                        rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: 
                        translate(
                            ${Math.random() * 200 - 100}px,
                            ${Math.random() * 200 - 100}px
                        ) 
                        scale(0) 
                        rotate(${Math.random() * 360}deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Создание взрыва блесток
function createSparkleBurst(element) {
    playSound(sparkleSound);
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.9), 
                rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100}, 0.8), 
                transparent);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleBurst 1s ease-out forwards;
            animation-delay: ${Math.random() * 0.2}s;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Добавляем стили для анимации взрыва блесток
    const style = document.createElement('style');
    if (!document.querySelector('#burstStyles')) {
        style.id = 'burstStyles';
        style.textContent = `
            @keyframes sparkleBurst {
                0% {
                    opacity: 1;
                    transform: 
                        translate(0, 0) 
                        scale(1);
                }
                100% {
                    opacity: 0;
                    transform: 
                        translate(
                            ${Math.random() * 150 - 75}px,
                            ${Math.random() * 150 - 75}px
                        ) 
                        scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Показать экран с комплиментом
function showComplimentScreen(valentine) {
    document.getElementById('valentineNumber').textContent = `Валентинка #${valentine.number}`;
    document.getElementById('valentineHeart').textContent = valentine.heart;
    document.getElementById('complimentText').innerHTML = `
        <h3>${valentine.title}</h3>
        <p>${valentine.text}</p>
    `;
    
    // Добавляем летающие сердечки вокруг комплимента
    createFlyingHeartsAround('.compliment-text', 10);
    
    showScreen(complimentScreen);
}

// Создание летающих сердечек вокруг элемента
function createFlyingHeartsAround(selector, count) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '💕', '💞', '💓'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            pointer-events: none;
            z-index: 9998;
            animation: flyAround 10s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0.7;
        `;
        document.body.appendChild(heart);
        
        // Удаляем через время
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 10000);
    }
    
    // Добавляем стили для анимации полета
    const style = document.createElement('style');
    if (!document.querySelector('#flyAroundStyles')) {
        style.id = 'flyAroundStyles';
        style.textContent = `
            @keyframes flyAround {
                0% {
                    transform: 
                        translate(0, 0) 
                        rotate(0deg);
                }
                25% {
                    transform: 
                        translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) 
                        rotate(90deg);
                }
                50% {
                    transform: 
                        translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) 
                        rotate(180deg);
                }
                75% {
                    transform: 
                        translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) 
                        rotate(270deg);
                }
                100% {
                    transform: 
                        translate(0, 0) 
                        rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Обновление прогресса
function updateProgress() {
    const foundCount = gameState.foundValentines.length;
    const totalCount = gameState.totalValentines;
    const percentage = (foundCount / totalCount) * 100;
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${foundCount}/${totalCount}`;
    collectedCount.textContent = foundCount;
    
    // Анимация прогресса
    if (foundCount > 0) {
        progressBar.style.animation = 'progressGlow 2s linear infinite';
    }
    
    // Проверка на завершение (ВМЕСТО АВТОМАТИЧЕСКОГО ПЕРЕХОДА)
    if (foundCount === totalCount) {
        showCompleteSection();
        createSparkleBurst(progressBar);
    } else {
        hideCompleteSection();
    }
}

// Показать секцию с кнопкой завершения
function showCompleteSection() {
    const completeSection = document.getElementById('completeSection');
    if (completeSection) {
        completeSection.classList.remove('hidden');
        completeSection.style.display = 'block';
        completeSection.style.animation = 'fadeIn 0.8s ease';
        
        // Создаем эффект праздника
        createConfetti();
        playSound(successSound);
        
        // Добавляем блестки
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkleBurst(completeSection);
            }, i * 100);
        }
    }
}

// Скрыть секцию с кнопкой завершения
function hideCompleteSection() {
    const completeSection = document.getElementById('completeSection');
    if (completeSection) {
        completeSection.classList.add('hidden');
        completeSection.style.display = 'none';
    }
}

// Добавляем обработчик для кнопки завершения
function initCompleteButton() {
    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            playSound(clickSound);
            createHeartExplosion(completeBtn.getBoundingClientRect().left + 100, 
                               completeBtn.getBoundingClientRect().top + 25);
            
            setTimeout(() => {
                showScreen(finalScreen);
                playSound(successSound);
                createFlyingHeartsAround('.final-content', 20);
            }, 300);
        });
    }
}	

// Создание конфетти
function createConfetti() {
    const colors = ['#ff6b8b', '#ff8e53', '#ffd166', '#06d6a0', '#118ab2', '#9d4edd'];
    const shapes = ['circle', 'square', 'triangle', 'heart'];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        const isHeart = Math.random() > 0.7;
        
        if (isHeart) {
            confetti.innerHTML = ['💖', '💕', '💞', '💓'][Math.floor(Math.random() * 4)];
            confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
        } else {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 15 + 5}px`;
            confetti.style.height = `${Math.random() * 15 + 5}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        }
        
        confetti.style.cssText += `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            animation-delay: ${Math.random() * 1}s;
            ${!isHeart ? `transform: rotate(${Math.random() * 360}deg);` : ''}
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) confetti.remove();
        }, 5000);
    }
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(107, 255, 139, 0.95)' : 'rgba(255, 107, 139, 0.95)'};
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        font-weight: bold;
        font-family: 'Comfortaa', cursive;
        backdrop-filter: blur(10px);
        border: 2px solid ${type === 'success' ? '#6bff8b' : '#ff6b8b'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Воспроизведение звука
function playSound(soundElement) {
    if (!soundElement) return;
    
    soundElement.currentTime = 0;
    soundElement.play().catch(e => {
        console.log("Звук не воспроизведен:", e);
    });
}

// Открытие подарка
function openGift() {
    if (gameState.giftOpened) return;
    
    gameState.giftOpened = true;
    playSound(giftSound);
    
    // Анимация открытия подарка
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.style.animation = 'openGift 1s ease forwards';
    }
    
    // Создаем эффект взрыва блесток
    createSparkleBurst(giftContainer);
    
    // Показываем экран с фото через 1 секунду
    setTimeout(() => {
        showPhotoScreen();
    }, 1000);
    
    // Добавляем стили для анимации открытия подарка
    const style = document.createElement('style');
    if (!document.querySelector('#openGiftStyles')) {
        style.id = 'openGiftStyles';
        style.textContent = `
            @keyframes openGift {
                0% {
                    transform: scale(1) rotateX(0);
                }
                50% {
                    transform: scale(1.2) rotateX(180deg);
                }
                100% {
                    transform: scale(0) rotateX(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Показать экран с фото
function showPhotoScreen() {
    showScreen(photoScreen);
    
    // Создаем эффект появления фото
    const photo = document.querySelector('.surprise-photo');
    if (photo) {
        photo.style.animation = 'photoReveal 2s ease forwards';
    }
    
    // Создаем много летающих сердечек
    createFlyingHeartsAround('.photo-content', 30);
    
    // Анимация бантика
    const bow = document.querySelector('.photo-bow');
    if (bow) {
        bow.style.animation = 'bowFloat 3s ease-in-out infinite, rotate 10s linear infinite';
    }
}

// Обработчики событий
startBtn.addEventListener('click', () => {
    playSound(clickSound);
    createHeartExplosion(startBtn.getBoundingClientRect().left + 50, startBtn.getBoundingClientRect().top + 25);
    setTimeout(() => {
        showScreen(gameScreen);
        createValentinesGrid();
    }, 500);
});

nextBtn.addEventListener('click', () => {
    playSound(clickSound);
    createHeartExplosion(nextBtn.getBoundingClientRect().left + 100, nextBtn.getBoundingClientRect().top + 25);
    setTimeout(() => {
        showScreen(gameScreen);
    }, 300);
});

hintBtn.addEventListener('click', () => {
    playSound(clickSound);
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    showNotification(randomHint);
    createSparkleBurst(hintBtn);
});

musicBtn.addEventListener('click', () => {
    playSound(clickSound);
    if (gameState.musicEnabled) {
        backgroundMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i> Включить музыку';
        musicBtn.classList.remove('active');
    } else {
        backgroundMusic.play().catch(e => {
            console.log("Не удалось включить музыку:", e);
            showNotification("Нажмите еще раз для включения музыки 🎵");
        });
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> Выключить музыку';
        musicBtn.classList.add('active');
    }
    gameState.musicEnabled = !gameState.musicEnabled;
});

resetBtn.addEventListener('click', () => {
    playSound(clickSound);
    if (confirm("Начать игру заново?")) {
        initGame();
    }
});

restartBtn.addEventListener('click', () => {
    playSound(clickSound);
    createHeartExplosion(restartBtn.getBoundingClientRect().left + 100, restartBtn.getBoundingClientRect().top + 25);
    setTimeout(() => {
        initGame();
    }, 300);
});

backToGiftBtn.addEventListener('click', () => {
    playSound(clickSound);
    showScreen(finalScreen);
});

restartFromPhotoBtn.addEventListener('click', () => {
    playSound(clickSound);
    createHeartExplosion(restartFromPhotoBtn.getBoundingClientRect().left + 100, restartFromPhotoBtn.getBoundingClientRect().top + 25);
    setTimeout(() => {
        initGame();
    }, 300);
});

// Обработчик открытия подарка
giftContainer.addEventListener('click', (e) => {
    if (!gameState.giftOpened && gameState.foundValentines.length === gameState.totalValentines) {
        openGift();
    } else if (!gameState.giftOpened) {
        showNotification("Собери все валентинки сначала! 💝", "info");
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    initCompleteButton(); // ДОБАВЛЯЕМ ЭТУ СТРОЧКУ
    
    // Включаем музыку при первом взаимодействии
    document.addEventListener('click', () => {
        if (!gameState.musicEnabled) {
            backgroundMusic.play().catch(e => {
                console.log("Автовоспроизведение заблокировано");
            });
        }
    }, { once: true });
    
    // Добавляем плавающие иконки
    createFloatingIcons();
});

// Создание плавающих иконок
function createFloatingIcons() {
    const icons = ['🌸', '💖', '🌟', '🌹', '💕', '✨', '🎀', '💫'];
    const container = document.querySelector('.floating-icons') || document.body;
    
    for (let i = 0; i < 8; i++) {
        const icon = document.createElement('span');
        icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        icon.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 20}px;
            opacity: ${Math.random() * 0.4 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatIcon ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: -1;
        `;
        container.appendChild(icon);
    }
    
    // Добавляем стили для анимации иконок
    const style = document.createElement('style');
    if (!document.querySelector('#floatIconStyles')) {
        style.id = 'floatIconStyles';
        style.textContent = `
            @keyframes floatIcon {
                0% {
                    transform: 
                        translate(0, 0) 
                        rotate(0deg);
                }
                100% {
                    transform: 
                        translate(
                            ${Math.random() * 300 - 150}px,
                            ${Math.random() * 300 - 150}px
                        ) 
                        rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Добавляем эффект параллакса на прокрутку
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-animation');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});