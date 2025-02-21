import { initializePlayer, movePlayer, checkSectionChange, moveToTargetPosition } from './tools.js';
import { trackKeyPresses } from './tools.js';
import { typeText } from './tools.js';

document.addEventListener('DOMContentLoaded', () => {
    const playerElement = document.getElementById('player');
    const player = {
        element: playerElement,
        x: parseFloat(getComputedStyle(playerElement).left),
        y: parseFloat(getComputedStyle(playerElement).top),
        speed: 300, //pixels per second
        isPaused: false,
        curSection: 0,
    };
    const sections = Array.from(document.querySelectorAll('.section')).map((section, index) => ({
        element: section,
        top: parseFloat(getComputedStyle(section).top),
        left: parseFloat(getComputedStyle(section).left),
        width: parseFloat(getComputedStyle(section).width),
        height: parseFloat(getComputedStyle(section).height),
        index: index,
    }));
    const keys = {};
    let lastTime = 0;

    // Main game loop
    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        movePlayer(deltaTime, player, keys, sections);
        requestAnimationFrame(gameLoop);
    }

    initializePlayer(player); // Initialize player position
    trackKeyPresses(keys); // Track key presses
    gameLoop(); // Start the game loop
});