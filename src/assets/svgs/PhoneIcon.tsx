import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface PhoneIconProps {
  fillColor?: string;
  size?: number;
}

const PhoneIcon: React.FC<PhoneIconProps> = ({ fillColor = 'black', size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.75-.25 1.02l-2.2 2.2z"
      fill={fillColor}
    />
  </Svg>
);

export default PhoneIcon; 