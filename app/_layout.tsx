import "../global.css";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "../src/context/AppContext";
import { FeedbackProvider } from "../src/common/global/FeedbackProvider";
import Loader from "../src/common/global/Loader";
import { LocaleProvider } from "../src/i18n/LocaleContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-canvas">
        <Loader />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <LocaleProvider>
          <FeedbackProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
          </FeedbackProvider>
        </LocaleProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}