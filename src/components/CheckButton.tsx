import { memo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "src/components/ui/TouchableOpacity";
import Icon from 'react-native-vector-icons/Ionicons';
import styled, { useTheme } from "styled-components";
import { Text } from "src/components/ui/Text";
import { View } from "src/components/ui/View";
import { Space } from "src/components/Space";

type CheckButtonProps = TouchableOpacityProps & {
  isChecked: boolean;
  label: string;
  labelColor: string;
  onChecked: (status: boolean) => void;
}

const CheckButtonComponent = ({isChecked, label, labelColor, onChecked, ...props}: CheckButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity row onPress={() => onChecked(!isChecked)} {...props}>
      <IconContainer center isSelected={isChecked}>
        {isChecked && (
          <Icon
            name={'checkmark'}
            size={theme.iconSizes.xs}
            color={theme.colors.onPrimary}
          />
        )}
      </IconContainer>
      <Space width={2} />
      <Text footnote color={labelColor}>{label}</Text>
    </TouchableOpacity>
  )
}

interface IconContainerProps {
  isSelected: boolean;
}

const IconContainer = styled(View)<IconContainerProps>`
  background-color: ${({isSelected, theme}) => theme.colors.background};
  width: ${({theme}) => theme.gridUnit * 5}px;
  height: ${({theme}) => theme.gridUnit * 5}px;
  border-radius: ${({theme}) => theme.borderRadius.m}px;
  border-width: ${({isSelected}) => (isSelected ? 0 : 1)}px;
  border-color: ${({theme}) => theme.colors.gray};
`;

export const CheckButton = memo(CheckButtonComponent);
