// import '@react-three/fiber';
// import { ReactComponent as Icon } from 'assets/icons/question-mark.svg';
// import { PartMeta, PartModule } from 'core/types/Parts';
// import { merge } from 'lodash';
// import { FC } from 'react';
// import { NIL } from 'uuid';

// export interface RootVanillaType {
//   readonly n: string;
//   p: { x: number; y: number };
//   o: { x: number; y: number; z: number };
//   readonly t: '-Infinity';
// }
// export interface RootType extends RootVanillaType {
//   meta: PartMeta;
// }

// export const VANILLA_DATA: RootVanillaType = {
//   n: 'Unknown Part',
//   p: { x: 0, y: 0 },
//   o: { x: 1, y: 1, z: 0 },
//   t: '-Infinity',
// };
// export const DATA = merge<{}, RootVanillaType, Partial<RootType>>(
//   {},
//   VANILLA_DATA,
//   {
//     n: 'Unknown Part',
//     meta: {
//       label: 'Unknown Parts',
//       visible: true,
//       locked: false,

//       ID: NIL,
//       parentID: NIL,
//     },
//   },
// ) as RootType;

// const LayoutComponent: FC = () => <mesh />;

// const RootPart: PartModule = {
//   VANILLA_DATA,
//   DATA,

//   Icon,
//   LayoutComponent,

//   isExportable: false,
// };
// export default RootPart;
