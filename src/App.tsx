import useStellarContext from 'hooks/useStellarContext';
import { isMobile } from 'react-device-detect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import SplashScreen from 'routes/SplashScreen';
import appStore from 'stores/app';
import 'styles/index.scss';
import { BufferGeometry, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';

const App = () => {
  const stellarContext = useStellarContext();

  BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
  BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
  Mesh.prototype.raycast = acceleratedRaycast;

  if (stellarContext.codeName !== 'dev') {
    console.log(
      '%cWARNING!',
      `
        background-color: red;
        color: white;
        font-size: 32px;
        font-weight: bold;
      `,
    );
    console.log(
      `%cDo not paste in anything here unless you know what you are doing!\n\nMalicious code can harm ${stellarContext.title} and your data (blueprints, snippets, etc.) permanently`,
      `
        background-color: orange;
        color: white;
        font-weight: bold;
        font-size: 16px;
      `,
    );
  }

  if (window.location.pathname === '/')
    window.location.pathname = isMobile ? '/mobile' : '/desktop';

  const version = stellarContext.version.split('.');
  document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;

  appStore.subscribe(
    (state) => state.hasUnsavedChanges,
    (hasUnsavedChanges) => {
      document.title = `${stellarContext.title} ${version[0]}.${version[1]}${
        hasUnsavedChanges ? '*' : ''
      }`;
    },
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
