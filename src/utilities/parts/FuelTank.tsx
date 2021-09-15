import { FC } from 'react';
import _ from 'lodash';

import root from './Root';

const data = _.merge(root.data, {
  n: 'Fuel Tank',
  N: {
    width_original: 2,
    width_a: 2,
    width_b: 2,
    height: 2,
    fuel_percent: 1,
  },
  T: {
    color_tex: '_',
    shape_tex: '_',
  },
});

const Part: FC<{ override: typeof data }> = ({ override }) => {
  let liveData = _.merge(data, override);

  return (
    <mesh position={[liveData.N.width_original + liveData.p.x, liveData.N.height / -2 - liveData.p.y, 0]}>
      <cylinderGeometry args={[liveData.N.width_a, liveData.N.width_b, liveData.N.height, 24]} />
      <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
    </mesh>
  );
};
// return (
//   <mesh position={[this.data.p.x, this.data.p.y]} rotation={[0, 0, this.data.o.y]}>
//     <cylinderGeometry args={[this.data.N.width_a, this.data.N.width_b, this.data.N.height, 24]} />
//     <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
//   </mesh>
// );

export default Object.assign({
  Part,
  data,
});
