import React from 'react';
import MapScreen from '@src/screens/MapScreen';
import { SearchHistoryProvider } from '@src/context/SearchHistoryContext';

function App(): React.JSX.Element {
  return (
    <SearchHistoryProvider>
      <MapScreen />
    </SearchHistoryProvider>
  );
}

export default App;
