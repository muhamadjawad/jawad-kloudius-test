import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Region } from 'react-native-maps';
import { CoordinatesType } from '@src/types';

interface UseMarkerIndicatorParams {
  markerLocation: CoordinatesType;
}

export const useMarkerIndicator = ({ markerLocation }: UseMarkerIndicatorParams) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isMarkerVisible, setIsMarkerVisible] = useState(true);

  const handleRegionChange = (region: Region) => {
    const isVisible =
      markerLocation.latitude >= region.latitude - region.latitudeDelta / 2 &&
      markerLocation.latitude <= region.latitude + region.latitudeDelta / 2 &&
      markerLocation.longitude >= region.longitude - region.longitudeDelta / 2 &&
      markerLocation.longitude <= region.longitude + region.longitudeDelta / 2;

    setIsMarkerVisible(isVisible);

    if (!isVisible) {
      const angle =
        Math.atan2(
          markerLocation.longitude - region.longitude,
          markerLocation.latitude - region.latitude
        ) *
        (180 / Math.PI);

      Animated.timing(rotation, {
        toValue: angle,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  return {
    rotation,
    isMarkerVisible,
    handleRegionChange,
  };
}; 