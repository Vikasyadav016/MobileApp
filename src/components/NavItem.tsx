import { Pressable, Text, View } from "react-native";

export default function NavItem({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-lg px-3 py-3 ${active ? "bg-raised" : ""}`}
    >
      <View className={active ? "text-acid" : "text-muted"}>{icon}</View>
      <Text className={`font-medium text-sm ${active ? "text-ink" : "text-muted"}`}>{label}</Text>
      {active && <View className="ml-auto h-1.5 w-1.5 rounded-full bg-acid" />}
    </Pressable>
  );
}