const imageUpload = document.getElementById('imageUpload');
const imageCanvas = document.getElementById('imageCanvas');
const grayscaleButton = document.getElementById('grayscaleButton');
const sepiaButton = document.getElementById('sepiaButton');
const ctx = imageCanvas.getContext('2d');

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function applyGrayscale() {
    const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
    }
    ctx.putImageData(imageData, 0, 0);
}

grayscaleButton.addEventListener('click', applyGrayscale);

function applySepia() {
    const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);    // Red
        data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b); // Green
        data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b); // Blue
    }
    ctx.putImageData(imageData, 0, 0);
}

sepiaButton.addEventListener('click', applySepia);