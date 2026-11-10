import { ArrowDownRight, Blocks, Check } from "lucide-react-native";
import { Text, View } from "react-native";

export default function ProjectRow({
  name,
  type,
  progress,
  color,
  index,
}: {
  name: string;
  type: string;
  progress: number;
  color: string;
  index: number;
}) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-line bg-surface p-4 md:gap-5 md:px-5">
      <View className={`h-9 w-1 rounded-full ${color}`} />
      <View className="min-w-0 flex-1">
        <Text className="font-medium text-sm text-ink">{name}</Text>
        <Text className="mt-1 font-body text-[10px] tracking-[1px] text-muted">{type}</Text>
      </View>
      <View className="hidden flex-1 flex-row items-center gap-3 sm:flex">
        <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
          <View className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
        </View>
        <Text className="w-9 text-right font-body text-xs text-muted">{progress}%</Text>
      </View>
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-raised">
        {index === 1 ? <ArrowDownRight size={15} color="#A8B1AD" /> : index === 0 ? <Check size={15} color="#C6F36A" /> : <Blocks size={15} color="#A8B1AD" />}
      </View>
    </View>
  );
}