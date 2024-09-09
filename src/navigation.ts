import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * AppStack
 */
export type AppStackParamList = {
  splash: undefined;
  mainBottomTab: NavigatorScreenParams<MainBottomTabParamList>;

  login: undefined;
  welcomeOnboarding: undefined;
  firstName: undefined;
  birthday: undefined;
  gender: undefined;
  sexualOrientation: undefined;
  chooseWhoToMeet: undefined;
  maxDistance: undefined;
  bio: undefined;
  uploadPictures: undefined;
  allowLocation: undefined;
  acceptTerms: undefined;
  chooseOrSuggest: undefined;
  explainWatermelon: undefined;
  explainUserTypes: undefined;
  explainMeetingValidation: undefined;
  goodMeeting: undefined;

  businessDetail: undefined; // TODO: pass Business object
  scheduleDate: undefined;
  confirmationDate: undefined;
  statusDate: undefined;
};

export type AppStackScreenProps<RouteName extends keyof AppStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, RouteName>,
    BottomTabScreenProps<MainBottomTabParamList>
  >;

/**
 * MainBottomTab
 */
export type MainBottomTabParamList = {
  home: undefined;
  notifications: undefined;
  invitations: undefined;
  confirmations: undefined;
  profile: undefined;
};

export type MainBottomTabScreenProps<
  RouteName extends keyof MainBottomTabParamList,
> = BottomTabScreenProps<MainBottomTabParamList, RouteName>;

/**
 * Utility
 */

type ScreenProps =
  | BottomTabScreenProps<any, any>
  | CompositeScreenProps<any, any>
  | StackScreenProps<any, any>
  | NativeStackScreenProps<any, any>;

export function useRouteNavigation<T extends ScreenProps>() {
  const route = useRoute<T['route']>();
  const navigation = useNavigation<T['navigation']>();
  return {...navigation, ...route};
}
