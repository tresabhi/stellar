import { FC, ReactNode } from 'react';

interface LayerProps {
  layer: number;
  children: ReactNode;
}
const Layer: FC<LayerProps> = ({ layer, children }) => {
  return (
    <group renderOrder={layer}>
      <mesh onAfterRender={(renderer) => renderer.clearDepth()} />
      {children}
    </group>
  );
};
export default Layer;
