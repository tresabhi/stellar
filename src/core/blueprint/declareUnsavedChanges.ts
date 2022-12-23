import { mutateApp } from 'core/app/mutateApp';

export default function declareUnsavedChanges() {
  mutateApp((draft) => {
    draft.file.hasUnsavedChanges = true;
  });
}
