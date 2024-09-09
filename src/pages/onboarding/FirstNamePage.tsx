import React, { memo, useState } from "react";
import { View } from "src/components/ui/View";
import { FocusKeyboardSubmitPage } from "src/components/FocusKeyboardSubmitPage";
import { useDispatch, useSelector } from "src/hooks/useSelector";
import { nameRegex } from "src/constants/regexes";
import { TextField } from "src/components/ui/TextField";
import { getNextSignupPage } from "src/navigators/AppStack";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { NAME_MAX_LENGTH } from "src/constants/name";
import { updateUser } from "src/modules/user/actions";
import { Header } from "src/components/Header";
import { PopUp } from "src/components/PopUp";
import { Text } from "src/components/ui/Text";
import { Space } from "src/components/Space";
import { Button } from "src/components/Button";
import { useTheme } from "styled-components";

const FirstNamePageComponent = () => {
  const {navigate, name} =
    useRouteNavigation<AppStackScreenProps<'firstName'>>();
  const firstName = useSelector(state => state.user.user.firstName);
  const [isNameValid, setIsNameValid] = useState(nameRegex.test(firstName));
  const dispatch = useDispatch();
  const [input, setInput] = useState(firstName);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const theme = useTheme();

  const goToNextPage = () => {
    const nextPage = getNextSignupPage(name);
    if (nextPage && isNameValid) navigate(nextPage);
  };

  const handleInput = (value: string) => {
    setInput(value);
    dispatch(updateUser({firstName: value}));
  }

  const onReadyClicked = () => {
    setModalIsVisible(false);
    goToNextPage();
  }

  return (
    <View bg-primary flex useFlexSafeArea>
      <Header title={"Ton prénom ?"} />
      <FocusKeyboardSubmitPage
        buttonLabel={"Suivant"}
        isSubmittable={isNameValid}
        onNext={() => setModalIsVisible(true)}
        inputComponent={
          <TextField
            autoFocus
            centered
            validateOnChange
            value={input}
            onChangeText={handleInput}
            validate={(value: string) => nameRegex.test(value)}
            onChangeValidity={(status) => setIsNameValid(status)}
            maxLength={NAME_MAX_LENGTH}
          />
        }
      />
      <PopUp
        isVisible={modalIsVisible}
        onDismiss={() => setModalIsVisible(false)}
      >
        <View>
          <Text smallEmoji center>👋</Text>
          <Space height={6} />
          <Text center demiBold h4>
            {`Bienvenue, ${input} !`}
          </Text>
          <Space height={2} />
          <Text center color={theme.colors.darkCharcoal}>
            {"Il y a plein de profils à découvrir ici. Mais on va configurer ton profil d'abord."}
          </Text>
          <Space height={6} />
          <View center>
            <Button
              onPress={onReadyClicked}
              label={"C'est parti"}
              labelColor={theme.colors.onPrimary}
              labelProps={{demiBold: true}}
              color={theme.colors.primary}
              br100
              paddingH-8
              paddingV-3
            />
            <Space height={2} />
            <Button
              onPress={() => setModalIsVisible(false)}
              label={"Modifier ton nom"}
              labelColor={theme.colors.onBackground}
              labelProps={{demiBold: true}}
              br100
              withoutBackground
            />
          </View>
        </View>
      </PopUp>
    </View>
  )
}

export const FirstNamePage = memo(FirstNamePageComponent);
