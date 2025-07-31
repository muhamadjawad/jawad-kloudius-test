import React, { useEffect } from 'react';
import MapScreen from '@src/screens/MapScreen';
import { SearchHistoryProvider } from '@src/context/SearchHistoryContext';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {

  useEffect(() => {
    if (__DEV__) {
      SplashScreen.hide();//
    } else {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }
  }, []);

  return (
    <SearchHistoryProvider>
      <MapScreen />
    </SearchHistoryProvider>
  );
}

export default App;
