const { exec } = require('child_process');
const { writeFileSync } = require('fs');
const { chdir, argv } = require('process');

console.log('Building with react-scripts');
// exec('npx react-scripts build');

const appName = 'Stellar';
const buildNames = {
  default: '',

  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};
const argv2 = argv[2] ?? 'default';

console.log(`Updating manifest.json keys for "${argv2}"`);
const manifest = require('../build/manifest.json');
const newName = `${appName} ${buildNames[argv2] ?? ''}`.trim();
[manifest.name, manifest.short_name] = [newName, newName];

writeFileSync('./build/manifest.json', JSON.stringify(manifest));
