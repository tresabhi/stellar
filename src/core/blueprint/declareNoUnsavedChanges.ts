import { mutateApp } from 'core/app/mutateApp';

export default function declareNoUnsavedChanges() {
  mutateApp((draft) => {
    draft.file.hasUnsavedChanges = false;
  });
}
