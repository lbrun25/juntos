import React, {memo, ReactElement, ReactNode} from 'react';
import {View} from 'src/components/ui/View';
import {useTheme} from 'styled-components';
import {Colors} from 'src/constants/colors';
import {Dialog, DialogProps} from 'react-native-ui-lib';

type BottomSheetProps = {
  children: ReactNode,
  isVisible: boolean,
  onDismiss: () => void,
  backgroundColor?: string | undefined,
  header?: ReactElement,
  title?: string,
  useDefaultHeader?: boolean,
} & DialogProps;

const BottomSheetComponent = (
  {
    children,
    isVisible,
    onDismiss,
    backgroundColor = Colors.white,
    header,
    title,
    useDefaultHeader,
    ...props
  }: BottomSheetProps
) => {
  const theme = useTheme();

  return (
    <Dialog
      visible={isVisible}
      onDismiss={onDismiss}
      bottom={true}
      containerStyle={{
        backgroundColor: backgroundColor ? backgroundColor : Colors.white,
        borderTopLeftRadius: theme.borderRadius["2xl"],
        borderTopRightRadius: theme.borderRadius["2xl"],
      }}
      width="100%"
      {...props}
    >
      <View padding-4 marginB-8 center>
        {children}
      </View>
    </Dialog>
  );
};

export const BottomSheet = memo(BottomSheetComponent);
