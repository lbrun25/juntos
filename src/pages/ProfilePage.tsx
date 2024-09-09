import React, {memo} from 'react';
import {View} from 'src/components/ui/View';
import {AppStackScreenProps, useRouteNavigation} from 'src/navigation';
import { Text } from "src/components/ui/Text";

const ProfilePageComponent = (): React.JSX.Element => {
  const {navigate, setOptions} =
    useRouteNavigation<AppStackScreenProps<'mainBottomTab'>>();

  return (
    <View bg-pageBG useFlexSafeArea flex>
      <Text>{"Profile"}</Text>
    </View>
  );
};

export const ProfilePage = memo(ProfilePageComponent);
