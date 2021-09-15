import { FC } from 'react';

import root from './Root';

const data = {
  ...root,

  n: 'Fuel Tank',
  N: {
    width_original: 2,
    width_a: 2,
    width_b: 2,
    height: 1,
    fuel_percent: 1,
  },
  T: {
    color_tex: '_',
    shape_tex: '_',
  },
};

const Part: FC<{ overrideData: typeof data }> = ({ overrideData }) => {
  let liveData = {
    ...data,
    ...overrideData,
  };

  return (
    <mesh position={[1, -0.5, 0.5]}>
      <cylinderGeometry />
      <meshStandardMaterial />
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
