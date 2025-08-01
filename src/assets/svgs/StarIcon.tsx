import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface StarIconProps {
  fillColor?: string;
  size?: number;
}

const StarIcon: React.FC<StarIconProps> = ({ fillColor = 'black', size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill={fillColor}
    />
  </Svg>
);

export default StarIcon; 