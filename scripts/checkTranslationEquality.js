/* eslint-env node */

import { readFileSync, readdirSync } from 'fs';

function checkEqualityDeep(reference, target) {
  const referenceKeys = Object.keys(reference);
  const targetKeys = Object.keys(reference);

  if (referenceKeys.length !== targetKeys.length) return false;

  return referenceKeys.every((referenceKey) =>
    typeof reference[referenceKey] === 'object'
      ? checkEqualityDeep(reference[referenceKey], target[referenceKey])
      : typeof reference[referenceKey] === typeof target[referenceKey],
  );
}

const LANG_DIR = './src/lang/';
const SOURCE_LANG = 'en-US';

const SOURCE_TRANSLATIONS = JSON.parse(
  readFileSync(`${LANG_DIR}${SOURCE_LANG}.json`),
);

let unequalTranslations = 0;

readdirSync(LANG_DIR)
  .filter((file) => file !== `${SOURCE_LANG}.json`)
  .forEach((file) => {
    const translations = JSON.parse(
      readFileSync(`${LANG_DIR}${file}`).toString(),
    );

    if (checkEqualityDeep(SOURCE_TRANSLATIONS, translations)) {
      console.log(`${file} matches ${SOURCE_LANG}`);
    } else {
      unequalTranslations++;
      console.error(`${file} doesn't match ${SOURCE_LANG}`);
    }
  });

if (unequalTranslations > 0) {
  throw new TypeError(
    `${unequalTranslations} language${
      unequalTranslations === 1 ? '' : 's'
    } do not match ${SOURCE_LANG}`,
  );
} else {
  console.log(`all languages match ${SOURCE_LANG}`);
}
