document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const sections = document.querySelectorAll('.section');
    const keys = {};
    let currentSectionIndex = 0;
    let isPaused = false;

    const sectionPositions = [
        { top: '0%', left: '0%', width: '100%', height: '15%' },
        { top: '15%', left: '0%', width: '25%', height: '85%' },
        { top: '15%', left: '25%', width: '75%', height: '85%' },
    ];

    // Initialize player position
    function initializePlayer() {
        player.style.top = '50%';
        player.style.left = '50%';
    }

    // Track key presses
    function trackKeyPresses() {
        document.addEventListener('keydown', (event) => {
            keys[event.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (event) => {
            keys[event.key.toLowerCase()] = false;
        });
    }

    // Function to type text with a delay
    function typeText(element, text) {
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

    // Function to move the player
    function movePlayer(deltaTime) {
        if (isPaused) return;

        const step = 300 * deltaTime; // pixels per second
        let top = parseFloat(player.style.top) / 100 * window.innerHeight || 0;
        let left = parseFloat(player.style.left) / 100 * window.innerWidth || 0;

        if (keys['w']) top = Math.max(0, top - step);
        if (keys['s']) top = Math.min(window.innerHeight - player.offsetHeight, top + step);
        if (keys['a']) left = Math.max(0, left - step);
        if (keys['d']) left = Math.min(window.innerWidth - player.offsetWidth, left + step);

        player.style.top = `${top}px`;
        player.style.left = `${left}px`;

        checkSectionChange(left, top);
        player.style.top = `${(top / window.innerHeight) * 100}%`;
        player.style.left = `${(left / window.innerWidth) * 100}%`;
    }

    // Function to check if the player has entered a new section
    function checkSectionChange(left, top) {
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

    // Function to move the player to a target position within the section
    function moveToTargetPosition(sectionIndex) {
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
        }, 10); // Move every 20ms
    }

    // Main game loop
    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        movePlayer(deltaTime);
        requestAnimationFrame(gameLoop);
    }

    let lastTime = 0;
    initializePlayer(); // Initialize player position
    trackKeyPresses(); // Track key presses
    gameLoop(); // Start the game loop
});