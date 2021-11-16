const DOMAIN_NAMES = {
  '*': 'Stellar Dev',
  'stellaralpha.web.app': 'Stellar Alpha',
  'stellarbeta.web.app': 'Stellar Beta',
  'stellaredit.web.app': 'Stellar',
};

const useStellarName = () => {
  return (DOMAIN_NAMES as any)[window.location.hostname] ?? DOMAIN_NAMES['*'];
};

export default useStellarName;
