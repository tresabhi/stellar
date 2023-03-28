import { confirmationPromptCurry } from 'routes/components/ConfirmationPrompt';
import useApp from 'stores/app';
import prompt from './prompt';

export default function confirmProgressReset() {
  const promise = new Promise<boolean>((resolve) => {
    if (
      import.meta.env.DEV ? false : useApp.getState().file.hasUnsavedChanges
    ) {
      prompt(
        confirmationPromptCurry((success) => {
          resolve(success);
        }),
      );
    } else {
      resolve(true);
    }
  });

  return promise;
}
