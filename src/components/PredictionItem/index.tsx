import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PredictionType } from '@src/types';
import LocationPinIcon from '@src/assets/svgs/LocationPinIcon';
import { colors } from '@src/theme/colors';

interface PredictionItemProps {
  item: PredictionType;
  onPress: (placeId: string, description: string) => void;
}

const PredictionItem: React.FC<PredictionItemProps> = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.predictionItem}
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
  predictionTextContainer: {
    marginLeft: 10,
  },
  mainText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryText: {
    color: colors.grey,
    fontSize: 13,
  },
});

export default PredictionItem; 