import { usePrerender } from 'hooks/usePrerender';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApp from 'stores/useApp';
import SplashScreen from './components/SplashScreen';

export const Home = () => {
  const navigate = useNavigate();
  const isLoadingDone = useApp((state) => {
    const keys = Object.keys(
      state.loadStatus,
    ) as (keyof typeof state.loadStatus)[];

    return !keys.some((key) => !state.loadStatus[key]);
  });

  useEffect(() => {
    if (isLoadingDone) navigate('/interface');
  });
  usePrerender();

  return <SplashScreen />;
};
