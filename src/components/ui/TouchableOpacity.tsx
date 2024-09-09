import React, {memo} from 'react';
import {TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps} from 'react-native-ui-lib';
import {usePropsWithTheme} from 'src/hooks/usePropsWithTheme';
import {IS_IOS} from "src/constants/platform";

export type TouchableOpacityProps = RNTouchableOpacityProps & {
  useActiveScale?: boolean
  borderRadius?: number;
};

const TouchableOpacityComponent = (
  {useActiveScale, ...props }: TouchableOpacityProps
): React.JSX.Element => {
  if (useActiveScale && IS_IOS) {
    props = {
      ...props,
      activeScale: 0.96
    }
  }
  const propsWithTheme = usePropsWithTheme(props);

  return <RNTouchableOpacity
    activeOpacity={0.7}
    useNative={IS_IOS}
    {...propsWithTheme}
  />;
};

export const TouchableOpacity = memo(TouchableOpacityComponent);
