import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ChevronDownIconProps {
  fillColor?: string;
  size?: number;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ fillColor = 'black', size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill={fillColor} />
  </Svg>
);

export default ChevronDownIcon; 