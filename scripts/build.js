import argsParser from 'args-parser';
import { argv, exit } from 'process';
import build from '../modules/build.js';
import updateManifestKeys from '../modules/updateManifestKeys.js';

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

build((error) => {
  if (error) exit(1);
}, true);

updateManifestKeys(BUILD_TYPE, APP_NAME);
