import { mutateApp } from 'core/app';

export const setPopupsEnabled = (enabled: boolean) => {
  mutateApp((state) => {
    state.interface.newPopupsEnabled = enabled;
  });
};
