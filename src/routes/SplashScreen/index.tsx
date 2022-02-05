import { css } from '@emotion/react';
import useStellarContext from 'hooks/useStellarContext';
import { BarLoader } from 'react-spinners';
import './index.scss';

const asdf = css`
  border-radius: 4px;
  background-color: hsl(240, 20%, 5%);
`;

const SplashScreen = () => {
  const stellarContext = useStellarContext();

  return (
    <div className="splash-screen">
      <stellarContext.Icon className="stellar-icon" />
      <BarLoader
        speedMultiplier={1.5}
        width={112}
        height={6}
        color={stellarContext.accentRegular}
        css={asdf}
      />
    </div>
  );
};

export default SplashScreen;
