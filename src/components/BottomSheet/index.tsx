import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '@src/theme/colors';
import ChevronDownIcon from '@src/assets/svgs/ChevronDownIcon';
import ChevronUpIcon from '@src/assets/svgs/ChevronUpIcon';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.5;
export const BOTTOM_SHEET_MIN_HEIGHT = SCREEN_HEIGHT * 0.1;

interface BottomSheetProps {
  children: React.ReactNode;
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, isMinimized, setIsMinimized }) => {
  const animatedHeight = useRef(new Animated.Value(BOTTOM_SHEET_MAX_HEIGHT)).current;

  const toggleSheet = () => {
    const toValue = isMinimized ? BOTTOM_SHEET_MAX_HEIGHT : BOTTOM_SHEET_MIN_HEIGHT;
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMinimized(!isMinimized);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: animatedHeight,
        },
      ]}
    >
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSheet}>
        {isMinimized ? (
          <ChevronUpIcon size={50} fillColor={colors.grey} />
        ) : (
          <ChevronDownIcon size={50} fillColor={colors.grey} />
        )}
      </TouchableOpacity>
      <View style={styles.contentContainer}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleButton: {
    alignSelf: 'center',
    paddingVertical: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default BottomSheet; 