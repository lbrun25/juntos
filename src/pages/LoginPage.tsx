import React, {memo, useEffect, useState} from 'react';
import {View} from 'src/components/ui/View';
import {Text} from 'src/components/ui/Text';
import {
  Alert,
  AppState,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import {Space} from 'src/components/Space';
import {useTheme} from 'styled-components';
import {Button} from 'src/components/Button';
import {IS_IOS} from 'src/constants/platform';
import {AppStackScreenProps, useRouteNavigation} from 'src/navigation';
import { LoginPasswordTextField } from "src/components/LoginPasswordTextField";
import { useDispatch, useSelector } from "src/hooks/useSelector";
import { isSessionExpiredSelector } from "src/modules/auth/selectors";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "src/components/ui/TouchableOpacity";
import { Colors } from "src/constants/colors";
import { SignupPasswordTextField } from "src/components/SignupPasswordTextField";
import { LoginEmailTextField } from "src/components/LoginEmailTextField";
import { supabase } from "src/lib/supabase";
import { registered } from "src/modules/user/actions";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const LoginPageComponent = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const {reset} = useRouteNavigation<AppStackScreenProps<'login'>>();
  const isSessionExpired = useSelector(isSessionExpiredSelector);
  const hasRegistered = useSelector(state => state.user.hasRegistered);
  const [loading, setLoading] = useState(false);
  const toastTopOffset = 60;
  const [mode, setMode] = useState<'signup' | 'login'>(hasRegistered ? "login" : "signup");
  const dispatch = useDispatch();

  async function signIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.error("cannot sign in:", error);
      Toast.show({
        type: 'error',
        text1: "La connexion a échoué",
        visibilityTime: 10000,
        topOffset: toastTopOffset,
      });
    }
    if (!error) goToNextPage();
    setLoading(false)
  }

  async function signUp() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) {
      console.error("cannot sign up:", error);
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 10000,
        topOffset: toastTopOffset,
      });
    }
    if (!session && !error) Alert.alert('Please check your inbox for email verification!')
    if (!error && session) {
      goToNextPage();
      dispatch(registered());
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isSessionExpired) {
      Toast.show({
        type: 'info',
        text1: "Votre session a expiré",
        topOffset: toastTopOffset,
      });
    }
  }, [isSessionExpired]);

  const goToNextPage = () => {
    if (mode === 'signup')
      reset({ routes: [{ name: "welcomeOnboarding" }] });
    if (mode === 'login')
      reset({routes: [{ name: "mainBottomTab" }]});
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
  };

  const onLoginPress = () => {
    if (email.length < 1) setIsEmailValid(false);
    if (password.length < 1) setIsPasswordValid(false);
    if (isEmailValid && isPasswordValid) {
      mode === 'login' ? signIn() : signUp();
    }
  };

  const onEmailValidityChange = (status: boolean) => {
    setIsEmailValid(status);
  };

  const onPasswordValidityChange = (status: boolean) => {
    setIsPasswordValid(status);
  };

  return (
    <View bg-primary flex useFlexSafeArea>
      <StatusBar barStyle="dark-content"/>
      <View bg-bgPage flex center padding-4>
        <Text headerPage>{mode === "login" ? "Connexion" : "Créer un compte"}</Text>
        <Space height={8}/>
        <KeyboardAvoidingView
          style={{width: "100%"}}
          behavior={IS_IOS ? 'padding' : 'height'}
          keyboardVerticalOffset={170}
        >
          <Text h4 medium>{"Adresse mail"}</Text>
          <Space height={2}/>
          <LoginEmailTextField
            value={email}
            onEmailChange={onEmailChange}
            onEmailChangeValidity={onEmailValidityChange}
            isEmailValid={isEmailValid}
          />
          <Space height={4}/>
          <Text h4 medium>{"Mot de passe"}</Text>
          <Space height={2}/>
          {mode === 'login' ? (
            <LoginPasswordTextField
              value={password}
              onPasswordChange={onPasswordChange}
              onChangeValidity={onPasswordValidityChange}
              isValid={isPasswordValid}
            />
          ) : (
            <SignupPasswordTextField
              value={password}
              onPasswordChange={onPasswordChange}
              onChangeValidity={onPasswordValidityChange}
              isValid={isPasswordValid}
            />
          )}
          <Space height={6}/>
          <Button
            onPress={onLoginPress}
            label={mode === "login" ? "Se connecter" : "S'inscrire"}
            labelColor={theme.colors.contentOnPrimary}
            labelProps={{demiBold: true}}
            color={theme.colors.onPrimary}
            br100
            loadingLabel={"Connexion..."}
            loadingColor={theme.colors.contentOnPrimary}
            isLoading={loading}
          />
        </KeyboardAvoidingView>
        <Space height={6} />
        <View row center>
          <Text callout>
            {mode === "login" ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
          </Text>
          <TouchableOpacity paddingL-2 paddingR-4 paddingV-4 onPress={() => setMode(mode === "login" ? "signup" : "login")}>
            <Text callout demiBold center color={Colors.black}>
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export const LoginPage = memo(LoginPageComponent);
