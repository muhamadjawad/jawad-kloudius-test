import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import ArrowIcon from '@src/assets/svgs/ArrowIcon';

const MARKER_INDICATOR_SIZE = 40;

interface MarkerIndicatorProps {
    rotation: Animated.Value;
    visible: boolean;
}

const MarkerIndicator: React.FC<MarkerIndicatorProps> = ({ rotation, visible }) => {
    if (!visible) {
        return null;
    }

    const rotate = rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={[styles.container, { transform: [{ rotate }] }]}>
            <ArrowIcon  size={50} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: MARKER_INDICATOR_SIZE,
        height: MARKER_INDICATOR_SIZE,
        marginLeft: -MARKER_INDICATOR_SIZE / 2,
        marginTop: -MARKER_INDICATOR_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
});

export default MarkerIndicator; 