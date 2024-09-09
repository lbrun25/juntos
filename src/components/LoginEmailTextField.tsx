import React, { memo, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { emailRegex } from "src/constants/auth";
import { TextField, TextFieldProps } from "src/components/ui/TextField";
import { useTheme } from "styled-components";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type LoginEmailTextFieldProps = TextFieldProps & {
  onEmailChange: (value: string) => void;
  value: string;
  isEmailValid: boolean;
  onEmailChangeValidity: (isValid: boolean) => void;
}

const LoginEmailTextFieldComponent = (props: LoginEmailTextFieldProps) => {
  const theme = useTheme();
  const [validationMessage, setValidationMessage] = useState('');

  const onEmailChange = (value: string) => {
    props.onEmailChange(value);
  }

  const onEmailTextFieldBlur = async (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!emailRegex.test(event.nativeEvent.text)) {
      setValidationMessage("L'email est incorrect");
      props.onEmailChangeValidity(false);
    } else {
      setValidationMessage("");
      props.onEmailChangeValidity(true);
    }
  }

  return (
    <TextField
      autoCapitalize='none'
      withBackground
      onChangeText={onEmailChange}
      leftIcon={
        <Icon
          name='mail-outline'
          size={24}
          color={props.isEmailValid ? theme.colors.gray : theme.colors.darkCharcoal}
        />
      }
      enableErrors
      validationMessage={validationMessage}
      onBlur={onEmailTextFieldBlur}
      isValid={props.isEmailValid}
      placeholder="Votre adresse mail"
      placeholderTextColor={props.isEmailValid ? theme.colors.gray : theme.colors.darkCharcoal}
      rounded
    />
  )
};

export const LoginEmailTextField = memo(LoginEmailTextFieldComponent);
