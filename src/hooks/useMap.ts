import { useRef, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import { PlaceDetailsType, CoordinatesType } from '@src/types';

export const useMap = () => {
  const mapViewRef = useRef<MapView>(null);
  const [showPredictions, setShowPredictions] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetailsType | null>(null);
  const [isSheetMinimized, setIsSheetMinimized] = useState<boolean>(false);
  const [markerLocation, setMarkerLocation] = useState<CoordinatesType>({
    latitude: 24.8756,
    longitude: 67.0396,
  });


  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const recenterMap = () => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          ...markerLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  const handleLocationSelect = (details: PlaceDetailsType | null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      const newLocation = {
        latitude: lat,
        longitude: lng,
      };
      setMarkerLocation(newLocation);
      setSelectedPlace(details);
      setIsSheetMinimized(false);
      setShowPredictions(false);
      mapViewRef.current?.animateToRegion(
        {
          ...newLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    } else {
      setSelectedPlace(null);
    }
  };

  return {
    mapViewRef,
    showPredictions,
    setShowPredictions,
    selectedPlace,
    isSheetMinimized,
    setIsSheetMinimized,
    markerLocation,
    recenterMap,
    handleLocationSelect
  };
}; 