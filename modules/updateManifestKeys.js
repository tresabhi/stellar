import { writeFileSync } from 'fs';
import { createRequire } from 'module';

const BUILD_NAMES = {
  alpha: 'Alpha',
  beta: 'Beta',
  release: '',
};

const require = createRequire(import.meta.url);

export default function renameBuild(buildType, appName) {
  console.log(`Updating manifest.json keys for "${buildType}"`);

  const manifest = require('../build/manifest.json');
  const newName = `${appName} ${BUILD_NAMES[buildType] ?? ''}`.trim();
  writeFileSync(
    './build/manifest.json',
    JSON.stringify({
      ...manifest,
      name: newName,
      short_name: newName,
    }),
  );
}
