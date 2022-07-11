import useApp from 'hooks/useApp';
import useStellarContext from 'hooks/useStellarContext';
import useTranslator from 'hooks/useTranslator';
import { isMobile } from 'react-device-detect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import SplashScreen from 'routes/SplashScreen';
import { globalStyles } from 'stitches.config';
import 'styles/index.scss';

const App = () => {
  const stellarContext = useStellarContext();
  useTranslator();
  globalStyles();

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
      `%cDo not paste in anything here unless you know what you are doing!Malicious code can harm ${stellarContext.title} and your data (blueprints, snippets, etc.) permanently`,
      `
        background-color: orange;
        color: white;
        font-weight: bold;
        font-size: 16px;
      `,
    );
  }

  if (window.location.pathname === '/') {
    window.location.pathname = isMobile ? '/mobile' : '/desktop';
  }

  const version = stellarContext.version.split('.');
  document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;

  const rerenderDocumentTitle = () => {
    const { fileHandle } = useApp.getState();
    const { hasUnsavedChanges } = useApp.getState();

    document.title = `${stellarContext.title} ${
      fileHandle ? `- ${fileHandle.name}` : `${version[0]}.${version[1]}`
    }${hasUnsavedChanges ? '*' : ''}`;
  };

  useApp.subscribe((state) => state.hasUnsavedChanges, rerenderDocumentTitle);
  useApp.subscribe((state) => state.fileHandle, rerenderDocumentTitle);

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
