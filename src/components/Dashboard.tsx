import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Cpu,
  Plus,
  Radio,
  Sparkles,
  Workflow,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "../i18n/LocaleContext";
import BottomBar from "./BottomBar";
import Metric from "./Metric";
import ProjectRow from "./ProjectRow";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const projects = [
  { name: "Helix interface", typeKey: "dashboard.designSystem" as const, progress: 82, color: "bg-acid" },
  { name: "Orbit protocol", typeKey: "dashboard.research" as const, progress: 56, color: "bg-aqua" },
  { name: "Signal studio", typeKey: "dashboard.experiment" as const, progress: 34, color: "bg-coral" },
];

export default function Dashboard() {
  const { user, signOut, presentation, setPresentation } = useAppContext();
  const { language, t } = useTranslation();
  const isWeb = presentation === "web";
  const today = new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  }).format(new Date()).toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 flex-row">
        {isWeb && <Sidebar onSignOut={signOut} />}
        <View className="min-w-0 flex-1">
          <TopBar
            variant="authorized"
            presentation={presentation}
            setPresentation={setPresentation}
            userName={user?.name}
            onSignOut={signOut}
          />
          <ScrollView contentContainerClassName="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-8 md:px-9 md:pt-10">
            <View className="mb-8 flex-row items-end justify-between gap-4">
              <View className="min-w-0 flex-1">
                <Text className="font-body text-sm text-muted">{today}</Text>
                <Text className="mt-2 font-display text-[34px] leading-10 text-ink">
                  {t("dashboard.greeting")} {user?.name}.
                </Text>
              </View>
              <Pressable accessibilityRole="button" className="hidden h-10 flex-row items-center gap-2 rounded-lg bg-acid px-4 sm:flex">
                <Plus size={16} color="#090B0E" />
                <Text className="font-medium text-sm text-canvas">{t("dashboard.newProject")}</Text>
              </Pressable>
            </View>

            <View className="flex-row flex-wrap gap-3">
              <Metric icon={<Workflow size={16} color="#C6F36A" />} label={t("dashboard.inMotion")} value="08" detail={t("dashboard.workstreams")} />
              <Metric icon={<Radio size={16} color="#70E0CE" />} label={t("dashboard.focusTime")} value="12.4h" detail={t("dashboard.focusWeek")} />
              <Metric icon={<Sparkles size={16} color="#FF8D72" />} label={t("dashboard.ideasCaptured")} value="24" detail={t("dashboard.ideasReady")} />
            </View>

            <View className="mt-9 flex-row items-center justify-between">
              <View>
                <Text className="font-display text-xl text-ink">{t("dashboard.orbit")}</Text>
                <Text className="mt-1 font-body text-sm text-muted">{t("dashboard.progressHint")}</Text>
              </View>
              <Pressable accessibilityRole="button" className="flex-row items-center gap-1 py-2">
                <Text className="font-medium text-sm text-aqua">{t("dashboard.allProjects")}</Text>
                <ArrowRight size={14} color="#70E0CE" />
              </Pressable>
            </View>

            <View className="mt-4 gap-3">
              {projects.map((project, index) => (
                <ProjectRow key={project.name} name={project.name} type={t(project.typeKey)} progress={project.progress} color={project.color} index={index} />
              ))}
            </View>

            <View className="mt-8 flex-row flex-wrap gap-3">
              <View className="min-h-[170px] min-w-[250px] flex-1 rounded-xl border border-line bg-surface p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Compass size={16} color="#70E0CE" />
                    <Text className="font-medium text-sm text-ink">{t("dashboard.nextRadar")}</Text>
                  </View>
                </View>
                <View className="mt-5 flex-row items-center justify-between border-t border-line pt-4">
                  <View>
                    <Text className="font-medium text-base text-ink">{t("dashboard.prototypeReview")}</Text>
                    <Text className="mt-1 font-body text-sm text-muted">{t("dashboard.todayTime")}</Text>
                  </View>
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-raised">
                    <ArrowUpRight size={16} color="#C6F36A" />
                  </View>
                </View>
              </View>
              <View className="min-h-[170px] min-w-[250px] flex-1 rounded-xl border border-line bg-surface p-5">
                <View className="flex-row items-center gap-2">
                  <Cpu size={16} color="#FF8D72" />
                  <Text className="font-medium text-sm text-ink">{t("dashboard.studioSignal")}</Text>
                </View>
                <View className="mt-5 flex-row items-end gap-1.5">
                  {[34, 50, 39, 68, 46, 83, 58, 72, 48, 92, 63, 76, 52, 88, 61, 100].map((height, index) => (
                    <View key={index} style={{ height: `${height}%` }} className={`h-16 flex-1 rounded-sm ${index === 15 ? "bg-acid" : "bg-raised"}`} />
                  ))}
                </View>
                <Text className="mt-2 font-body text-xs text-muted">{t("dashboard.creativeRhythm")}</Text>
              </View>
            </View>
          </ScrollView>
          {!isWeb && <BottomBar onSignOut={signOut} />}
        </View>
      </View>
    </SafeAreaView>
  );
}