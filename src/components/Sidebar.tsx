import {
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  Command,
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  Users,
  Wallet,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CampusModule, moduleLabels, roleModules } from "../constants/campus";
import { UserRole } from "../context/AppContext";
import { useTranslation } from "../i18n/LocaleContext";
import NavItem from "./NavItem";

const moduleIcons: Record<CampusModule, LucideIcon> = {
  overview: LayoutDashboard,
  students: GraduationCap,
  faculty: Users,
  attendance: ClipboardCheck,
  exams: CalendarDays,
  results: ChartNoAxesCombined,
  courses: BookOpen,
  fees: Wallet,
  library: BookOpen,
  classes: Building2,
  departments: Building2,
  reports: ChartNoAxesCombined,
  timetable: CalendarDays,
};

export default function Sidebar({
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

  return (
    <View className="hidden w-[228px] border-r border-line px-4 py-5 md:flex">
      <View className="mb-10 flex-row items-center gap-2 px-2">
        <Command size={19} color="#176B5B" />
        <Text className="font-bold text-sm tracking-[2px] text-ink">CAMPUS</Text>
      </View>
      <Text className="mb-3 px-2 font-body text-[10px] tracking-[1.6px] text-muted">{t("navigation.workspace")}</Text>
      <ScrollView className="flex-1" contentContainerClassName="gap-1" showsVerticalScrollIndicator={false}>
        {roleModules[role].map((module) => {
          const Icon = moduleIcons[module];
          const active = activeModule === module;
          return (
            <NavItem
              key={module}
              icon={<Icon size={16} color={active ? "#176B5B" : "#63717E"} />}
              label={t(moduleLabels[module])}
              active={active}
              onPress={() => onNavigate(module)}
            />
          );
        })}
      </ScrollView>
      <Pressable onPress={onSignOut} accessibilityRole="button" className="mt-auto flex-row items-center gap-3 rounded-lg px-3 py-3">
        <Text className="font-body text-sm text-muted">{t("navigation.signOut")}</Text>
      </Pressable>
    </View>
  );
}