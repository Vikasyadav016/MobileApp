import { Pressable, Text, View } from "react-native";

export default function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable className={`flex-row items-center gap-3 rounded-lg px-3 py-3 ${active ? "bg-raised" : ""}`}>
      <View className={active ? "text-acid" : "text-muted"}>{icon}</View>
      <Text className={`font-medium text-sm ${active ? "text-ink" : "text-muted"}`}>{label}</Text>
      {active && <View className="ml-auto h-1.5 w-1.5 rounded-full bg-acid" />}
    </Pressable>
  );
}