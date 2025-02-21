export function initializePlayer(player) {
    player.element.style.top = '50%';
    player.element.style.left = '50%';
}

export function trackKeyPresses(keys) {
    document.addEventListener('keydown', (event) => {
        keys[event.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', (event) => {
        keys[event.key.toLowerCase()] = false;
    });
}

export function typeText(element, text) {
    let index = 0;
    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            if (text.charAt(index - 1) === ' ') {
                typeNextChar();
            } else {
                setTimeout(typeNextChar, 100); // 100ms delay between each character
            }
        }
    }
    typeNextChar();
}

export function movePlayer(deltaTime, player, keys, sections) {
    if (player.isPaused) return;

    const step = player.speed * deltaTime;
    let left = player.x || 0;
    let top = player.y || 0;

    console.log(player.x);

    if (keys['w']) {
        top = Math.max(0, top - step);
    } 
    if (keys['s']) {
        top = Math.min(window.innerHeight - player.offsetHeight, top + step);
    }
    if (keys['a']) {
        left = Math.max(0, left - step);
    } 
    if (keys['d']) {
        left = Math.min(window.innerWidth - player.offsetWidth, left + step);
    }

    player.element.style.top = `${(top / window.innerHeight) * 100}%`;
    player.element.style.left = `${(left / window.innerHeight) * 100}%`;

    //checkSectionChange(left, top, player, sections, sectionPositions, currentSectionIndex);
    //player.style.top = `${(top / window.innerHeight) * 100}%`;
    //player.style.left = `${(left / window.innerWidth) * 100}%`;
}

export function checkSectionChange(left, top, player) {
    if (currentSectionIndex < sectionPositions.length) {
        const currentSection = sections[currentSectionIndex];
        const sectionPos = sectionPositions[currentSectionIndex];

        const sectionLeft = (parseFloat(sectionPos.left) / 100) * window.innerWidth;
        const sectionTop = (parseFloat(sectionPos.top) / 100) * window.innerHeight;
        const sectionWidth = (parseFloat(sectionPos.width) / 100) * window.innerWidth;
        const sectionHeight = (parseFloat(sectionPos.height) / 100) * window.innerHeight;

        if (
            left >= sectionLeft &&
            left < sectionLeft + sectionWidth &&
            top >= sectionTop &&
            top < sectionTop + sectionHeight
        ) {
            currentSection.style.display = 'flex';
            if (currentSectionIndex === 0) {
                const titleElement = document.getElementById('title');
                typeText(titleElement, '<h1> squee4 </h1>');
            }
            moveToTargetPosition(currentSectionIndex);
            currentSectionIndex++;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
            }, 3000); // Pause for 3 seconds
        }
    }
}

export function moveToTargetPosition(sectionIndex, player) {
    let targetTop, targetLeft;
        if (sectionIndex === 0) {
            targetTop = window.innerHeight * 0.05;
            targetLeft = window.innerWidth * 0.9;
        } else if (sectionIndex === 1) {
            targetTop = window.innerHeight * 0.2;
            targetLeft = window.innerWidth * 0.05;
        } else {
            targetTop = window.innerHeight * 0.8;
            targetLeft = window.innerWidth * 0.85;
        }

        const moveInterval = setInterval(() => {
            let top = parseFloat(player.style.top) / 100 * window.innerHeight || 0;
            let left = parseFloat(player.style.left) / 100 * window.innerWidth || 0;

            const step = 5; // pixels per step

            if (top < targetTop) top = Math.min(targetTop, top + step);
            if (top > targetTop) top = Math.max(targetTop, top - step);
            if (left < targetLeft) left = Math.min(targetLeft, left + step);
            if (left > targetLeft) left = Math.max(targetLeft, left - step);

            player.style.top = `${(top / window.innerHeight) * 100}%`;
            player.style.left = `${(left / window.innerWidth) * 100}%`;

            if (top === targetTop && left === targetLeft) {
                clearInterval(moveInterval);
            }
        }, 10); // Move every 10ms
}
