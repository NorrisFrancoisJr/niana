const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'memories');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Generate simple SVG placeholders
for (let i = 1; i <= 100; i++) {
    const width = Math.floor(Math.random() * 200) + 300;
    const height = Math.floor(Math.random() * 200) + 400;
    const hue = Math.floor(Math.random() * 30); // warm hues
    const lightness = Math.floor(Math.random() * 20) + 10; // dark
    
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="hsl(${hue}, 20%, ${lightness}%)"/>
        <text x="50%" y="50%" font-family="monospace" font-size="14" fill="rgba(255,255,255,0.1)" text-anchor="middle" dominant-baseline="middle">MEM_${i}</text>
    </svg>`;
    
    fs.writeFileSync(path.join(dir, `${i}.svg`), svg);
}
console.log("Successfully generated 100 placeholder SVGs in public/memories/");
