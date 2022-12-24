import mutatePrompts from 'core/app/mutatePrompts';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import useApp from 'stores/app';
import { PromptProps } from 'stores/prompts';
import dismissPrompt from './dismissPrompt';

export default function prompt(
  Component: FC<PromptProps>,
  dismissByBlur = true,
  id = nanoid(),
) {
  if (useApp.getState().interface.newPopupsEnabled) {
    mutatePrompts((draft) => {
      if (draft.prompts.findIndex((popup) => popup.id === id) === -1) {
        draft.prompts.push({
          id,
          dismissByBlur,
          node: (
            <Component
              id={id}
              key={`popup-${id}`}
              dismiss={() => dismissPrompt(id)}
            />
          ),
        });
      }
    });
  }
}
