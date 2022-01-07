import { ReactComponent as StellarAlphaIcon } from 'assets/icons/stellar-alpha.svg';
import { ReactComponent as StellarBetaIcon } from 'assets/icons/stellar-beta.svg';
import { ReactComponent as StellarDevIcon } from 'assets/icons/stellar-dev.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar.svg';
import { FC } from 'react';

const DOMAIN_ICONS = {
  default: StellarDevIcon,
  'stellaralpha.web.app': StellarAlphaIcon,
  'stellarbeta.web.app': StellarBetaIcon,
  'stellaredit.web.app': StellarIcon,
};

interface IconProviderProps {
  className: string;
}
/**
 * @deprecated TODO: provide a component in `useStellarContext`.
 */
const IconProvider: FC<IconProviderProps> = (props) => {
  const IconComponent =
    (DOMAIN_ICONS as any)?.[window.location.host] ?? DOMAIN_ICONS.default;
  return <IconComponent {...props} />;
};

export default IconProvider;
