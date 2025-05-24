// Particle class
class Particle {
    constructor(x, y, dx, dy, size, color, life) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.life = life;
        this.opacity = 1;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.life--;
        this.opacity = Math.max(this.life / 100, 0);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }
}

const particles = [];

export function createParticleExplosionAnimation(dataArray, bufferLength, canvas, ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get average bass level (first 10% of frequency bins)
    let bass = 0;
    const bassCount = Math.floor(bufferLength * 0.1);
    for (let i = 0; i < bassCount; i++) {
        bass += dataArray[i];
    }
    bass = bass / bassCount;

    // If bass is above a threshold, create explosion particles
    if (bass > 180) {
        const count = 20 + Math.floor(Math.random() * 30);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particles.push(new Particle(
                canvas.width / 2,
                canvas.height / 2,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                Math.random() * 3 + 2,
                `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`,
                100
            ));
        }
    }

    // Update and draw all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}
