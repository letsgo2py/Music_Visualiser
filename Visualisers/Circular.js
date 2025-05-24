export function createCircularAnimation(dataArray, bufferLength, canvas, ctx) {
    let rotation = 0; // 🌟 For smooth rotation

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 🌟 Calculate average bass to make it bounce
    const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
    const bounce = bass / 10; // adjust multiplier for effect strength

    const baseRadius = 100;
    const radius = baseRadius + bounce; // 💥 Bounce effect

    const bars = bufferLength;
    const angleStep = (Math.PI * 2) / bars;

    rotation += 0.003; // 🔥 Slow rotation

    ctx.save();
    // By default, the canvas coordinate system has the origin (0, 0) at the top-left corner.
    // the origin becomes the point (centerX, centerY).
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    for (let i = 0; i < bars; i++) {
        const value = dataArray[i];
        const barHeight = value * 1.2;

        const angle = i * angleStep;
        
        // polar coordinates to cartesian coordinates
        // x = r * cos(θ)
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle) * (radius + barHeight);
        const y2 = Math.sin(angle) * (radius + barHeight);

        // Dynamic color based on value
        const hue = i * 360 / bars;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.strokeStyle;

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.restore();
}
