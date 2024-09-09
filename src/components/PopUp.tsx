import { memo, ReactNode } from "react";
import { Dialog, DialogProps } from "react-native-ui-lib";
import { Colors } from "src/constants/colors";
import { useTheme } from "styled-components";
import { View } from "src/components/ui/View";

type PopUpProps = {
  children: ReactNode,
  isVisible: boolean,
  onDismiss: () => void,
  backgroundColor?: string | undefined,
  title?: string,
  useDefaultHeader?: boolean,
} & DialogProps;

const PopUpComponent = (
  {
    children,
    isVisible,
    onDismiss,
    backgroundColor = Colors.white,
    title,
    useDefaultHeader,
    ...props
  }: PopUpProps
) => {
  const theme = useTheme();

  return (
    <Dialog
      visible={isVisible}
      onDismiss={onDismiss}
      center
      containerStyle={{
        backgroundColor: backgroundColor ? backgroundColor : Colors.white,
        borderRadius: theme.borderRadius["2xl"],
        marginHorizontal: 16
      }}
      width="100%"
      {...props}
    >
      <View padding-4 marginB-8 center>
        {children}
      </View>
    </Dialog>
  )
}

export const PopUp = memo(PopUpComponent);
