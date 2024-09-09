import styled from 'styled-components';
import {
  Colors,
  TextField as UITextField,
  TextFieldProps as UITextFieldProps
} from 'react-native-ui-lib';
import {usePropsWithTheme} from 'src/hooks/usePropsWithTheme';
import {useTheme} from 'styled-components';
import React, {memo} from 'react';
import {View} from 'src/components/ui/View';

export type TextFieldProps = UITextFieldProps & {
  validationMessage?: string,
  withBackground?: boolean,
  leftIcon?: React.ReactElement,
  rightIcon?: React.ReactElement,
  isValid?: boolean,
  onColor?: 'onBackground' | 'onPrimary',
  borderRadius?: number;
  rounded?: boolean;
};

interface TextFieldFocusProps {
  invalidColor: string;
  cornerRadius: number;
}

const TextFieldFocus = styled(UITextField)
  .attrs<TextFieldFocusProps>(props => ({
    validationMessageStyle: {
      fontSize: props.theme.fontSizes.m,
      fontWeight: props.theme.fontWeights.bold,
      fontFamily: props.theme.fontFamily,
      color: props.invalidColor,
      textAlign: 'center',
      width: '100%',
      marginTop: props.theme.gridUnit
    }
  }))<TextFieldFocusProps>`
  font-size: ${({theme}) => `${theme.fontSizes['3xl']}px`};
  font-weight: ${({theme}) => theme.fontWeights.regular};
  font-family: ${({theme}) => theme.fontFamily};
  min-width: 150px;
`;

interface TextFieldBackgroundProps {
  isInvalid: boolean;
  invalidColor: string;
  cornerRadius: number;
}

const TextFieldBackground = styled(UITextField)
  .attrs<TextFieldBackgroundProps>(props => ({
    floatingPlaceholderStyle: {
      fontSize: props.theme.fontSizes.m,
      fontWeight: props.theme.fontWeights.bold,
      fontFamily: props.theme.fontFamily
    },
    validationMessageStyle: {
      fontSize: props.theme.fontSizes.m,
      fontWeight: props.theme.fontWeights.bold,
      fontFamily: props.theme.fontFamily,
      color: props.invalidColor,
      textAlign: 'left',
      width: '100%',
      marginTop: props.theme.gridUnit
    }
  }))<TextFieldBackgroundProps>`
  font-size: ${({theme}) => `${theme.fontSizes.m}px`};
  font-weight: ${({theme}) => theme.fontWeights.regular};
  font-family: ${({theme}) => theme.fontFamily};
  min-width: 150px;
  background-color: ${({isInvalid, invalidColor}) => {
    if (isInvalid) return Colors.rgba(invalidColor, 0.2);
    return 'white';
  }};
  padding: ${({theme}) => `${theme.gridUnit * 4}px ${theme.gridUnit}px`};
  border-top-left-radius: ${({leadingAccessory, cornerRadius}) => {
    if (leadingAccessory) return '0px';
    return `${cornerRadius}px`;
  }};
  border-bottom-left-radius: ${({leadingAccessory, cornerRadius}) => {
    if (leadingAccessory) return '0px';
    return `${cornerRadius}px`;
  }};
  border-top-right-radius: ${({trailingAccessory, cornerRadius}) => {
    if (trailingAccessory) return '0px';
    return `${cornerRadius}px`;
  }};
  border-bottom-right-radius: ${({trailingAccessory, cornerRadius}) => {
    if (trailingAccessory) return '0px';
    return `${cornerRadius}px`;
  }};
`;

const IconContainer = styled(View)`
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => `0px ${theme.gridUnit * 4}px`};
`;

interface IconProps {
  isInvalid: boolean;
  invalidColor: string;
  cornerRadius: number;
}

const LeadingIcon = styled(IconContainer)<IconProps>`
  border-top-left-radius: ${({cornerRadius}) => {
    return `${cornerRadius}px`;
  }};
  border-bottom-left-radius: ${({cornerRadius}) => {
    return `${cornerRadius}px`;
  }};
  background-color: ${({isInvalid, invalidColor}) => {
    if (isInvalid) return Colors.rgba(invalidColor, 0.2);
    return 'white';
  }}
`;

const TrailingIcon = styled(IconContainer)<IconProps>`
  border-top-right-radius: ${({cornerRadius}) => {
    return `${cornerRadius}px`;
  }};
  border-bottom-right-radius: ${({cornerRadius}) => {
    return `${cornerRadius}px`;
  }};
  background-color: ${({isInvalid, invalidColor}) => {
    if (isInvalid) return Colors.rgba(invalidColor, 0.2);
    return 'white';
  }}
`;

const TextFieldComponent = (
  {
    validationMessage,
    isValid,
    onColor = 'onPrimary',
    borderRadius = 0,
    rounded,
    ...props
  }: TextFieldProps
): React.JSX.Element => {
  const theme = useTheme();
  const finalProps = usePropsWithTheme(props);

  const activateValidation = typeof validationMessage === "string";
  const cornerRadius = rounded && !borderRadius ? theme.borderRadius.l : borderRadius;

  const TextFieldStyled = props.withBackground ? TextFieldBackground : TextFieldFocus;

  const getInvalidColor = (): string => {
    if (onColor === 'onBackground') return theme.colors.error;
    if (onColor === 'onPrimary') return theme.colors.errorOnPrimary;
    return theme.colors.error;
  };

  return (
    <TextFieldStyled
      theme={theme}
      body
      enableErrors={activateValidation}
      validateOnChange={activateValidation}
      validationMessage={validationMessage ? validationMessage : ''}
      isInvalid={!isValid}
      invalidColor={getInvalidColor()}
      leadingAccessory={
        props.leftIcon && props.withBackground ? (
          <LeadingIcon
            isInvalid={!isValid}
            invalidColor={getInvalidColor()}
            cornerRadius={cornerRadius}
          >
            <View flex centerV>
              {props.leftIcon}
            </View>
          </LeadingIcon>
        ) : props.leftIcon && !props.withBackground ? (
          props.leftIcon
        ) : undefined
      }
      trailingAccessory={
        props.rightIcon && props.withBackground ? (
          <TrailingIcon
            isInvalid={!isValid}
            invalidColor={getInvalidColor()}
            cornerRadius={cornerRadius}
          >
            <View flex centerV>
              {props.rightIcon}
            </View>
          </TrailingIcon>
        ) : props.rightIcon && !props.withBackground ? (
          props.rightIcon
        ) : undefined
      }
      cornerRadius={cornerRadius}
      {...finalProps}
    />
  );
};

export const TextField = memo(TextFieldComponent);
