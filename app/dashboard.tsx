import { Redirect } from "expo-router";
import { View } from "react-native";
import Loader from "../src/common/global/Loader";
import { useAppContext } from "../src/context/AppContext";
import DashboardScreen from "../src/components/Dashboard";

export default function DashboardRoute() {
	const { user, isReady } = useAppContext();

	if (!isReady) {
		return (
			<View className="flex-1 bg-canvas">
				<Loader />
			</View>
		);
	}

	if (!user) return <Redirect href="/sign-in" />;
	return <DashboardScreen />;
}