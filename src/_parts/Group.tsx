// import '@react-three/fiber';
// import { ReactComponent as Icon } from 'assets/icons/group.svg';
// import { PartModule } from 'core/types/Parts';
// import { AnyPartType[] } from 'interfaces/blueprint/root';
// import { merge } from 'lodash';
// import { memo } from 'react';
// import RootPart, { RootType } from './Root';

// export interface GroupType extends RootType {
//   readonly n: 'Group';
//   parts: AnyPartType[];
// }

// const DATA = merge<{}, RootType, Partial<GroupType>>({}, RootPart.DATA, {
//   n: 'Group',
//   parts: [],
// }) as GroupType;

// const LayoutComponent = memo(() => <mesh />);

// const GroupPart: PartModule = {
//   DATA,
//   Icon,
//   LayoutComponent,

//   isExportable: false,
// };
// export default GroupPart;

// const lol: GroupType = {
//   n: 'Group',
// };
