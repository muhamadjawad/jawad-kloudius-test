import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PlaceDetailsType } from '@src/types';
import { colors } from '@src/theme/colors';
import StarIcon from '@src/assets/svgs/StarIcon';
import GlobeIcon from '@src/assets/svgs/GlobeIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon';
import { GOOGLE_PLACES_API_KEY } from '@env';

interface PlaceInfoProps {
  selectedPlace: PlaceDetailsType;
  isMinimized: boolean;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ selectedPlace, isMinimized }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const photoReference = selectedPlace.photos?.[0]?.photo_reference;
  const photoUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`
    : null;

  return (
    <>
      {!isMinimized && photoUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photoUrl }}
            style={styles.placeImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && <View style={styles.imagePlaceholder} />}
        </View>
      )}
      <Text style={styles.placeName} numberOfLines={isMinimized ? 1 : 2}>
        {selectedPlace.name}
      </Text>
      {!isMinimized && (
        <View style={styles.detailsContainer}>
          <Text style={styles.placeAddress}>{selectedPlace.formatted_address}</Text>
          <View style={styles.infoRow}>
            <View style={styles.coordsContainer}>
              <GlobeIcon size={16} fillColor={colors.primary} />
              <Text style={styles.coordsText}>
                {`${selectedPlace.geometry.location.lat.toFixed(
                  4
                )}, ${selectedPlace.geometry.location.lng.toFixed(4)}`}
              </Text>
            </View>
            {selectedPlace.rating && (
              <View style={styles.ratingContainer}>
                <StarIcon size={16} fillColor={colors.secondary} />
                <Text style={styles.placeRating}>{selectedPlace.rating}</Text>
              </View>
            )}
          </View>
          {selectedPlace.formatted_phone_number && (
            <View style={styles.phoneContainer}>
              <PhoneIcon size={16} fillColor={colors.primary} />
              <Text style={styles.phoneText}>{selectedPlace.formatted_phone_number}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
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
    fontWeight: '600',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  phoneText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 5,
  },
});

export default PlaceInfo; 