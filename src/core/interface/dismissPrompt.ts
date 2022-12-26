import mutatePrompts from 'core/app/mutatePrompts';

export default function dismissPrompt(id: string) {
  mutatePrompts((draft) => {
    const index = draft.prompts.findIndex((popup) => popup.id === id);
    if (index !== -1) draft.prompts.splice(index, 1);
  });
}
