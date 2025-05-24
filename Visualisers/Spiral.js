let angleOffset = 0;

export function createSpiralVisualizer(dataArray, bufferLength, canvas, ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2.5;

    angleOffset += 0.01; // slowly rotate spiral over time

    for (let i = 0; i < bufferLength; i++) {
        const angle = i * 0.15 + angleOffset; // angle step controls spiral tightness
        const radius = (dataArray[i] / 255) * maxRadius;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const hue = (i * 3 + angleOffset * 100) % 360;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.fill();
    }
}
