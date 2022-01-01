import { coerce } from 'semver';
import packageJson from '../../../package.json';

type CodeName = 'next' | 'beta' | 'release' | 'dev';

export default function useStellarContext() {
  let title, codeName: CodeName;

  switch (window.location.hostname) {
    case 'stellaralpha.web.app':
    case 'stellarnext.web.app':
      title = 'Stellar Next';
      codeName = 'next';
      break;

    case 'stellarbeta.web.app':
      title = 'Stellar Beta';
      codeName = 'beta';
      break;

    case 'stellaredit.web.app':
      title = 'Stellar';
      codeName = 'release';
      break;

    default:
      title = 'Stellar Dev';
      codeName = 'dev';
      break;
  }

  return {
    title,
    version: coerce(packageJson.version)?.version,
    codeName,
  };
}
