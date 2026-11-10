import { Command, LayoutDashboard, Settings2, Sparkles, Workflow } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "../i18n/LocaleContext";
import NavItem from "./NavItem";

export default function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  const { t } = useTranslation();

  return (
    <View className="hidden w-[228px] border-r border-line px-4 py-5 md:flex">
      <View className="mb-10 flex-row items-center gap-2 px-2">
        <Command size={19} color="#C6F36A" />
        <Text className="font-bold text-sm tracking-[2px] text-ink">NOVA</Text>
      </View>
      <Text className="mb-3 px-2 font-body text-[10px] tracking-[1.6px] text-muted">{t("navigation.workspace")}</Text>
      <View className="gap-1">
        <NavItem icon={<LayoutDashboard size={16} />} label={t("navigation.overview")} active />
        <NavItem icon={<Workflow size={16} />} label={t("navigation.projects")} />
        <NavItem icon={<Sparkles size={16} />} label={t("navigation.ideas")} />
        <NavItem icon={<Settings2 size={16} />} label={t("navigation.settings")} />
      </View>
      <Pressable onPress={onSignOut} accessibilityRole="button" className="mt-auto flex-row items-center gap-3 rounded-lg px-3 py-3">
        <Text className="font-body text-sm text-muted">{t("navigation.signOut")}</Text>
      </Pressable>
    </View>
  );
}