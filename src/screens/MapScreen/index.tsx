import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from '@src/theme/colors';
import MyLocationIcon from '@src/assets/svgs/MyLocationIcon';
import SearchBar from '@src/components/SearchBar';
import BottomSheet, { BOTTOM_SHEET_MIN_HEIGHT } from '@src/components/BottomSheet';
import PlaceInfo from '@src/components/PlaceInfo';
import MarkerIndicator from '@src/components/MarkerIndicator';
import { useMap } from '@src/hooks/useMap';
import { useMarkerIndicator } from '@src/hooks/useMarkerIndicator';

const MapScreen = () => {
  const {
    mapViewRef,
    showPredictions,
    setShowPredictions,
    selectedPlace,
    isSheetMinimized,
    setIsSheetMinimized,
    markerLocation,
    recenterMap,
    handleLocationSelect,
  } = useMap();

  const { rotation, isMarkerVisible, handleRegionChange } = useMarkerIndicator({ markerLocation });


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setShowPredictions(false);
    }}>
      <View style={styles.container}>
        <SearchBar
          onLocationSelect={handleLocationSelect}
          showPredictions={showPredictions}
          setShowPredictions={setShowPredictions}
        />
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...markerLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapStyle}
          onRegionChangeComplete={handleRegionChange}
        >
          <Marker
            coordinate={markerLocation}
            title={"Selected Location"}
            pinColor={colors.danger}
          />
        </MapView>
        <MarkerIndicator rotation={rotation} visible={!isMarkerVisible && !showPredictions && (!selectedPlace || isSheetMinimized)} />
        {selectedPlace && !showPredictions && (
          <BottomSheet isMinimized={isSheetMinimized} setIsMinimized={setIsSheetMinimized}>
            <PlaceInfo selectedPlace={selectedPlace} isMinimized={isSheetMinimized} />
          </BottomSheet>
        )}
        {(!selectedPlace || isSheetMinimized) && (
          <TouchableOpacity
            style={[
              styles.recenterButton,
              { bottom: selectedPlace && isSheetMinimized ? BOTTOM_SHEET_MIN_HEIGHT + 20 : 20 },
            ]}
            onPress={recenterMap}
          >
            <MyLocationIcon size={24} fillColor={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  recenterButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.background
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.text
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": colors.background
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.secondary
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#E8F5E9"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4CAF50"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": colors.grey
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.secondary
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.text
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": colors.primary
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#AED581"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }
];


export default MapScreen; 