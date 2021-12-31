import App from 'App';
import SplashScreen from 'components/SplashScreen';
import useKeybind from 'core/hooks/useKeybind';
import { StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

const keybind = useKeybind(
  () => alert('hello world!'),
  [['Alt', 'Control'], 'v'],
  {},
);

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      {/* <App /> */}
      <textarea onKeyDown={keybind} />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
