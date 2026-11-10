import { Redirect } from "expo-router";
import { View } from "react-native";
import Loader from "../src/common/global/Loader";
import { useAppContext } from "../src/context/AppContext";
import SignInScreen from "../src/components/SignIn";

export default function SignInRoute() {
	const { user, isReady } = useAppContext();

	if (!isReady) {
		return (
			<View className="flex-1 bg-canvas">
				<Loader />
			</View>
		);
	}

	if (user) return <Redirect href="/dashboard" />;
	return <SignInScreen />;
}
export { default } from "../src/components/SignIn";