import { Text, View } from "react-native";

export default function Metric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <View className="min-w-[155px] flex-1 rounded-xl border border-line bg-surface p-4 md:p-5">
      <View className="flex-row items-center gap-2">{icon}<Text className="font-body text-[10px] tracking-[1.4px] text-muted">{label}</Text></View>
      <Text className="mt-4 font-display text-[30px] leading-9 text-ink">{value}</Text>
      <Text className="mt-1 font-body text-xs text-muted">{detail}</Text>
    </View>
  );
}