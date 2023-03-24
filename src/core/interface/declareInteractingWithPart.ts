import mutateApp from 'core/app/mutateApp';

export default function declareInteractingWithPart(interacting = true) {
  mutateApp((draft) => {
    draft.editor.isInteractingWithPart = interacting;
  });
}
