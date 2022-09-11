import { readdirSync, writeFileSync } from 'fs';
import { parse } from 'path';

const EXCLUDE_FILES = ['manifest.json'];
const DIR = 'src/lang';
const MANIFEST = 'src/langs.ts';

const languages = readdirSync(DIR)
  .filter((fileName) => !EXCLUDE_FILES.includes(fileName))
  .map((fileName) => parse(fileName).name)
  .map((locale) => ({
    locale,
    name: new Intl.DisplayNames([locale], {
      type: 'language',
    }).of(locale),
  }));

const imports = languages
  .map(
    (language) =>
      `import ${language.locale.replace('-', '_')} from 'lang/${
        language.locale
      }.json';`,
  )
  .join('\n');

const map = `export const langs = new Map([\n${languages
  .map(
    (language) =>
      `  ['${language.locale}', { translations: ${language.locale.replace(
        '-',
        '_',
      )}, name: '${language.name}' }],`,
  )
  .join('\n')}\n]);`;

writeFileSync(MANIFEST, `${imports}\n\n${map}\n`);
