import React, { memo, useState } from "react";
import { Alert } from "react-native";
import { View } from "src/components/ui/View";
import { Text } from "src/components/ui/Text";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { useDispatch, useSelector } from "src/hooks/useSelector";
import { useTheme } from "styled-components";
import { getNextSignupPage } from "src/navigators/AppStack";
import { updateUser } from "src/modules/user/actions";
import { Header } from "src/components/Header";
import { Space } from "src/components/Space";
import { Button } from "src/components/Button";
import { calculateAge } from "src/utils/age";
import { MIN_AGE } from "src/constants/age";
import { DateTimePicker } from "react-native-ui-lib";

const BirthdayPageComponent = () => {
  const {navigate, name} =
    useRouteNavigation<AppStackScreenProps<'birthday'>>();
  const birthdayDate = useSelector(state => state.user.user.birthday);
  const [isBirthdayValid, setIsBirthdayValid] = useState(birthdayDate ? calculateAge(birthdayDate) >= MIN_AGE : false);
  const dispatch = useDispatch();
  const [input, setInput] = useState<Date | undefined>(undefined);
  const theme = useTheme();

  const goToNextPage = () => {
    const nextPage = getNextSignupPage(name);
    if (nextPage && isBirthdayValid) navigate(nextPage);
  };

  const handleInput = (value: Date) => {
    setInput(value);
    const age = calculateAge(value);
    const isAgeValid = age >= MIN_AGE;
    setIsBirthdayValid(isAgeValid);
    if (!isAgeValid) {
      Alert.alert(
        "Accès restreint",
        "Notre application est interdite aux mineurs de moins de 18 ans.",
      );
      return;
    }
    dispatch(updateUser({birthday: value}));
  }

  const getFormattedDate = () => {
    if (input === undefined)
      return "__/__/____";
    return input.toLocaleDateString("fr");
  }

  // TODO: Fix this issue: the child component's (Button) state doesn't update
  //  when using a parent component's state to manage the child's disabled state.
  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return prevProps.disabled === nextProps.disabled;
  });

  return (
    <View bg-primary flex useFlexSafeArea>
      <Header title={"Ta date d'anniversaire ?"} />
      <View flex paddingH-6>
        <View flex center>
          <DateTimePicker
            mode={'date'}
            renderInput={() => (
              <View padding-4 bg-white br40 width={"100%"}>
                <Text h2>{getFormattedDate()}</Text>
              </View>
            )}
            autoFocus
            value={input}
            maximumDate={new Date()}
            minimumDate={new Date("1924")}
            onChange={handleInput}
          />
        </View>
        <MemoizedButton
          disabled={!isBirthdayValid}
          onPress={goToNextPage}
          color={theme.colors.onPrimary}
          labelColor={theme.colors.contentOnPrimary}
          labelProps={{demiBold: true}}
          label={"Suivant"}
          br100
          loadingColor={theme.colors.contentOnPrimary}
        />
        <Space height={4} />
      </View>
    </View>
  )
}

export const BirthdayPage = memo(BirthdayPageComponent);
