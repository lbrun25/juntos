import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {AppStackParamList} from 'src/navigation';
import {MainBottomTab} from 'src/navigators/MainBottomTab';
import {SplashScreen} from 'src/pages/SplashScreen';
import {LoginPage} from 'src/pages/LoginPage';
import {HeaderBackButton} from 'src/components/HeaderBackButton';
import {useTheme} from 'styled-components';
import {useSelector} from 'src/hooks/useSelector';
import {
  isSessionExpiredSelector,
} from 'src/modules/auth/selectors';
import {useNavigation} from '@react-navigation/native';
import { WelcomeOnboardingPage } from "src/pages/onboarding/WelcomeOnboardingPage";
import { FirstNamePage } from "src/pages/onboarding/FirstNamePage";
import { BirthdayPage } from "src/pages/onboarding/BirthdayPage";
import { GenderPage } from "src/pages/onboarding/GenderPage";
import { SexualOrientationPage } from "src/pages/onboarding/SexualOrientationPage";
import { ChooseWhoToMeetPage } from "src/pages/onboarding/ChooseWhoToMeetPage";
import { MaxDistancePage } from "src/pages/onboarding/MaxDistancePage";
import { BioPage } from "src/pages/onboarding/BioPage";
import { UploadPicturesPage } from "src/pages/onboarding/UploadPicturesPage";
import { AllowLocationPage } from "src/pages/onboarding/AllowLocationPage";
import { AcceptTermsPage } from "src/pages/onboarding/AcceptTermsPage";
import { ChooseOrSuggestPage } from "src/pages/onboarding/ChooseOrSuggestPage";
import { ExplainWatermelonPage } from "src/pages/onboarding/ExplainWatermelonPage";
import { ExplainUserTypesPage } from "src/pages/onboarding/ExplainUserTypesPage";
import { ExplainMeetingValidationPage } from "src/pages/onboarding/ExplainMeetingValidationPage";
import { GoodMeetingPage } from "src/pages/onboarding/GoodMeetingPage";

const {Screen, Navigator, Group} =
  createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const isSessionExpired = useSelector(isSessionExpiredSelector);

  useEffect(() => {
    if (isSessionExpired) {
      navigation.reset({routes: [{name: 'login' as never}]});
    }
  }, [isSessionExpired]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="splash" component={SplashScreen} />
      <Screen name="mainBottomTab" component={MainBottomTab} />
      <Screen
        name="login"
        component={LoginPage}
        options={{
          title: "Connexion",
          headerShown: false,
          headerTintColor: theme.colors.onPrimary,
          headerStyle: {backgroundColor: theme.colors.primary},
        }}
      />
      <Group
        screenOptions={{
          headerShown: false,
          title: "",
          headerShadowVisible: false,
          headerTintColor: theme.colors.onPrimary,
          headerLeft: () => (
            <HeaderBackButton iconColor={theme.colors.onPrimary} />
          ),
          headerStyle: {backgroundColor: theme.colors.primary},
        }}
      >
        <Screen name="welcomeOnboarding" component={WelcomeOnboardingPage} />
        <Screen name="firstName" component={FirstNamePage} />
        <Screen name="birthday" component={BirthdayPage} />
        <Screen name="gender" component={GenderPage} />
        <Screen name="sexualOrientation" component={SexualOrientationPage} />
        <Screen name="chooseWhoToMeet" component={ChooseWhoToMeetPage} />
        <Screen name="maxDistance" component={MaxDistancePage} />
        <Screen name="bio" component={BioPage} />
        <Screen name="uploadPictures" component={UploadPicturesPage} />
        <Screen name="allowLocation" component={AllowLocationPage} />
        <Screen name="acceptTerms" component={AcceptTermsPage} />
        <Screen name="chooseOrSuggest" component={ChooseOrSuggestPage} />
        <Screen name="explainWatermelon" component={ExplainWatermelonPage} />
        <Screen name="explainUserTypes" component={ExplainUserTypesPage} />
        <Screen name="explainMeetingValidation" component={ExplainMeetingValidationPage} />
        <Screen name="goodMeeting" component={GoodMeetingPage} />
      </Group>
    </Navigator>
  );
};

export const getNextSignupPage = (
  current: keyof Omit<AppStackParamList, 'mainBottomTab'>,
) => {
  const index = SignupPagesOrdered.indexOf(current);
  if (index === -1) return SignupPagesOrdered[0];
  if (index === SignupPagesOrdered.length - 1) return undefined;
  return SignupPagesOrdered[index + 1];
};

export const getIndexSignUpPage = (
  route: keyof Omit<AppStackParamList, 'mainBottomTab'>,
): number => {
  return SignupPagesOrdered.indexOf(route);
};

export const popCountToSignUpPage = (
  current: keyof Omit<AppStackParamList, 'mainBottomTab'>,
  destination: keyof Omit<AppStackParamList, 'mainBottomTab'>,
): number => {
  return getIndexSignUpPage(current) - getIndexSignUpPage(destination);
};

const SignupPagesOrdered: Array<
  keyof Omit<AppStackParamList, 'mainBottomTab'>
> = [
  'welcomeOnboarding',
  'firstName',
  'birthday',
  'gender',
  'sexualOrientation',
  'chooseWhoToMeet',
  'maxDistance',
  'bio',
  'uploadPictures',
  'allowLocation',
  'acceptTerms',
  'chooseOrSuggest',
  'explainWatermelon',
  'explainUserTypes',
  'explainMeetingValidation',
  'goodMeeting'
];
