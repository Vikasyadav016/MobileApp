import { CalendarDays, ClipboardCheck, GraduationCap, LayoutDashboard, Settings2, Users } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { CampusModule, moduleLabels, roleModules } from "../constants/campus";
import { UserRole } from "../context/AppContext";
import { useTranslation } from "../i18n/LocaleContext";

export default function BottomBar({
  onSignOut,
  role,
  activeModule,
  onNavigate,
}: {
  onSignOut: () => void;
  role: UserRole;
  activeModule: CampusModule;
  onNavigate: (module: CampusModule) => void;
}) {
  const { t } = useTranslation();
  const primaryModules = role === "admin" || role === "hod"
    ? ["overview", "attendance", "students"] as CampusModule[]
    : ["overview", "timetable", "attendance"] as CampusModule[];
  const iconForModule = {
    overview: LayoutDashboard,
    attendance: ClipboardCheck,
    students: GraduationCap,
    timetable: CalendarDays,
  };

  return (
    <View className="h-[62px] flex-row items-center justify-around border-t border-line bg-canvas px-3">
      {primaryModules.filter((module) => roleModules[role].includes(module)).map((module) => {
        const Icon = iconForModule[module as keyof typeof iconForModule] ?? Users;
        const active = activeModule === module;
        return (
          <Pressable key={module} onPress={() => onNavigate(module)} accessibilityRole="button" accessibilityState={{ selected: active }} className="min-w-[58px] items-center gap-1">
            <Icon size={18} color={active ? "#176B5B" : "#63717E"} />
            <Text numberOfLines={1} className={`font-body text-[10px] ${active ? "text-acid" : "text-muted"}`}>{t(moduleLabels[module])}</Text>
          </Pressable>
        );
      })}
      <Pressable onPress={onSignOut} accessibilityRole="button" className="min-w-[58px] items-center gap-1"><Settings2 size={18} color="#63717E" /><Text className="font-body text-[10px] text-muted">{t("navigation.signOut")}</Text></Pressable>
    </View>
  );
}