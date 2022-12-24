import mutateApp from 'core/app/mutateApp';

export default function declareUnsavedChanges(unsavedChanges = true) {
  mutateApp((draft) => {
    draft.file.hasUnsavedChanges = unsavedChanges;
  });
}
