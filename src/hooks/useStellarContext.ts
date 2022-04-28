import { ReactComponent as StellarAlphaIcon } from 'assets/icons/stellar-alpha.svg';
import { ReactComponent as StellarBetaIcon } from 'assets/icons/stellar-beta.svg';
import { ReactComponent as StellarDevIcon } from 'assets/icons/stellar-dev.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { FC } from 'react';
import { coerce } from 'semver';
import packageJSON from '../../package.json';

type CodeName = 'alpha' | 'beta' | 'release' | 'dev';

export default function useStellarContext() {
  let title: string;
  let codeName: CodeName;
  let Icon: FC<any>;

  switch (window.location.hostname) {
    case 'stellaralpha.web.app':
      title = 'Stellar Alpha';
      codeName = 'alpha';
      Icon = StellarAlphaIcon;
      break;

    case 'stellarbeta.web.app':
      title = 'Stellar Beta';
      codeName = 'beta';
      Icon = StellarBetaIcon;
      break;

    case 'stellaredit.web.app':
      title = 'Stellar';
      codeName = 'release';
      Icon = StellarIcon;
      break;

    default:
      title = 'Stellar Dev';
      codeName = 'dev';
      Icon = StellarDevIcon;
      break;
  }

  return {
    title,
    version: coerce(packageJSON.version)!.version,
    codeName,
    Icon,
  };
}
