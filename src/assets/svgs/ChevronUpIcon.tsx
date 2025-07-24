import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ChevronUpIconProps {
  fillColor?: string;
  size?: number;
}

const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({ fillColor = 'black', size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill={fillColor} />
  </Svg>
);

export default ChevronUpIcon; 