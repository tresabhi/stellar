import { exec } from 'child_process';

export default function build(callback, fakeBuild = false) {
  console.log('Building with react-scripts');

  exec(fakeBuild ? 'echo' : 'npx react-scripts build', (...args) => {
    if (args[0]) {
      console.error(`Build failed; attached error:\n${args[0]}`);
    }

    if (callback) callback(...args);
  });
}
