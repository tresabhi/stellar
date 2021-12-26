import * as Partition from 'components/Partition';
import * as SideBar from 'components/SideBar';
import { useState } from 'react';

export default function () {
  const [state, setState] = useState<'parts' | 'snippets'>('parts');

  return (
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={state === 'parts'}
          onClick={() => setState('parts')}
        >
          Parts
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={state === 'snippets'}
          onClick={() => setState('snippets')}
        >
          Snippets
        </Partition.Option>
      </Partition.Container>
      {state === 'parts' ? (
        <SideBar.Scrollable>Explorer coming soon!</SideBar.Scrollable>
      ) : (
        <SideBar.Scrollable>Snippets coming soon!</SideBar.Scrollable>
      )}
    </SideBar.Container>
  );
}
