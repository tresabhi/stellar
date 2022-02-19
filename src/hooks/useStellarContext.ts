import { ReactComponent as StellarAlphaIcon } from 'assets/icons/stellar-alpha.svg';
import { ReactComponent as StellarBetaIcon } from 'assets/icons/stellar-beta.svg';
import { ReactComponent as StellarDevIcon } from 'assets/icons/stellar-dev.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { FC } from 'react';
import { coerce } from 'semver';
import packageJSON from '../../package.json';

type CodeName = 'alpha' | 'beta' | 'release' | 'dev';

export default function useStellarContext() {
  let title: string, codeName: CodeName, accentRegular: string, Icon: FC<any>;

  switch (window.location.hostname) {
    case 'stellaralpha.web.app':
      title = 'Stellar Alpha';
      codeName = 'alpha';
      // TODO: verify this color
      accentRegular = 'hsl(15, 70%, 90%)';
      Icon = StellarAlphaIcon;
      break;

    case 'stellarbeta.web.app':
      title = 'Stellar Beta';
      codeName = 'beta';
      // TODO: verify this color
      accentRegular = 'hsl(170, 80%, 35%)';
      Icon = StellarBetaIcon;
      break;

    case 'stellaredit.web.app':
      title = 'Stellar';
      codeName = 'release';
      accentRegular = 'hsl(270, 70%, 50%)';
      Icon = StellarIcon;
      break;

    default:
      title = 'Stellar Dev';
      codeName = 'dev';
      accentRegular = 'hsl(220, 75%, 55%)';
      Icon = StellarDevIcon;
      break;
  }

  return {
    title,
    version: coerce(packageJSON.version)!.version,
    codeName,
    accentRegular,
    Icon,
  };
}
