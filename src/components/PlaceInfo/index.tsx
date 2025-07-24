import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlaceDetailsType } from '@src/types';
import { colors } from '@src/theme/colors';
import StarIcon from '@src/assets/svgs/StarIcon';
import GlobeIcon from '@src/assets/svgs/GlobeIcon';

interface PlaceInfoProps {
  selectedPlace: PlaceDetailsType;
  isMinimized: boolean;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ selectedPlace, isMinimized }) => {
  return (
    <>
      <Text style={styles.placeName} numberOfLines={1}>
        {selectedPlace.name}
      </Text>
      {!isMinimized && (
        <View style={styles.detailsContainer}>
          <Text style={styles.placeAddress}>{selectedPlace.formatted_address}</Text>
          <View style={styles.infoRow}>
            {selectedPlace.rating && (
              <View style={styles.ratingContainer}>
                <StarIcon size={16} fillColor={colors.secondary} />
                <Text style={styles.placeRating}>{selectedPlace.rating}</Text>
              </View>
            )}
            <View style={styles.coordsContainer}>
              <GlobeIcon size={16} fillColor={colors.primary} />
              <Text style={styles.coordsText}>
                {`${selectedPlace.geometry.location.lat.toFixed(
                  4
                )}, ${selectedPlace.geometry.location.lng.toFixed(4)}`}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  placeAddress: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 5,
  },
  placeRating: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 5,
    fontStyle: 'italic'
  },
  coordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  coordsText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 5,
    fontWeight: 600
  },
});

export default PlaceInfo; 