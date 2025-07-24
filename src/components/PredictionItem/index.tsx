import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PredictionType } from '@src/types';
import LocationPinIcon from '@src/assets/svgs/LocationPinIcon';
import { colors } from '@src/theme/colors';
import { fonts } from '@src/theme/fonts';

interface PredictionItemProps {
  item: PredictionType;
  onPress: (placeId: string, description: string) => void;
  isLast: boolean;
}

const PredictionItem: React.FC<PredictionItemProps> = ({ item, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.predictionItem, isLast && styles.lastItem]}
    onPress={() => onPress(item.place_id, item.description)}
  >
    <LocationPinIcon size={30} fillColor={colors.primary} />
    <View style={styles.predictionTextContainer}>
      <Text style={styles.mainText}>{item.structured_formatting.main_text}</Text>
      <Text style={styles.secondaryText}>
        {item.structured_formatting.secondary_text}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  predictionTextContainer: {
    marginLeft: 10,
  },
  mainText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  secondaryText: {
    color: colors.grey,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
});

export default PredictionItem; 