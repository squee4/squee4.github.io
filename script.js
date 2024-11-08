document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    // Initialize player position
    player.style.top = '50%';
    player.style.left = '50%';

    // Define section positions
    const sectionPositions = [
        { top: '0%', left: '0%', width: '100%', height: '15%' },
        { top: '15%', left: '0%', width: '25%', height: '85%' },
        { top: '15%', left: '25%', width: '75%', height: '85%' },
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
        const step = 300 * deltaTime; // pixels per second
        let top = parseFloat(player.style.top) / 100 * window.innerHeight || 0;
        let left = parseFloat(player.style.left) / 100 * window.innerWidth || 0;

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
        player.style.top = `${(top / window.innerHeight) * 100}%`;
        player.style.left = `${(left / window.innerWidth) * 100}%`;
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