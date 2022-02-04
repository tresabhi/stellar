import { readFileSync, writeFileSync } from 'fs';
import { v4 as UUIDV4 } from 'uuid';

const BUILD_NAMES = {
  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};

export default function renameBuild(buildType, appName) {
  console.log(`Updating manifest.json keys for "${buildType}"`);

  const manifest = JSON.parse(readFileSync('build/manifest.json'));
  const newName = `${appName} ${BUILD_NAMES[buildType] ?? ''}`.trim();
  writeFileSync(
    'build/manifest.json',
    JSON.stringify({
      ...manifest,

      PWA_UUID: UUIDV4(),

      name: newName,
      short_name: newName,
    }),
  );
}
