import { ActivityIndicator, Text, View } from "react-native";

type LoaderProps = {
  visible?: boolean;
  mode?: "overlay" | "inline";
  label?: string;
};

export default function Loader({
  visible = true,
  mode = "overlay",
  label,
}: LoaderProps) {
  if (!visible) return null;

  if (mode === "inline") {
    return (
      <View className="flex-row items-center gap-2">
        <ActivityIndicator size="small" color="#090B0E" />
        {!!label && <Text className="font-body text-sm text-canvas">{label}</Text>}
      </View>
    );
  }

  return (
    <View className="absolute inset-0 z-50 items-center justify-center bg-canvas/80">
      <ActivityIndicator size="large" color="#C6F36A" />
      {!!label && <Text className="mt-3 font-body text-sm text-muted">{label}</Text>}
    </View>
  );
}