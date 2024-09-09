import React, { ReactNode } from "react";
import {
  StatusBar,
  StyleSheet, useColorScheme
} from "react-native";
import { Provider } from "react-redux";
import { Colors } from "react-native-ui-lib";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/Toast";
import { AppStack } from "src/navigators/AppStack";
import { persistor, store } from "src/store";
import { withIAPContext } from "react-native-iap";
import { useShowNoInternetToast } from "src/hooks/useShowNoInternetToast";
import { loadConfig } from "src/ui";
import { ThemeProvider } from "styled-components";
import { Themes } from "src/theme";

const AppThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = Themes['system'];
  Colors.setScheme("default");
  loadConfig();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      {children}
    </ThemeProvider>
  );
};

function App(): React.JSX.Element {
  useShowNoInternetToast();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={styles.container}>
              <AppStack />
            </GestureHandlerRootView>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default withIAPContext(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

