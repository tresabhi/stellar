const { exec } = require('child_process');
const { writeFileSync } = require('fs');
const { argv, exit } = require('process');
const fetch = require('node-fetch');

const APP_NAME = 'Stellar';
const BUILD_NAMES = {
  default: '',
  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};
const ICON_IMG = 'https://i.imgur.com/OfK5jC5.png';
const ARGV2 = argv[2] ?? 'default';
const FAVICON_API_URL = 'https://realfavicongenerator.net/api/favicon';

console.log('Building with react-scripts');
// exec('npx react-scripts build', (error) => {
exec('echo', (error) => {
  if (error) {
    console.error(`Build failed; attached error:\n${error}`);
    exit(1);
  }

  console.log('Build succeeded');

  console.log(`Updating manifest.json keys for "${ARGV2}"`);
  // const manifest = require('../build/manifest.json');
  const newName = `${APP_NAME} ${BUILD_NAMES[ARGV2] ?? ''}`.trim();
  // [manifest.name, manifest.short_name] = [newName, newName];

  // NOTE TO SELF: require is relative to current file; node file mutation is
  // relative to caller
  // writeFileSync('./build/manifest.json', JSON.stringify(manifest));

  // only if token is provided
  if (argv[3]) {
    /**
     * 1. add all png, svg, ico files
     * 2. add browserconfig.xml
     */
    // https://realfavicongenerator.net/api/favicon
    fetch(FAVICON_API_URL, {
      method: 'post',
      body: JSON.stringify({
        favicon_generation: {
          api_key: argv[3],

          master_picture: { type: 'url', url: ICON_IMG },

          files_location: { type: 'root' },
        },
      }),
    });
  }
});
