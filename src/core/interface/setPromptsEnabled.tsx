import { mutateApp } from 'core/app/mutateApp';

export default function setPromptsEnabled(enabled: boolean) {
  mutateApp((draft) => {
    draft.interface.newPopupsEnabled = enabled;
  });
}
