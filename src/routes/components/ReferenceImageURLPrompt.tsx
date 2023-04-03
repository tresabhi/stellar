import { Link1Icon } from '@radix-ui/react-icons';
import InputWithIcon from 'components/InputWithIcon';
import * as Prompt from 'components/Prompt';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { ReferenceImage } from 'game/parts/ReferenceImage';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import { useRef } from 'react';
import { PromptProps } from 'stores/prompts';
import createInputEscape from 'utilities/createInputEscape';
import isValidHttpUrl from 'utilities/isValidHttpUrl';

export default function ReferenceImageURLPrompt({ dismiss }: PromptProps) {
  const input = useRef<HTMLInputElement>(null);
  const handleKeyDown = createInputEscape();

  const handleApplyClick = () => {
    if (input.current && isValidHttpUrl(input.current.value)) {
      mutateBlueprint((draft) => {
        draft.selections.forEach((selection) => {
          const part = draft.parts[selection];

          if (part.n === 'Reference Image') {
            if (input.current) {
              const split = input.current.value.split('/');
              (part as ReferenceImage).source = input.current.value;
              (part as ReferenceImage).sourceName = split[split.length - 1];
            }
          }
        });
      });
    }

    dismiss();
  };

  usePopupConcurrency();

  return (
    <Prompt.Root>
      <InputWithIcon
        ref={input}
        icon={<Link1Icon />}
        placeholder="http://..."
        onKeyDown={handleKeyDown}
        autoFocus
      />

      <Prompt.Actions>
        <Prompt.Action onClick={handleApplyClick} color="accent">
          Apply
        </Prompt.Action>
        <Prompt.Action onClick={dismiss}>Cancel</Prompt.Action>
      </Prompt.Actions>
    </Prompt.Root>
  );
}
