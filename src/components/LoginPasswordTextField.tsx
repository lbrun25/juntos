import React, {memo, useState} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {TextField, TextFieldProps} from 'src/components/ui/TextField';
import {IconTextField} from 'src/components/IconTextField';
import {useTheme} from 'styled-components';

type LoginPasswordTextFieldProps = TextFieldProps & {
  onPasswordChange: (value: string) => void;
  value: string;
}

const LoginPasswordTextFieldComponent = (props: LoginPasswordTextFieldProps): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const onPasswordChange = (value: string) => {
    props.onPasswordChange(value);
  }

  const onShowPasswordPress = () => {
    setShowPassword(!showPassword);
  }

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
      enableErrors
      validationMessage={"Le mot de passe est requis"}
      validate={['required']}
      validateOnChange
      rounded
      placeholder="Votre mot de passe"
      placeholderTextColor={props.isValid ? theme.colors.gray : theme.colors.darkCharcoal}
      {...props}
    />
  )
}

export const LoginPasswordTextField = memo(LoginPasswordTextFieldComponent);
