import React, { memo } from "react";
import { StatusBar } from "react-native";
import { View } from "src/components/ui/View";
import { Text } from "src/components/ui/Text";
import { WelcomeOnboardingInstructions } from "src/constants/onboarding";
import { Space } from "src/components/Space";
import { Button } from "src/components/Button";
import { getNextSignupPage } from "src/navigators/AppStack";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { useTheme } from "styled-components";
import { Header } from "src/components/Header";

const WelcomeOnboardingPageComponent = () => {
  const {navigate, name} = useRouteNavigation<AppStackScreenProps<'welcomeOnboarding'>>();
  const theme = useTheme();

  const goToNextPage = () => {
    const nextPage = getNextSignupPage(name);
    if (nextPage) navigate(nextPage);
  };

  return (
    <View bg-primary flex paddingH-4 useFlexSafeArea>
      <Header title={"Bienvenue\nsur\nMelon !"} />
      <Space height={6} />
      <View>
        {WelcomeOnboardingInstructions.map(instruction => {
          return (
            <View>
              <Text left h2 bold color="#fff4ed">{instruction.title}</Text>
              <Text center medium>{instruction.description}</Text>
              <Space height={3} />
            </View>
          )
        })}
      </View>
      <Space />
      <Button
        onPress={goToNextPage}
        label={"Suivant"}
        labelColor={theme.colors.contentOnPrimary}
        labelProps={{demiBold: true}}
        color={theme.colors.onPrimary}
        br100
      />
    </View>
  )
}

export const WelcomeOnboardingPage = memo(WelcomeOnboardingPageComponent);
