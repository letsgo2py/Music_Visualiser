export function createBarsAnimation(dataArray, bufferLength, canvas, ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
    
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 0, 150, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 200, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 255, 100, 1)');
    
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    
        x += barWidth + 1;
    }
}