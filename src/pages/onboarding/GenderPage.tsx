import React, { memo, useState } from "react";
import { View } from "src/components/ui/View";
import { Header } from "src/components/Header";
import { Genders, SUB_GENDERS } from "src/constants/genders";
import { SelectableItem } from "src/components/SelectableItem";
import { Gender, MainGenderId, SubGenderId } from "src/types/gender";
import { FlatList, ListRenderItem } from "react-native";
import { Space } from "src/components/Space";
import { Text } from "src/components/ui/Text";
import { BottomSheet } from "src/components/BottomSheet";
import { TouchableOpacity } from "src/components/ui/TouchableOpacity";
import { useTheme } from "styled-components";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { Button } from "src/components/Button";
import { getSubGenderById } from "src/utils/gender";
import { HeaderHelpButton } from "src/components/HeaderHelpButton";
import { getNextSignupPage } from "src/navigators/AppStack";
import { useDispatch, useSelector } from "src/hooks/useSelector";
import { updateUser } from "src/modules/user/actions";
import { CheckButton } from "src/components/CheckButton";

const GenderPageComponent = () => {
  const {navigate, name} =
    useRouteNavigation<AppStackScreenProps<'gender'>>();
  const genderId = useSelector(state => state.user.user.genderId);
  const subGenderId = useSelector(state => state.user.user.subGenderId);
  const [selectedGender, setSelectedGender] = useState<MainGenderId | undefined>(genderId);
  const [selectedSubGender, setSelectedSubGender] = useState<SubGenderId | undefined>(subGenderId);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const canDisplayGender = useSelector(state => state.user.user.canDisplayGender);
  const [isDisplayedOnMyProfileChecked, setDisplayedOnMyProfileChecked] = useState(canDisplayGender);
  const theme = useTheme();
  const dispatch = useDispatch();

  const getSubGenderLabel = () => {
    if (selectedSubGender)
      return getSubGenderById(selectedSubGender)?.label ?? "";
    return "Ajouter des informations sur mon genre";
  }

  const onMainGenderSelected = (genderId: string) => {
    setSelectedGender(genderId as MainGenderId);
    setSelectedSubGender(undefined);
    dispatch(updateUser({genderId: genderId as MainGenderId}));
  }

  const onSubGenderSelected = (genderId: string) => {
    setSelectedSubGender(genderId as SubGenderId);
    dispatch(updateUser({subGenderId: genderId as SubGenderId}));
  }

  const renderItem: ListRenderItem<Gender> = ({ item }) => {
    const isSelected = selectedGender === item.id;
    return (
      <SelectableItem
        isSelected={isSelected}
        onSelect={onMainGenderSelected}
        id={item.id}
      >
        <View flex width="100%">
          <Text body medium numberOfLines={1}>
            {item.label}
          </Text>
          {isSelected && (
            <TouchableOpacity onPress={() => setModalIsVisible(true)} flex>
              <Text footnote>
                {getSubGenderLabel()}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SelectableItem>
    )
  }

  const renderSubGender: ListRenderItem<Gender> = ({ item }) => {
    const isSelected = selectedSubGender === item.id;
    return (
      <SelectableItem
        isSelected={isSelected}
        onSelect={onSubGenderSelected}
        id={item.id}
        label={item.label}
      />
    )
  }

  const goToNextPage = () => {
    const nextPage = getNextSignupPage(name);
    if (nextPage && selectedGender) navigate(nextPage);
  };

  // TODO: Fix this issue: the child component's (Button) state doesn't update
  //  when using a parent component's state to manage the child's disabled state.
  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return prevProps.disabled === nextProps.disabled;
  });

  const onDisplayedOnMyProfileChecked = (status: boolean) => {
    setDisplayedOnMyProfileChecked(status);
    dispatch(updateUser({canDisplayGender: status}));
  }

  return (
    <View bg-primary flex useFlexSafeArea paddingH-4>
      <Header
        title={"Quel genre te convient le mieux ?"}
        infoButton={
          <HeaderHelpButton
            icon="🚻"
            title={"Pourquoi nous demandons ces données ?"}
            content={"Le fait de partager ton genre et ton orientation sexuelle nous aide à assurer ta sécurité, ton confort et le sentiment d'inclusion sur l'app."}
            backgroundColor={theme.colors.white}
            buttonBackgroundColor={theme.colors.onPrimary}
            buttonLabelColor={theme.colors.contentOnPrimary}
          />
        }
      />
      <Space height={8} />
      <FlatList<Gender>
        data={Genders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <Space height={3} />}
      />
      <CheckButton
        isChecked={isDisplayedOnMyProfileChecked}
        label={"Afficher mon genre sur mon profil"}
        labelColor={theme.colors.blackTint10}
        onChecked={onDisplayedOnMyProfileChecked}
        center
      />
      <Space height={6} />
      <MemoizedButton
        disabled={!selectedGender}
        onPress={goToNextPage}
        color={theme.colors.onPrimary}
        labelColor={theme.colors.contentOnPrimary}
        labelProps={{demiBold: true}}
        label={"Suivant"}
        br100
        loadingColor={theme.colors.contentOnPrimary}
      />
      {selectedGender && (
        <BottomSheet
          isVisible={modalIsVisible}
          onDismiss={() => setModalIsVisible(false)}
          backgroundColor={theme.colors.primary}
          height={450}
        >
          <View>
            <FlatList<Gender>
              data={SUB_GENDERS[selectedGender]}
              keyExtractor={item => item.id}
              renderItem={renderSubGender}
              ItemSeparatorComponent={() => <Space height={3} />}
            />
            <Space height={6} />
            <Button
              onPress={() => setModalIsVisible(false)}
              labelColor={theme.colors.contentOnPrimary}
              labelProps={{ demiBold: true }}
              label={"Fermer"}
              backgroundColor={theme.colors.onPrimary}
              br100
            />
          </View>
        </BottomSheet>
      )}
    </View>
  )
}

export const GenderPage = memo(GenderPageComponent);
