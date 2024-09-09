import {View as UIView, ViewProps} from 'react-native-ui-lib';
import React, {memo} from 'react';
import {usePropsWithTheme} from 'src/hooks/usePropsWithTheme';
import SafeAreaView from '../SafeAreaView';

type Props = ViewProps & {
  useFlexSafeArea?: boolean;
  borderRadius?: number;
};

const ViewComponent = ({children, useSafeArea, useFlexSafeArea, ...props}: Props): React.JSX.Element => {
  const finalProps = usePropsWithTheme(props);
  const content =
    useSafeArea || useFlexSafeArea ? (
      <SafeAreaView style={{flex: useFlexSafeArea ? 1 : 0}}>{children}</SafeAreaView>
    ) : (
      children
    );

  return <UIView {...finalProps}>{content}</UIView>;
};

export const View = memo(ViewComponent);
