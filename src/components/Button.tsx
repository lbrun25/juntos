import React, { memo } from "react";
import { Insets } from "react-native";
import { TextProps, TouchableOpacityProps } from "react-native-ui-lib";
import { Text } from "src/components/ui/Text";
import styled, { useTheme } from "styled-components";
import { Space } from "./Space";
import { TouchableOpacity } from "src/components/ui/TouchableOpacity";
import { View } from "src/components/ui/View";
import { Colors } from "src/constants/colors";
import LinearGradient from "react-native-linear-gradient";
import { ActivityIndicatorSpinner } from "src/components/ActivityIndicatorSpinner";

export type ButtonProps = TouchableOpacityProps & {
  label?: string;
  labelColor?: string;
  labelProps?: TextProps;
  color?: string;
  renderIcon?: () => React.JSX.Element;
  iconOnRight?: boolean;
  withoutBackground?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  loadingColor?: string;
  useInHeader?: boolean;
  gradientColors?: (string | number)[];
};

const ButtonComponent = ({
  disabled,
  color,
  label,
  labelColor = Colors.black,
  labelProps,
  iconOnRight,
  isLoading,
  loadingLabel,
  loadingColor = labelColor,
  children,
  gradientColors,
  ...props
}: ButtonProps): React.JSX.Element => {
  const theme = useTheme();
  const hasBorderRadiusProp =
    Object.keys(props).find(k => k.startsWith('br')) !== undefined;
  const mainColor = color || theme.colors.primary;
  const hitSlop: Insets = {top: 12, bottom: 12, left: 12, right: 12};

  const renderIcon = () => {
    if (!props.renderIcon) return null;
    return (
      <>
        {iconOnRight && <Space width={2} />}
        {props.renderIcon()}
        {!iconOnRight && <Space width={2} />}
      </>
    );
  };

  const getBackgroundColor = () => {
    if (props.withoutBackground) {
      return 'transparent';
    } else if (disabled) {
      return theme.colors.dimGray;
    } else if (gradientColors && gradientColors.length > 0) {
      return '';
    } else {
      return mainColor;
    }
  };

  const renderLoaderWithChildren = (children: React.ReactNode) => (
    <View row center>
      {isLoading && (
        <>
          <ActivityIndicatorSpinner
            color={loadingColor || theme.colors.contentOnBackground}
            size={theme.gridUnit * 5}
          />
          <Space width={3} />
        </>
      )}
      {children}
    </View>
  );

  const renderLinearGradient = (children: React.ReactNode) => {
    if (!gradientColors) return null;
    return (
      <StyledLinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        hasBorderRadiusProp={hasBorderRadiusProp}>
        <View padding-4>{renderLoaderWithChildren(children)}</View>
      </StyledLinearGradient>
    );
  };

  const wrapWithLoading = (children: React.ReactNode) => {
    if (gradientColors) return renderLinearGradient(children);
    return renderLoaderWithChildren(children);
  };

  return (
    <TouchableOpacity
      padding-4={!props.useInHeader && !gradientColors}
      centerH={!props.left && !props.right}
      br60={!hasBorderRadiusProp}
      backgroundColor={getBackgroundColor()}
      disabled={disabled}
      useActiveScale
      hitSlop={hitSlop}
      row
      {...props}>
      {!iconOnRight && renderIcon()}
      {label !== undefined &&
        wrapWithLoading(
          <Text
            medium
            body
            color={labelColor || theme.colors.background}
            {...labelProps}>
            {isLoading ? loadingLabel : label}
          </Text>,
        )}
      {children && wrapWithLoading(children)}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>
  );
};

interface StyledLinearGradientProps {
  hasBorderRadiusProp: boolean;
}

const StyledLinearGradient = styled(LinearGradient)<StyledLinearGradientProps>`
  flex: 1;
  border-radius: ${({hasBorderRadiusProp}) =>
    hasBorderRadiusProp ? '60px' : '0'};
`;

export const Button = memo(ButtonComponent);
