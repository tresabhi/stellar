import { extend } from '@react-three/fiber';
import { Line } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

const registerThreeElements = () => {
  extend({
    Line2,
    LineMaterial,
    Line_: Line,
  });
};
export default registerThreeElements;
