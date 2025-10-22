const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

const version = process.env.VITE_APP_VERSION || '1.0.0';
fs.writeFileSync(path.join(buildDir, 'version.json'), JSON.stringify({ version }, null, 2));
console.log('version.json created.');