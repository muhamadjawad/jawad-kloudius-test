import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PredictionType } from '@src/types';
import { colors } from '@src/theme/colors';
import { fonts } from '@src/theme/fonts';
import CrossIcon from '@src/assets/svgs/CrossIcon';
import ClockIcon from '@src/assets/svgs/ClockIcon';

interface HistoryItemProps {
  item: PredictionType;
  onPress: (placeId: string, description: string) => void;
  onRemove: (placeId: string) => void;
  isLast: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress, onRemove, isLast }) => (
  <TouchableOpacity
    style={[styles.historyItem, isLast && styles.lastItem]}
    onPress={() => onPress(item.place_id, item.description)}
  >
    <ClockIcon size={24} fillColor={colors.grey} />
    <View style={styles.textContainer}>
      <Text style={styles.mainText}>{item.structured_formatting.main_text}</Text>
      <Text style={styles.secondaryText}>
        {item.structured_formatting.secondary_text}
      </Text>
    </View>
    <TouchableOpacity onPress={() => onRemove(item.place_id)}>
      <CrossIcon size={20} fillColor={colors.danger} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  textContainer: {
    flex: 1,
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

export default HistoryItem; 