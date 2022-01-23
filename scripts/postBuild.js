import argsParser from 'args-parser';
import { argv } from 'process';
import generateFavicons from './generateFavicons.js';
import updateManifestKeys from './updateManifestKeys.js';

const APP_NAME = 'Stellar';
const ARGS = argsParser(argv);
let BUILD_TYPE;

switch (true) {
  case ARGS.alpha:
    BUILD_TYPE = 'alpha';
    break;

  case ARGS.beta:
    BUILD_TYPE = 'beta';
    break;

  default:
  case ARGS.release:
    BUILD_TYPE = 'release';
    break;
}

updateManifestKeys(BUILD_TYPE, APP_NAME);

if (ARGS['favicon-api-token'])
  generateFavicons(BUILD_TYPE, ARGS['favicon-api-token']);
else console.warn('No favicon API token provided');
// set to true if you want to use the previous build
