let waveStartTime = null; // Will store the animation start time

export function createWaveAnimation(dataArray, bufferLength, canvas, ctx) {
    if (!waveStartTime) {
        waveStartTime = Date.now(); // Set once at the beginning
    }

    const elapsedTime = Date.now() - waveStartTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const width = canvas.width;

    const sliceWidth = width / bufferLength;
    let x = 0;

    ctx.beginPath();
    ctx.lineWidth = 2;

    // 🎨 Toggle between 'aqua' and 'yellow' every 2 seconds
    const cycleDuration = 1000; // after each 1 second
    const colorToggle = Math.floor(elapsedTime / cycleDuration) % 2 === 0;
    const waveColor = colorToggle ? 'aqua' : 'yellow';

    ctx.strokeStyle = waveColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = waveColor;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = centerY + v * 100 * Math.sin(i * 0.1 + Date.now() * 0.005);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.stroke();
}
