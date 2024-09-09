import {useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export const useRotationAnimation = (duration: number): Animated.Value => {
  const rotation = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  return rotation;
};
