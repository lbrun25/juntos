import React, { memo } from "react";
import { View } from "src/components/ui/View";
import { HeaderBackButton } from "src/components/HeaderBackButton";
import { Text } from "src/components/ui/Text";
import { StatusBar } from "react-native";
import { Space } from "src/components/Space";

interface HeaderProps {
  title: string;
  infoButton?: React.ReactElement;
}

const HeaderComponent = ({title, infoButton}: HeaderProps) => {
  return (
    <View>
      <StatusBar barStyle="dark-content"/>
      <View row spread>
        <View left>
          <HeaderBackButton />
        </View>
        {infoButton && (
          <View right>
            {infoButton}
          </View>
        )}
      </View>
      <Space height={2} />
      <Text largeHeaderPage center>{title}</Text>
    </View>
  )
}

export const Header = memo(HeaderComponent);
