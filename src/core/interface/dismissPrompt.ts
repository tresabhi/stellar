import { mutatePopups } from 'core/app/mutatePopups';

export default function dismissPrompt(id: string) {
  mutatePopups((draft) => {
    const index = draft.prompts.findIndex((popup) => popup.id === id);
    if (index !== -1) draft.prompts.splice(index, 1);
  });
}
