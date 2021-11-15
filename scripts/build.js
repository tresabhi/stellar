const { exec } = require('child_process');
const { writeFileSync } = require('fs');
const { argv, exit } = require('process');

const APP_NAME = 'Stellar';
const BUILD_NAMES = {
  default: '',

  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};
const ARGV2 = argv[2] ?? 'default';

console.log('Building with react-scripts');
exec('npx react-scripts build', (error) => {
  if (error) {
    console.error(`Build failed; attached error:\n${error}`);
    exit(1);
  }

  console.log('Build succeeded');

  console.log(`Updating manifest.json keys for "${ARGV2}"`);
  const manifest = require('../build/manifest.json');
  const newName = `${APP_NAME} ${BUILD_NAMES[ARGV2] ?? ''}`.trim();
  [manifest.name, manifest.short_name] = [newName, newName];

  // NOTE TO SELF: require is relative to current file; node file mutation is
  // relative to caller
  writeFileSync('./build/manifest.json', JSON.stringify(manifest));
});
