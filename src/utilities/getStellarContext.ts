import { ReactComponent as StellarAlphaIcon } from 'assets/icons/stellar-alpha.svg';
import { ReactComponent as StellarBetaIcon } from 'assets/icons/stellar-beta.svg';
import { ReactComponent as StellarDevIcon } from 'assets/icons/stellar-dev.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { FC, SVGProps } from 'react';
import { parse } from 'semver';
import packageJSON from '../../package.json';

type CodeName = 'alpha' | 'beta' | 'release' | 'dev';

/**
 * TODO: needs rework and a cleanup
 * @deprecated
 */
export default function getStellarContext() {
  const version = parse(packageJSON.version);
  let title: string;
  let codeName: CodeName;
  let Icon: FC<SVGProps<SVGSVGElement>>;

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
    codeName,
    version,
    Icon,
  };
}
