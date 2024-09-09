import Icon from "react-native-vector-icons/Ionicons";
import {useTheme} from "styled-components";
import React, {memo} from "react";

interface IconTextFieldProps {
  name: string;
  size?: number;
  color?: string;
}

const IconTextFieldComponent = ({name, size, color, ...props}: IconTextFieldProps) => {
  const theme = useTheme();

  return (
    <Icon
      name={name}
      size={size ?? theme.iconSizes.l}
      color={color ?? theme.colors.gray}
      {...props}
    />
  )
}

export const IconTextField = memo(IconTextFieldComponent);
