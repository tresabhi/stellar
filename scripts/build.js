import { exit } from 'process';
import build from '../modules/build.js';

// SET TO FALSE WHEN NOT TESTING MODULE
build((error) => {
  if (error) exit(1);
}, true);
