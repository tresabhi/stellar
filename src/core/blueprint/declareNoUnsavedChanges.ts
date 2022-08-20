import { mutateApp } from 'core/app/mutateApp';

export const declareNoUnsavedChanges = () => {
  mutateApp((draft) => {
    draft.file.hasUnsavedChanges = false;
  });
};
