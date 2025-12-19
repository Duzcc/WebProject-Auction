/**
 * Confetti Effect Utility
 * Pure JavaScript confetti celebration for success moments
 */

/**
 * Throw confetti celebration
 * @param {Object} options - Confetti configuration
 */
export function throwConfetti({
    particleCount = 100,
    spread = 70,
    origin = { x: 0.5, y: 0.5 },
    colors = ['#0078D4', '#00BCF2', '#50E6FF', '#FFB900', '#00CC6A'],
    duration = 3000
} = {}) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
        const velocity = 5 + Math.random() * 5;

        particles.push({
            x: canvas.width * origin.x,
            y: canvas.height * origin.y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 5 + Math.random() * 5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }

    let startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        if (elapsed > duration) {
            canvas.remove();
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3; // Gravity
            p.vx *= 0.99; // Air resistance
            p.rotation += p.rotationSpeed;

            // Draw particle
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            // Fade out near end
            const fadeStart = duration * 0.7;
            if (elapsed > fadeStart) {
                const fadeProgress = (elapsed - fadeStart) / (duration - fadeStart);
                canvas.style.opacity = 1 - fadeProgress;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Multiple confetti bursts
 * @param {number} count - Number of bursts
 * @param {number} interval - Interval between bursts (ms)
 */
export function celebrateWithConfetti(count = 3, interval = 300) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // Random origins for variety
            const origins = [
                { x: 0.3, y: 0.6 },
                { x: 0.5, y: 0.4 },
                { x: 0.7, y: 0.6 }
            ];
            throwConfetti({
                origin: origins[i % origins.length],
                particleCount: 50
            });
        }, i * interval);
    }
}

/**
 * Success confetti (single burst from center)
 */
export function successConfetti() {
    throwConfetti({
        particleCount: 150,
        spread: 90,
        origin: { x: 0.5, y: 0.3 }
    });
}

export default {
    throwConfetti,
    celebrateWithConfetti,
    successConfetti
};
