import React, {memo, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {AppStackParamList, AppStackScreenProps, useRouteNavigation} from 'src/navigation';
import {useSelector} from 'src/hooks/useSelector';
import {Route} from '@react-navigation/native';

const SplashScreenComponent = (): React.JSX.Element => {
  const {reset} = useRouteNavigation<AppStackScreenProps<'splash'>>();
  const hasRegistered = useSelector(state => state.user.hasRegistered);

  const hideSplash = () => RNBootSplash.hide({fade: true});

  const getRouteName = async (): Promise<keyof AppStackParamList> => {
    // TODO: check token from supabase if it's expired
    return hasRegistered ? 'welcomeOnboarding' : 'login';
  };

  useEffect(() => {
    const initApp = async () => {
      const routeName = await getRouteName();
      let routes: Route<keyof AppStackParamList>[] = [];
      routes.push({ key: routeName, name: routeName });
      reset({
        index: 0,
        routes: routes,
      });
      setTimeout(hideSplash, 450);
    };
    initApp();
  }, []);
  return <></>;
};

export const SplashScreen = memo(SplashScreenComponent);
