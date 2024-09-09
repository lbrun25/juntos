import React, {memo, useState} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {TextField, TextFieldProps} from 'src/components/ui/TextField';
import {IconTextField} from 'src/components/IconTextField';
import {useTheme} from 'styled-components';
import { PASSWORD_MIN_LENGTH, passwordRegex } from "src/constants/auth";

type SignupPasswordTextFieldProps = TextFieldProps & {
  onPasswordChange: (value: string) => void;
  value: string;
}

const SignupPasswordTextFieldComponent = (props: SignupPasswordTextFieldProps): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const [validationMessage, setValidationMessage] = useState('');

  const onPasswordChange = (value: string) => {
    props.onPasswordChange(value);

    const validationMsg = getValidationMessage(value);
    setValidationMessage(validationMsg);
  }

  const onShowPasswordPress = () => {
    setShowPassword(!showPassword);
  }

  const getValidationMessage = (password: string): string => {
    if (!/[a-z]/.test(password))
      return "Le mot de passe doit contenir au moins une lettre minuscule";
    if (!/[A-Z]/.test(password))
      return "Le mot de passe doit contenir au moins une lettre majuscule";
    if (!/\d/.test(password))
      return "Le mot de passe doit contenir au moins un chiffre";
    if (password.length < PASSWORD_MIN_LENGTH)
      return `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères`;
    return "";
  }

  const validateInput = (value: string) => {
    return passwordRegex.test(value);
  };

  return (
    <TextField
      secureTextEntry={!showPassword}
      onChangeText={onPasswordChange}
      withBackground
      leftIcon={
        <IconTextField
          name="lock-closed-outline"
          color={props.isValid ? theme.colors.gray : theme.colors.darkCharcoal}
        />
      }
      rightIcon={
        <>
          {props.value.length > 0 && (
            <TouchableOpacity
              flex
              centerV
              onPress={onShowPasswordPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              {showPassword
                ? <IconTextField name="eye-off-outline" />
                : <IconTextField name="eye-outline" />
              }
            </TouchableOpacity>
          )}
        </>
      }
      validate={validateInput}
      validationMessage={validationMessage}
      rounded
      placeholder="Votre mot de passe"
      placeholderTextColor={props.isValid ? theme.colors.gray : theme.colors.darkCharcoal}
      {...props}
    />
  )
}

export const SignupPasswordTextField = memo(SignupPasswordTextFieldComponent);
