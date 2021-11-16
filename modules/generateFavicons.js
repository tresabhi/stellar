import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
} from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import fetch from 'node-fetch';
import { Extract } from 'unzipper';
import { sync as delSync } from 'del';

const FAVICON_API_URL = 'https://realfavicongenerator.net/api/favicon';
const ICON_IMG = {
  alpha: 'https://i.imgur.com/OfK5jC5.png',
  beta: 'https://i.imgur.com/OfK5jC5.png',
  release: 'https://i.imgur.com/OfK5jC5.png',
};

async function generateFavicons(buildType, faviconAPIKey) {
  /**
   * 1. add all png, svg, ico files
   * 2. add browserconfig.xml
   * 3. merge manifest keys
   */
  console.log(`Generating and fetching new favicons for "${buildType}"`);
  // [HIDE]
  // const faviconAPIResult = (
  //   await (
  //     await fetch(FAVICON_API_URL, {
  //       method: 'post',
  //       body: JSON.stringify({
  //         favicon_generation: {
  //           api_key: faviconAPIKey,
  //           master_picture: { type: 'url', url: ICON_IMG[buildType] },
  //           files_location: { type: 'root' },
  //           favicon_design: {
  //             desktop_browser: {},
  //             ios: {
  //               picture_aspect: 'background_and_margin',
  //               margin: 10,
  //               background_color: '#000000',
  //               assets: {
  //                 ios6_and_prior_icons: true,
  //                 ios7_and_later_icons: true,
  //               },
  //             },
  //             windows: {
  //               picture_aspect: 'white_silhouette',
  //               background_color: '#892cdc',
  //               assets: {
  //                 windows_80_ie_10_tile: true,
  //                 windows_10_ie_11_edge_tiles: {
  //                   small: true,
  //                   medium: true,
  //                   big: true,
  //                   rectangle: true,
  //                 },
  //               },
  //             },
  //             android_chrome: {
  //               picture_aspect: 'shadow',
  //               manifest: {},
  //               assets: {
  //                 legacy_icon: true,
  //                 low_resolution_icons: true,
  //               },
  //             },
  //             safari_pinned_tab: {
  //               picture_aspect: 'silhouette',
  //               theme_color: '#892cdc',
  //             },
  //           },
  //           html_code_file: true,
  //         },
  //       }),
  //     })
  //   ).json()
  // ).favicon_generation_result;
  console.log(`Generating favicons successful`);

  // [SHOW]
  const faviconAPIResult = { result: { status: 'success' } };

  if (faviconAPIResult.result.status === 'success') {
    console.log('Generating and fetching successful');

    if (!existsSync('temp')) {
      console.log(`"temp" directory didn't exist; it will be created`);
      mkdirSync('temp');
    }

    console.log('Downloading favicons');
    new DownloaderHelper(
      // [HIDE]
      // faviconAPIResult.favicon.package_url,
      'https://google.com/',
      'temp',
      // [HIDE]
      // { fileName: 'favicons.zip', override: true },
      { fileName: 'lol', override: true },
    )
      .on('end', () => {
        console.log('Downloading successful');

        if (existsSync('temp/favicons')) {
          console.log(`"temp/favicons" already exists; it will be deleted`);
          delSync('temp/favicons');
        }

        console.log('Unzipping favicons');
        createReadStream('temp/favicons.zip')
          .pipe(Extract({ path: 'temp/favicons' }))
          .on('close', () => {
            console.log('Unzipping successful');

            console.log('Cloning favicons');
            const favicons = readdirSync('temp/favicons');
            console.log(favicons);
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
