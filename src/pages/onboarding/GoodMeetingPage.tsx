import React, { memo } from "react";
import { StatusBar } from "react-native";
import { View } from "src/components/ui/View";
import { Text } from "src/components/ui/Text";

const GoodMeetingPageComponent = () => {
  return (
    <View bg-primary flex useFlexSafeArea>
      <StatusBar barStyle="dark-content"/>
      <View bg-bgPage flex center padding-4>
        <Text>GoodMeetingPageComponent</Text>
      </View>
    </View>
  )
}

export const GoodMeetingPage = memo(GoodMeetingPageComponent);
