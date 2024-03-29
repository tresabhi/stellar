/* eslint-env node */

import {
  copyFileSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import fetch from 'node-fetch';
import { extname } from 'path';
import { Extract } from 'unzipper';

const FAVICON_API_URL = 'https://realfavicongenerator.net/api/favicon';
const ICON_IMG = {
  alpha: 'https://i.imgur.com/TuMK81x.png',
  beta: 'https://i.imgur.com/OQp27ff.png',
  release: 'https://i.imgur.com/saA9QuC.png',
};
const COPY_FILE_TYPES = ['.png', '.ico', '.svg', '.xml'];

async function generateFavicons(buildType, faviconAPIKey) {
  console.log(`Generating and fetching new favicons for "${buildType}"`);

  const faviconAPIResult = (
    await (
      await fetch(FAVICON_API_URL, {
        method: 'post',
        body: JSON.stringify({
          favicon_generation: {
            api_key: faviconAPIKey,
            master_picture: { type: 'url', url: ICON_IMG[buildType] },
            files_location: { type: 'root' },
            favicon_design: {
              desktop_browser: {},
              ios: {
                picture_aspect: 'background_and_margin',
                margin: 10,
                background_color: '#000000',
                assets: {
                  ios6_and_prior_icons: true,
                  ios7_and_later_icons: true,
                },
              },
              windows: {
                picture_aspect: 'white_silhouette',
                background_color: '#892cdc',
                assets: {
                  windows_80_ie_10_tile: true,
                  windows_10_ie_11_edge_tiles: {
                    small: true,
                    medium: true,
                    big: true,
                    rectangle: true,
                  },
                },
              },
              android_chrome: {
                picture_aspect: 'shadow',
                manifest: {},
                assets: {
                  legacy_icon: true,
                  low_resolution_icons: true,
                },
              },
              safari_pinned_tab: {
                picture_aspect: 'silhouette',
                theme_color: '#892cdc',
              },
            },
            html_code_file: true,
          },
        }),
      })
    ).json()
  ).favicon_generation_result;

  if (faviconAPIResult.result.status === 'success') {
    if (!existsSync('temp')) {
      console.log(`"temp" directory didn't exist; it will be created`);
      mkdirSync('temp');
    }

    console.log('Downloading favicons');
    new DownloaderHelper(faviconAPIResult.favicon.package_url, 'temp', {
      fileName: 'favicons.zip',
      override: true,
    })
      .on('end', () => {
        if (existsSync('temp/favicons')) {
          console.log(`"temp/favicons" already exists; it will be deleted`);
          rmSync('temp/favicons', { recursive: true, force: true });
        }

        console.log('Unzipping favicons');
        createReadStream('temp/favicons.zip')
          .pipe(Extract({ path: 'temp/favicons' }))
          .on('close', () => {
            console.log('Cloning favicons');

            const favicons = readdirSync('temp/favicons');

            favicons.forEach((favicon) => {
              if (COPY_FILE_TYPES.includes(extname(favicon))) {
                copyFileSync(`temp/favicons/${favicon}`, `dist/${favicon}`);
              }
            });

            console.log('Appending icons to manifest.json');

            const providedManifest = JSON.parse(
              readFileSync('temp/favicons/site.webmanifest'),
            );
            const existingManifest = JSON.parse(
              readFileSync('dist/manifest.json'),
            );

            writeFileSync(
              'dist/manifest.json',
              JSON.stringify({
                ...existingManifest,
                icons: [...existingManifest.icons, ...providedManifest.icons],
              }),
            );
          });
      })
      .on('error', () => console.log('Downloading failed'))
      .start();
  } else {
    console.error('Fetching failed; result:');
    console.error(faviconAPIResult);
  }
}

export default generateFavicons;
