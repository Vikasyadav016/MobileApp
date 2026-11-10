import { LayoutDashboard, Settings2, Sparkles, Workflow } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "../i18n/LocaleContext";

export default function BottomBar({ onSignOut }: { onSignOut: () => void }) {
  const { t } = useTranslation();

  return (
    <View className="h-[62px] flex-row items-center justify-around border-t border-line bg-canvas px-3">
      <View className="items-center gap-1"><LayoutDashboard size={18} color="#C6F36A" /><Text className="font-body text-[10px] text-acid">{t("navigation.home")}</Text></View>
      <View className="items-center gap-1"><Workflow size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">{t("navigation.projects")}</Text></View>
      <View className="items-center gap-1"><Sparkles size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">{t("navigation.ideas")}</Text></View>
      <Pressable onPress={onSignOut} accessibilityRole="button" className="items-center gap-1"><Settings2 size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">{t("navigation.account")}</Text></Pressable>
    </View>
  );
}