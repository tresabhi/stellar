import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';

const RADIAL_SEGMENTS = 12;
const HEIGHT_SEGMENTS = 1;
const THETA_START = -Math.PI / 2;
const THETA_LENGTH = Math.PI;

export class FuelTankGeometry extends BufferGeometry {
  constructor(radiusTop = 1, radiusBottom = 1, height = 1) {
    super();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const scope = this;

    // buffers
    const indices: number[] = [];
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];

    // helper variables
    let index = 0;
    const indexArray: number[][] = [];
    const halfHeight = height / 2;
    let groupStart = 0;

    function generateTorso() {
      const normal = new Vector3();
      const vertex = new Vector3();

      let groupCount = 0;

      // this will be used to calculate the normal
      const slope = (radiusBottom - radiusTop) / height;

      // generate vertices, normals and uvs
      for (let y = 0; y <= HEIGHT_SEGMENTS; y++) {
        const indexRow = [];

        const v = y / HEIGHT_SEGMENTS;

        // calculate the radius of the current row
        const radius = v * (radiusBottom - radiusTop) + radiusTop;

        for (let x = 0; x <= RADIAL_SEGMENTS; x++) {
          const u = x / RADIAL_SEGMENTS;

          const theta = u * THETA_LENGTH + THETA_START;

          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          // vertex
          vertex.x = radius * sinTheta;
          vertex.y = -v * height + halfHeight;
          vertex.z = radius * cosTheta;
          vertices.push(vertex.x, vertex.y, vertex.z);

          // normal
          normal.set(sinTheta, slope, cosTheta).normalize();
          normals.push(normal.x, normal.y, normal.z);

          // uv
          uvs.push(Math.sin(theta) / 2 + 0.5, 1 - v);

          // save index of vertex in respective row
          indexRow.push(index++);
        }

        // now save vertices of the row in our index array
        indexArray.push(indexRow);
      }

      // generate indices
      for (let x = 0; x < RADIAL_SEGMENTS; x++) {
        for (let y = 0; y < HEIGHT_SEGMENTS; y++) {
          // we use the index array to access the correct indices

          const a = indexArray[y][x];
          const b = indexArray[y + 1][x];
          const c = indexArray[y + 1][x + 1];
          const d = indexArray[y][x + 1];

          // faces
          indices.push(a, b, d);
          indices.push(b, c, d);

          // update group counter
          groupCount += 6;
        }
      }

      // add a group to the geometry. this will ensure multi material support
      scope.addGroup(groupStart, groupCount, 0);

      // calculate new start value for groups
      groupStart += groupCount;
    }

    // generate geometry
    generateTorso();

    // build geometry
    this.setIndex(indices);
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  }
}
