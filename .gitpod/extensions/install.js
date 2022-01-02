import { exec } from 'child_process';
import { readdirSync } from 'fs';

readdirSync('.gitpod/extensions/vsixs').forEach((extensionFile) => {
  console.log(`Installing ${extensionFile}...`);
  exec(
    `code --install-extension .gitpod/extensions/vsixs/${extensionFile}`,
    (error) => {
      if (error) console.error(error);
    },
  );
});
