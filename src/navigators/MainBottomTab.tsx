import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {MainBottomTabParamList} from 'src/navigation';
import {HomePage} from 'src/pages/HomePage';
import {useTheme} from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import {ProfilePage} from 'src/pages/ProfilePage';
import {HeaderTitle} from 'src/components/HeaderTitle';

const {Navigator, Screen} = createBottomTabNavigator<MainBottomTabParamList>();

export const MainBottomTab = () => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        headerShown: true,
      }}>
      <Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color, size}) => (
            <Icon name="smartphone" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Screen
        name="profile"
        component={ProfilePage}
        options={{
          headerTitle: () => <HeaderTitle title={"Profile"} />,
          tabBarLabel: "Profile",
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
