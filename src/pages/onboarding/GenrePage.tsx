import React, { memo, useState } from "react";
import { View } from "src/components/ui/View";
import { Header } from "src/components/Header";
import { Genders, SUB_GENDERS } from "src/constants/genders";
import { SelectableItem } from "src/components/SelectableItem";
import { Gender, MainGenderAbbreviation } from "src/types/gender";
import { FlatList, ListRenderItem } from "react-native";
import { Space } from "src/components/Space";
import { Text } from "src/components/ui/Text";
import { BottomSheet } from "src/components/BottomSheet";
import { TouchableOpacity } from "src/components/ui/TouchableOpacity";
import { useTheme } from "styled-components";
import { AppStackScreenProps, useRouteNavigation } from "src/navigation";
import { Button } from "src/components/Button";

const GenrePageComponent = () => {
  const {navigate, name} =
    useRouteNavigation<AppStackScreenProps<'genre'>>();
  const [selectedGender, setSelectedGender] = useState<MainGenderAbbreviation | null>(null);
  const [selectedSubGender, setSelectedSubGender] = useState<string | null>(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const theme = useTheme();

  const renderItem: ListRenderItem<Gender> = ({ item }) => {
    const isSelected = selectedGender === item.abbreviation;
    return (
      <SelectableItem
        isSelected={isSelected}
        onSelect={() => handleSelect(item.abbreviation as MainGenderAbbreviation)}
        id={item.abbreviation}
      >
        <View flex>
          <Text body medium numberOfLines={1}>
            {item.label}
          </Text>
          {isSelected && (
            <View width="100%">
              <TouchableOpacity onPress={() => setModalIsVisible(true)}>
                <Text footnote>{"Ajouter des informations sur mon genre"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SelectableItem>
    )
  }

  const renderSubGender: ListRenderItem<Gender> = ({ item }) => {
    const isSelected = selectedSubGender === item.abbreviation;
    return (
      <SelectableItem
        isSelected={isSelected}
        onSelect={(gender) => setSelectedSubGender(gender)}
        id={item.abbreviation}
        label={item.label}
      />
    )
  }

  const handleSelect = (abbreviation: MainGenderAbbreviation) => {
    setSelectedGender(abbreviation);
  };

  return (
    <View bg-primary flex useFlexSafeArea paddingH-4>
      <Header title={"Quel genre te convient le mieux ?"} />
      <Space height={8} />
      <FlatList<Gender>
        data={Genders}
        keyExtractor={item => item.abbreviation}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <Space height={3} />}
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
              keyExtractor={item => item.abbreviation}
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

export const GenrePage = memo(GenrePageComponent);
