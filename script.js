document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    // Initialize player position
    player.style.top = '50px';
    player.style.left = '50px';

    // Define section positions
    const sectionPositions = [
        { top: '50%', left: '10%', width: '20%', height: '20%' },
        { top: '50%', left: '50%', width: '20%', height: '20%' },
        { top: '50%', left: '80%', width: '20%', height: '20%' },
    ];

    // Track key presses
    const keys = {};

    document.addEventListener('keydown', (event) => {
        keys[event.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', (event) => {
        keys[event.key.toLowerCase()] = false;
    });

    function movePlayer(deltaTime) {
        const step = 200 * deltaTime; // pixels per second
        let top = parseInt(player.style.top) || 0;
        let left = parseInt(player.style.left) || 0;

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

        player.style.top = `${top}px`;
        player.style.left = `${left}px`;

        // Check if player is in a new section
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
                currentSection.style.display = 'block';
                currentSectionIndex++;
            }
        }
    }

    let lastTime = 0;

    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        movePlayer(deltaTime);
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});