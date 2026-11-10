import { Redirect } from "expo-router";
import { View } from "react-native";
import Loader from "../src/common/global/Loader";
import { useAppContext } from "../src/context/AppContext";

export default function IndexRoute() {
  const { user, isReady } = useAppContext();

  if (!isReady) {
    return (
      <View className="flex-1 bg-canvas">
        <Loader />
      </View>
    );
  }

  return <Redirect href={user ? "/dashboard" : "/sign-in"} />;
}