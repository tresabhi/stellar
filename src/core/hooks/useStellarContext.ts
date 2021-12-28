import { coerce } from 'semver';
import packageJson from '../../../package.json';

export default function useStellarContext() {
  let title;

  switch (window.location.hostname) {
    case 'stellaralpha.web.app':
    case 'stellarnext.web.app':
      title = 'Stellar Next';
      break;

    case 'stellarbeta.web.app':
      title = 'Stellar Beta';
      break;

    case 'stellaredit.web.app':
      title = 'Stellar';
      break;

    default:
      title = 'Stellar Dev';
      break;
  }

  return { title, version: coerce(packageJson.version)?.version };
}
