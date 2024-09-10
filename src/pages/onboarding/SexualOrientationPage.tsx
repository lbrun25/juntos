import React, { memo, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { View } from "src/components/ui/View";
import { Text } from "src/components/ui/Text";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { useDispatch, useSelector } from "src/hooks/useSelector";
import { SexualOrientation, SexualOrientationId } from "src/types/sexual-orientation";
import { useTheme } from "styled-components";
import { getNextSignupPage } from "src/navigators/AppStack";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { Space } from "src/components/Space";
import { CheckButton } from "src/components/CheckButton";
import { SelectableItem } from "src/components/SelectableItem";
import { SEXUAL_ORIENTATIONS } from "src/constants/sexualOrientations";
import { updateUser } from "src/modules/user/actions";

const SexualOrientationPageComponent = () => {
  const {navigate, name} =
    useRouteNavigation<AppStackScreenProps<'sexualOrientation'>>();
  const sexualOrientationId = useSelector(state => state.user.user.sexualOrientation);
  const canDisplaySexualOrientation = useSelector(state => state.user.user.canDisplaySexualOrientation);
  const [isDisplayedOnMyProfileChecked, setDisplayedOnMyProfileChecked] = useState(canDisplaySexualOrientation);
  const [selectedSexualOrientation, setSelectedSexualOrientation] = useState<SexualOrientationId | undefined>(sexualOrientationId);
  const theme = useTheme();
  const dispatch = useDispatch();

  const goToNextPage = () => {
    const nextPage = getNextSignupPage(name);
    if (nextPage && selectedSexualOrientation) navigate(nextPage);
  };

  // TODO: Fix this issue: the child component's (Button) state doesn't update
  //  when using a parent component's state to manage the child's disabled state.
  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return prevProps.disabled === nextProps.disabled;
  });

  const onDisplayedOnMyProfileChecked = (status: boolean) => {
    setDisplayedOnMyProfileChecked(status);
    dispatch(updateUser({canDisplaySexualOrientation: status}));
  }

  const onSexualOrientationSelected = (sexualOrientationId: string) => {
    setSelectedSexualOrientation(sexualOrientationId as SexualOrientationId);
    dispatch(updateUser({sexualOrientation: sexualOrientationId as SexualOrientationId}));
  }

  const renderItem: ListRenderItem<SexualOrientation> = ({ item }) => {
    const isSelected = selectedSexualOrientation === item.id;
    return (
      <SelectableItem
        isSelected={isSelected}
        onSelect={onSexualOrientationSelected}
        id={item.id}
        paddingH-4
      >
        <View flex width="100%">
          <Text body medium numberOfLines={1}>
            {item.label}
          </Text>
        </View>
      </SelectableItem>
    )
  }

  return (
    <View bg-primary flex useFlexSafeArea>
      <Header title={"Quelle est ton orientation sexuelle ?"} />
      <Space height={8} />
      <FlatList<SexualOrientation>
        data={SEXUAL_ORIENTATIONS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space height={3} />}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      />
      <View
        height={1}
        backgroundColor={theme.colors.alphaGray}
        style={{opacity: 0.5}}
      />
      <View paddingH-4 paddingT-4>
        <CheckButton
          isChecked={isDisplayedOnMyProfileChecked}
          label={"Afficher mon orientation sexuelle sur mon profil"}
          labelColor={theme.colors.blackTint10}
          onChecked={onDisplayedOnMyProfileChecked}
          center
        />
        <Space height={6} />
        <MemoizedButton
          disabled={!selectedSexualOrientation}
          onPress={goToNextPage}
          color={theme.colors.onPrimary}
          labelColor={theme.colors.contentOnPrimary}
          labelProps={{demiBold: true}}
          label={"Suivant"}
          br100
          loadingColor={theme.colors.contentOnPrimary}
        />
      </View>
    </View>
  )
}

export const SexualOrientationPage = memo(SexualOrientationPageComponent);
