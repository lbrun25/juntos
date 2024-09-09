import React, {memo} from 'react';
import styled from 'styled-components';
import {Animated} from 'react-native';
import {useRotationAnimation} from 'src/hooks/useRotationAnimation';
import {View} from 'src/components/ui/View';
import {Colors} from 'react-native-ui-lib';

interface ActivityIndicatorSpinnerProps {
  color: string;
  duration?: number;
  size?: number;
  width?: number;
}

const ActivityIndicatorSpinnerComponent = (
  {
    color,
    duration = 1000,
    size = 24,
    width = 2
  }: ActivityIndicatorSpinnerProps
): React.JSX.Element => {
  const rotation = useRotationAnimation(duration!);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Container
      accessibilityRole="progressbar"
    >
      <Spinner
        color={color}
        size={size}
        style={{transform: [{rotate}]}}
        width={width}
      />
    </Container>
  );
};

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;

interface SpinnerProps {
  size: number;
  width: number;
  color: string;
}

const Spinner = styled(Animated.View)<SpinnerProps>`
  width: ${({size}) => `${size}px`};
  height: ${({size}) => `${size}px`};
  border-radius: ${({size}) => `${size / 2}px`};
  border-width: ${({width}) => `${width}px`};
  border-color: ${({color}) => Colors.rgba(color, 0.25)};
  border-top-color: ${({color}) => color};
`;

export const ActivityIndicatorSpinner = memo(ActivityIndicatorSpinnerComponent);
