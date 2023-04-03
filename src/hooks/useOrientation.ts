import { useState } from 'react';

export enum Orientation {
  Landscape,
  Portrait,
}

export default function useOrientation() {
  const landscapeMatch = window.matchMedia('(orientation: landscape)');
  const [orientation, setOrientation] = useState(
    landscapeMatch.matches ? Orientation.Landscape : Orientation.Portrait,
  );

  landscapeMatch.addEventListener('change', () => {
    setOrientation(
      window.matchMedia('(orientation: landscape)').matches
        ? Orientation.Landscape
        : Orientation.Portrait,
    );
  });

  return orientation;
}
