const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

const version = import.meta.env.VITE_APP_VERSION || process.env.VITE_APP_VERSION;
fs.writeFileSync(path.join(buildDir, 'version.json'), JSON.stringify({ version }, null, 2));
console.log('version.json created.');