import { mutateApp } from 'core/app/mutateApp';

export const declareUnsavedChanges = () => {
  mutateApp((draft) => {
    draft.file.hasUnsavedChanges = true;
  });
};
