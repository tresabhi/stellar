import { FC, ReactNode } from 'react';

export interface HeadsUpDisplayProps {
  priority: number;
  children: ReactNode;
}
const HeadsUpDisplay: FC<HeadsUpDisplayProps> = ({
  priority: layer,
  children,
}) => {
  return (
    <group renderOrder={layer}>
      <mesh onAfterRender={(renderer) => renderer.clearDepth()} />
      {children}
    </group>
  );
};
export default HeadsUpDisplay;
