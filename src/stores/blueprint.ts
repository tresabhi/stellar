import { Blueprint } from 'types/Blueprint';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const blueprintStore = create<Blueprint>(
  devtools(
    () =>
      ({
        // can't use `import` here because it's run before intialization
        meta: {
          format_version: 1,
        },

        center: 0,
        offset: { x: 0, y: 0 },
        parts: [],
        stages: [],
      } as Blueprint),
    { name: 'blueprint' },
  ),
);
export default blueprintStore;
