// type CodeName = 'alpha' | 'beta' | 'release' | 'dev';

// /**
//  * TODO: needs rework and a cleanup
//  * @deprecated
//  */
// export default function getStellarContext() {
//   const version = parse(packageJSON.version);
//   let title: string;
//   let codeName: CodeName;
//   let Icon: FC<SVGProps<SVGSVGElement>>;

//   switch (window.location.hostname) {
//     case 'stellaralpha.web.app':
//       title = 'Stellar Alpha';
//       codeName = 'alpha';
//       Icon = StellarAlphaIcon;
//       break;

//     case 'stellarbeta.web.app':
//       title = 'Stellar Beta';
//       codeName = 'beta';
//       Icon = StellarBetaIcon;
//       break;

//     case 'stellaredit.web.app':
//       title = 'Stellar';
//       codeName = 'release';
//       Icon = StellarIcon;
//       break;

//     default:
//       title = 'Stellar Dev';
//       codeName = 'dev';
//       Icon = StellarDevIcon;
//       break;
//   }

//   return {
//     title,
//     codeName,
//     version,
//     Icon,
//   };
// }

export enum Version {
  Dev,
  Alpha,
  Beta,
  Release,
  Unknown,
}

export const getContext = () => {
  const version: Version = Version.Unknown;
  alert(import.meta.env.BASE_URL);
  if (import.meta.env.DEV) {
  }
};
