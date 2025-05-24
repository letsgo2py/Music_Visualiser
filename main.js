import { createCircularAnimation } from './Visualisers/Circular.js'
import { createBarsAnimation } from './Visualisers/Bars.js'
import { createWaveAnimation } from './Visualisers/Waves.js'
import { createParticleExplosionAnimation } from './Visualisers/Particles.js'

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioFileInput = document.getElementById('audioFile');
const divToHide = document.querySelector('.hideDiv');

const canvasDiv = document.querySelector('.canvas-div');

// Adjust canvas size
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// Handle resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

audioFileInput.addEventListener('change', function () {
    const file = audioFileInput.files[0];
    const fileNameElement = document.getElementById('fileName');
    if (file) {
        fileNameElement.textContent = `${file.name} ✅`;
    } else {
        fileNameElement.textContent = '';
    }
});

const themes = document.querySelectorAll('.theme-div');
const Button = document.querySelector('.btn');

let selectedTheme = null; // No theme
let selectedThemeName;

themes.forEach((theme) => {
    theme.addEventListener('click', (e) => {
        themes.forEach(t => t.classList.remove('Selected'));
        selectedTheme = e.currentTarget;
        selectedTheme.classList.add('Selected');
        selectedThemeName = selectedTheme.getAttribute('id');
    })
})

// audioFileInput.addEventListener('change', function() {
Button.addEventListener('click', function() {
    if(!selectedTheme) {
        alert('Please select a theme first!');
        return;
    }

    // file is the JS file object selected by the user conatins the file information like name, size, type
    const file = audioFileInput.files[0];
    if(!file){
        alert('Please select an audio file!');
        return;
    }

    divToHide.style.display = 'none';
    canvasDiv.style.display = 'flex';
    canvas.width = canvasDiv.clientWidth;
    canvas.height = canvasDiv.clientHeight;
    // audioContext is like the Audio Environment
    // window.AudioContext is for modern browsers
    // window.webkitAudioContext for older Safari support
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // new instance of the FileReader API, which is used 
    // to read the contents of files (such as audio, images, or text) in web applications.
    const reader = new FileReader();

    // Used the code inside the onload After the file is read successfully that is asynchronously
    reader.onload = function(e) {
        // here, e.target.result is the ArrayBuffer i.e the binary data of the audio file
        audioContext.decodeAudioData(e.target.result, function(buffer) {   // buffer is the decoded audio data
            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            const analyser = audioContext.createAnalyser();  // AnalyserNode is used to get frequency data from the audio
            // Connect the source to the analyser and then to the destination (speakers)
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            //size of the Fast Fourier Transform used to analyze audio frequency data.
            analyser.fftSize = 256;   // Must be power of 2
            // bufferLength is half of the fftSize, as it represents the number of frequency bins
            // Each frequency bin represents a range of frequencies.
            const bufferLength = analyser.frequencyBinCount;
            // Creates an array of 128 unsigned 8-bit integers.
            const dataArray = new Uint8Array(bufferLength);

            source.start();  // Start playing the audio

            function animate() {
                requestAnimationFrame(animate);  // Call animate function recursively
                // Get the frequency data from the analyser
                analyser.getByteFrequencyData(dataArray); //Each value is an unsigned 8-bit integer (0 to 255)


                /////////////////////////
                if(selectedThemeName === 'Bars'){
                    createBarsAnimation(dataArray, bufferLength, canvas, ctx);
                }else if(selectedThemeName === 'Particles'){
                    createParticleExplosionAnimation(dataArray, bufferLength, canvas, ctx);
                }else if(selectedThemeName === 'Circular'){
                    createCircularAnimation(dataArray, bufferLength, canvas, ctx);
                }else if(selectedThemeName === 'Waves'){
                    createWaveAnimation(dataArray, bufferLength, canvas, ctx);
                }
            }

            animate();
        }, function(error) {
            console.error('Error decoding audio file', error);
        });
    };

    // Reading the input file as binary data and triggers the reader.onload when its done
    reader.readAsArrayBuffer(file);
});
