import React, {memo} from "react";
import {useNavigation} from "@react-navigation/native";
import {View} from "src/components/ui/View";
import {TouchableOpacity} from "src/components/ui/TouchableOpacity";
import Icon from "react-native-vector-icons/Ionicons";
import {IS_IOS} from "src/constants/platform";
import {Colors} from "src/constants/colors";
import {useTheme} from "styled-components";

interface HeaderBackButtonProps {
  iconColor?: string;
}

/**
 * A custom header back button component.
 * This component uses the `useNavigation` hook to navigate back to the previous screen when pressed.
 * It renders a chevron on iOS and an arrow on Android.
 * @returns {JSX.Element} The custom header back button component.
 */
const HeaderBackButtonComponent = ({iconColor = Colors.black}: HeaderBackButtonProps): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function renderIcon(name: string) {
    return <Icon name={name} size={theme.iconSizes.xl} color={iconColor} />
  }

  return (
    <View center>
      <TouchableOpacity onPress={handleGoBack}>
        {IS_IOS
          ? renderIcon("chevron-back")
          : renderIcon("arrow-back")
        }
      </TouchableOpacity>
    </View>
  )
}

// The headerBackTitleVisible prop of react-navigation does not work, so we use a custom header back button as a workaround.

export const HeaderBackButton = memo(HeaderBackButtonComponent);
