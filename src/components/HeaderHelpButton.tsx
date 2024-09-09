import React, {memo, useState} from "react";
import {TouchableOpacity} from "src/components/ui/TouchableOpacity";
import Icon from "react-native-vector-icons/Ionicons";
import {useTheme} from "styled-components";
import {Colors} from "src/constants/colors";
import {Text} from "src/components/ui/Text";
import {View} from "src/components/ui/View";
import {Space} from "src/components/Space";
import {Button} from "src/components/Button";
import {useTranslation} from "react-i18next";
import {BottomSheet} from "src/components/BottomSheet";

interface HeaderHelpButtonProps {
  color?: string;
  backgroundColor?: string,
  buttonLabelColor?: string;
  buttonBackgroundColor?: string;
  icon: string;
  title: string;
  content: string;
}

const HeaderHelpButtonComponent = (
  {
    color = Colors.black,
    backgroundColor = Colors.white,
    buttonLabelColor = Colors.white,
    buttonBackgroundColor = Colors.turquoise,
    icon,
    title,
    content
  }: HeaderHelpButtonProps): JSX.Element => {
  const theme = useTheme();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const {t} = useTranslation();

  const onIconPressed = () => {
    setModalIsVisible(true);
  }

  const onDismiss = () => {
    setModalIsVisible(false);
  }

  return (
    <>
      <TouchableOpacity onPress={onIconPressed}>
        <Icon
          name="information-circle-sharp"
          size={theme.iconSizes.xl}
          color={color}
        />
      </TouchableOpacity>
      <BottomSheet
        isVisible={modalIsVisible}
        onDismiss={onDismiss}
        backgroundColor={backgroundColor}
      >
        <Text infoEmoji>{icon}</Text>
        <Space height={4} />
        <Text h4 bold center>{title}</Text>
        <Space height={4} />
        <Text body medium center>{content}</Text>
        <Space height={8} />
        <View width="100%">
          <Button
            onPress={onDismiss}
            labelColor={buttonLabelColor!}
            labelProps={{ demiBold: true }}
            label={"OK"}
            backgroundColor={buttonBackgroundColor!}
            br100
          />
        </View>
      </BottomSheet>
    </>
  );
};

export const HeaderHelpButton = memo(HeaderHelpButtonComponent);
