import { ReactComponent as StellarAlphaIcon } from 'assets/icons/stellar-alpha.svg';
import { ReactComponent as StellarBetaIcon } from 'assets/icons/stellar-beta.svg';
import { ReactComponent as StellarDevIcon } from 'assets/icons/stellar-dev.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';

export enum StellarName {
  Dev,
  Alpha,
  Beta,
  Release,
  Unknown,
}

export default function getContext() {
  let name: StellarName = StellarName.Unknown;
  let title = 'Stellar Unknown';
  let Icon = StellarIcon;

  if (import.meta.env.DEV) {
    name = StellarName.Dev;
    title = 'Stellar Dev';
    Icon = StellarDevIcon;
  } else if (window.location.hostname === 'stellaralpha.web.app') {
    name = StellarName.Alpha;
    title = 'Stellar Alpha';
    Icon = StellarAlphaIcon;
  } else if (window.location.hostname === 'stellarbeta.web.app') {
    name = StellarName.Beta;
    title = 'Stellar Beta';
    Icon = StellarBetaIcon;
  } else if (window.location.hostname === 'stellaredit.web.app') {
    name = StellarName.Release;
    title = 'Stellar';
    Icon = StellarIcon;
  }

  return { name, title, Icon };
}
