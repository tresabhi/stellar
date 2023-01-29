/* eslint-env node */

import { readFileSync, writeFileSync } from 'fs';

const BUILD_NAMES = {
  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};

export default function renameBuild(buildType, appName) {
  console.log(`Updating manifest.json keys for "${buildType}"`);

  const manifest = JSON.parse(readFileSync('dist/manifest.json'));
  const newName = `${appName} ${BUILD_NAMES[buildType] ?? ''}`.trim();
  writeFileSync(
    'dist/manifest.json',
    JSON.stringify({
      ...manifest,

      name: newName,
      short_name: newName,
    }),
  );
}
