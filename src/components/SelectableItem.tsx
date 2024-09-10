import React, { memo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "src/components/ui/TouchableOpacity";
import { View } from "src/components/ui/View";
import styled, { useTheme } from "styled-components";
import { Space } from "src/components/Space";
import { Colors } from "src/constants/colors";
import { Text } from "src/components/ui/Text";

export type SelectableItemProps = TouchableOpacityProps & {
  children?: React.ReactNode;
  label?: string;
  id: string;
  isSelected: boolean
  onSelect: (value: string) => void;
  backgroundColor?: string;
};

const SelectableItemComponent = ({label, children, isSelected, onSelect, id, backgroundColor = Colors.white, ...props}: SelectableItemProps) => {
  return (
    <TouchableOpacity row center onPress={() => onSelect(id)} {...props}>
      <View row center padding-4 backgroundColor={backgroundColor} br40>
        {label && (
          <View flex width="100%">
            <Text body medium>
              {label}
            </Text>
          </View>
        )}
        {!label && children}
        <Space width={2} />
        <Circle center isSelected={isSelected} />
      </View>
    </TouchableOpacity>
  )
}

interface IconContainerProps {
  isSelected: boolean;
}

const Circle = styled(View)<IconContainerProps>`
  background-color: ${({isSelected, theme}) =>
  isSelected ? theme.colors.primary : theme.colors.background};
  width: ${({theme}) => theme.gridUnit * 5}px;
  height: ${({theme}) => theme.gridUnit * 5}px;
  border-radius: ${({theme}) => theme.borderRadius.full}px;
  border-width: ${({isSelected}) => (isSelected ? 0 : 2)}px;
  border-color: ${({theme}) => theme.colors.darkGray};
`;


export const SelectableItem = memo(SelectableItemComponent);
