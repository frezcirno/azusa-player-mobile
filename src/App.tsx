import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { Linking, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from 'zustand';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import AppOpenSplash from './components/background/AppOpenSplash';
import useSetupPlayer from './hooks/useSetupPlayer';
import { useIsLandscape } from './hooks/useOrientation';
import appStore from '@stores/appStore';
import MainBackground from './components/background/MainBackground';
import useTheme from './hooks/useTheme';
import SongMenuSheet from '@components/songmenu/SongMenuSheet';
import { useNoxSetting } from '@stores/useApp';
import SnackBar from './components/commonui/Snackbar';
import APM from './components/APM';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './components/styles/Theme';
import APMContext from './contexts/APMContext';
import HookEmptyComponent from './HookEmptyComponent';

const useSplash = (duration = 1000) => {
  const [isReady, setIsReady] = React.useState(false);
  useEffect(() => {
    // wait for 1000 ms and set isReady to true
    setTimeout(() => {
      setIsReady(true);
    }, duration);
  });
  return isReady;
};

export default function App(appProps: NoxComponent.AppProps) {
  const vip = true;
  const isSplashReady = useSplash(
    __DEV__ || appProps.intentData || vip ? 1 : 2500,
  );
  const [isSplashAnimReady, setIsSplashAnimReady] = React.useState(vip);
  const isPlayerReady = useSetupPlayer({ ...appProps, vip });
  const isLandscape = useIsLandscape();
  const PIPMode = useStore(appStore, state => state.pipMode);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const usedTheme = useTheme();
  const playerStyle = useNoxSetting(state => state.playerStyle);
  const defaultTheme = playerStyle.metaData.darkTheme
    ? CombinedDarkTheme
    : CombinedDefaultTheme;
  const defaultNavTheme = playerStyle.metaData.darkTheme
    ? NavigationDarkTheme
    : NavigationDefaultTheme;

  useEffect(() => {
    function deepLinkHandler(data: { url: string }) {
      console.log('deepLinkHandler', data.url);
    }

    // This event will be fired when the app is already open and the notification is clicked
    const subscription = Linking.addEventListener('url', deepLinkHandler);

    // When you launch the closed app from the notification or any other link
    Linking.getInitialURL().then(url => console.log('getInitialURL', url));
    return () => {
      subscription.remove();
    };
  }, []);

  if (!(isPlayerReady && isSplashReady && isSplashAnimReady)) {
    return (
      <SafeAreaProvider>
        <View style={styles.screenContainer}>
          <AppOpenSplash setIsSplashReady={setIsSplashAnimReady} />
        </View>
      </SafeAreaProvider>
    );
  }
  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <HookEmptyComponent />
      <SafeAreaProvider>
        <APMContext>
          <MainBackground />
          <View
            style={{ backgroundColor: playerStyle.colors.background, flex: 1 }}
          >
            <PaperProvider
              theme={{
                ...defaultTheme,
                colors: playerStyle.colors,
              }}
            >
              <APM
                PIP={PIPMode}
                isLandscape={isLandscape}
                defaultNavTheme={defaultNavTheme}
                defaultTheme={defaultTheme}
              />
              <SongMenuSheet />
              <SnackBar />
            </PaperProvider>
          </View>
        </APMContext>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gestureContainer: {
    flex: 1,
  },
});
