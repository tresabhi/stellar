import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/interface');
  });

  return <SplashScreen />;
};
