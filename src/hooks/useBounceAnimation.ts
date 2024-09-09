import {Animated} from 'react-native';
import {useState} from 'react';

export const useBounceAnimation = (
  initialValue = 1
): [Animated.Value, () => void] => {
  const [bounce] = useState(new Animated.Value(initialValue));

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(bounce, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounce, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return [bounce, startAnimation];
};
