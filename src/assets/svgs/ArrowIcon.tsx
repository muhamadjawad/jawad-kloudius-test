import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@src/theme/colors';

interface ArrowIconProps {
  size?: number;
  fillColor?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ size = 40, fillColor = colors.danger }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M2 12 L22 2 L18 12 L22 22 Z" fill={fillColor} transform="rotate(90 12 12)" />
  </Svg>
);

export default ArrowIcon; 