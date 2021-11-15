import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { get } from 'https';
import fetch from 'node-fetch';
import { Extract } from 'unzipper';

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
  console.log('Fetching new favicons');

  const faviconAPIResult = await (
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
              margin: '4',
              background_color: '#123456',
              startup_image: {
                background_color: '#654321',
              },
              assets: {
                ios6_and_prior_icons: false,
                ios7_and_later_icons: true,
                precomposed_icons: false,
                declare_only_default_icon: true,
              },
            },
            windows: {
              picture_aspect: 'white_silhouette',
              background_color: '#654321',
              assets: {
                windows_80_ie_10_tile: true,
                windows_10_ie_11_edge_tiles: {
                  small: false,
                  medium: true,
                  big: true,
                  rectangle: false,
                },
              },
            },
            firefox_app: {
              picture_aspect: 'circle',
              keep_picture_in_circle: 'true',
              circle_inner_margin: '5',
              background_color: '#456789',
              manifest: {
                app_name: 'My sample app',
                app_description: 'Yet another sample application',
                developer_name: 'Philippe Bernard',
                developer_url:
                  'http://stackoverflow.com/users/499917/philippe-b',
              },
            },
            android_chrome: {
              picture_aspect: 'shadow',
              manifest: {
                name: 'My sample app',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/homepage.html',
                existing_manifest: '{"name": "Yet another app"}',
              },
              assets: {
                legacy_icon: true,
                low_resolution_icons: false,
              },
              theme_color: '#4972ab',
            },
            safari_pinned_tab: {
              picture_aspect: 'black_and_white',
              threshold: 60,
              theme_color: '#136497',
            },
            coast: {
              picture_aspect: 'background_and_margin',
              background_color: '#136497',
              margin: '12%',
            },
            open_graph: {
              picture_aspect: 'background_and_margin',
              background_color: '#136497',
              margin: '12%',
              ratio: '1.91:1',
            },
            yandex_browser: {
              background_color: 'background_color',
              manifest: {
                show_title: true,
                version: '1.0',
              },
            },
          },
          settings: {
            compression: '3',
            scaling_algorithm: 'Mitchell',
            error_on_image_too_small: true,
            readme_file: true,
            html_code_file: false,
            use_path_as_is: false,
          },
          versioning: {
            param_name: 'ver',
            param_value: '15Zd8',
          },
        },
      }),
    })
  ).json();

  console.log(faviconAPIResult);

  if (faviconAPIResult.favicon_generation_result.result.status === 'success') {
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
}

export default generateFavicons;
