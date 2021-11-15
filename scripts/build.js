import { exec } from 'child_process';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'fs';
import { get } from 'https';
import { createRequire } from 'module';
import fetch from 'node-fetch';
import { argv, exit } from 'process';
import { Extract } from 'unzip';

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

const require = createRequire(import.meta.url);

console.log('Building with react-scripts');
// exec('npx react-scripts build', (error) => {
exec('echo', async (error) => {
  if (error) {
    console.error(`Build failed; attached error:\n${error}`);
    exit(1);
  } else {
    console.log('Build succeeded');

    // Manifest tweaks based on type of build
    console.log(`Updating manifest.json keys for "${ARGV2}"`);
    const manifest = require('../build/manifest.json');
    const newName = `${APP_NAME} ${BUILD_NAMES[ARGV2] ?? ''}`.trim();
    [manifest.name, manifest.short_name] = [newName, newName];
    writeFileSync('./build/manifest.json', JSON.stringify(manifest));
    console.log(`Updating manifest.json keys successful`);

    if (argv[3]) {
      /**
       * 1. add all png, svg, ico files
       * 2. add browserconfig.xml
       * 3. merge manifest keys
       */
      // https://realfavicongenerator.net/api/favicon
      console.log('Fetching new favicons');
      const faviconAPIResult = await (
        await fetch(FAVICON_API_URL, {
          method: 'post',
          body: JSON.stringify({
            favicon_generation: {
              api_key: argv[3],

              master_picture: { type: 'url', url: ICON_IMG },

              files_location: { type: 'root' },
            },
          }),
        })
      ).json();

      if (
        faviconAPIResult.favicon_generation_result.result.status === 'success'
      ) {
        console.log('Fetching successful');

        if (!existsSync('temp')) {
          console.log(`"temp" directory didn't exist; it was created`);
          mkdirSync('temp');
        }

        console.log('Downloading favicons');
        const faviconZipWriteStream = createWriteStream('temp/favicons.zip');
        const faviconZipFile = get(
          faviconAPIResult.favicon_generation_result.favicon.package_url,
          (response) => {
            response.pipe(faviconZipWriteStream);
          },
        );
        console.log('Downloading successful');

        console.log('Unzipping favicons');
        const faviconZipReadStream = createReadStream('temp/favicons.zip');
        faviconZipReadStream.pipe(Extract({ path: 'temp/favicons' }));
      } else console.error('Fetching failed');
    } else console.warn('No favicon API token provided');
  }
});
