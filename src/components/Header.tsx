import React, { memo } from "react";
import { View } from "src/components/ui/View";
import { HeaderBackButton } from "src/components/HeaderBackButton";
import { Text } from "src/components/ui/Text";
import { StatusBar } from "react-native";

interface HeaderProps {
  title: string;
}

const HeaderComponent = ({title}: HeaderProps) => {
  return (
    <View>
      <StatusBar barStyle="dark-content"/>
      <View left>
        <HeaderBackButton />
      </View>
      <Text largeHeaderPage center>{title}</Text>
    </View>
  )
}

export const Header = memo(HeaderComponent);
