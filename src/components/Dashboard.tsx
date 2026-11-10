import { Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFeedback } from "../common/global/FeedbackProvider";
import { AddableModule, CampusModule } from "../constants/campus";
import { UserRole, useAppContext } from "../context/AppContext";
import { TranslationKey, useTranslation } from "../i18n/LocaleContext";
import BottomBar from "./BottomBar";
import AddRecordScreen from "./AddRecordScreen";
import OverviewPanel from "./OverviewPanel";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import WorkspacePanel, { CampusRecord } from "./WorkspacePanel";

type AttendanceState = "present" | "absent" | "late";

const roleLabelKeys: Record<UserRole, TranslationKey> = {
  admin: "roles.admin",
  hod: "roles.hod",
  faculty: "roles.faculty",
  student: "roles.student",
};

export default function Dashboard() {
  const { user, signOut, presentation, setPresentation } = useAppContext();
  const { language, t } = useTranslation();
  const { showNotice } = useFeedback();
  const role = user?.role ?? "admin";
  const [activeModule, setActiveModule] = useState<CampusModule>("overview");
  const [query, setQuery] = useState("");
  const [attendanceStates, setAttendanceStates] = useState<Record<string, AttendanceState>>({});
  const [createdRecords, setCreatedRecords] = useState<Partial<Record<AddableModule, CampusRecord[]>>>({});
  const [addModule, setAddModule] = useState<AddableModule | null>(null);
  const isWeb = presentation === "web";

  const formattedDate = new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  function navigateTo(module: CampusModule) {
    setActiveModule(module);
    setQuery("");
  }

  function handleAction(action: TranslationKey) {
    showNotice({
      type: action === "campus.export" ? "success" : "warning",
      message: action === "campus.export" ? t("campus.exportReady") : t("campus.actionComing"),
      position: "right-top",
    });
  }

  function toggleAttendance(id: string) {
    setAttendanceStates((current) => {
      const currentStatus = current[id] ?? (id === "a-3" ? "absent" : id === "a-4" ? "late" : "present");
      return { ...current, [id]: currentStatus === "present" ? "absent" : "present" };
    });
    showNotice({ type: "success", message: t("campus.attendanceSaved"), position: "center-top" });
  }

  function saveRecord(module: AddableModule, values: Record<string, string>) {
    const record: CampusRecord = {
      id: `new-${Date.now()}`,
      name: values.name.trim(),
      secondary: module === "students"
        ? `${values.id.trim()} · ${values.group.trim()}`
        : module === "faculty"
          ? `${values.group.trim()} · ${values.id.trim()}`
          : `${values.id.trim()} · ${values.group.trim()}`,
      meta: module === "students" ? values.email.trim() || t("campus.active") : values.email.trim(),
      status: module === "faculty" ? "campus.onDuty" : "campus.active",
      tone: "green",
    };

    setCreatedRecords((current) => ({
      ...current,
      [module]: [...(current[module] ?? []), record],
    }));
    setAddModule(null);
    showNotice({
      type: "success",
      message: t(module === "students" ? "form.studentRecordAdded" : module === "faculty" ? "form.facultyRecordAdded" : "form.subjectRecordAdded"),
      position: "center-top",
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 flex-row">
        {isWeb && (
          <Sidebar
            onSignOut={signOut}
            role={role}
            activeModule={activeModule}
            onNavigate={navigateTo}
          />
        )}
        <View className="min-w-0 flex-1">
          <TopBar
            variant="authorized"
            presentation={presentation}
            setPresentation={setPresentation}
            userName={user?.name}
            onSignOut={signOut}
          />
          <ScrollView className="min-h-0 flex-1" contentContainerClassName="mx-auto w-full max-w-[1320px] px-4 pb-6 pt-5 sm:px-5 md:px-9 md:pb-10 md:pt-9">
            <View className="mb-6 flex-row flex-wrap items-end justify-between gap-5">
              <View className="min-w-[220px] flex-1">
                <Text className="font-body text-sm text-muted">{formattedDate} · {t("campus.term")}</Text>
                <Text className="mt-2 font-display text-[32px] leading-9 text-ink">
                  {t("dashboard.greeting")} {user?.name}.
                </Text>
                <View className="mt-2 self-start rounded-full bg-acid/10 px-2.5 py-1">
                  <Text className="font-medium text-xs text-acid">{t(roleLabelKeys[role])}</Text>
                </View>
              </View>
              <View className="h-11 min-w-[250px] flex-1 flex-row items-center rounded-lg border border-line bg-surface px-3 md:max-w-[350px]">
                <Search size={16} color="#63717E" />
                <TextInput
                  accessibilityLabel={t("campus.search")}
                  onChangeText={setQuery}
                  placeholder={t("campus.search")}
                  placeholderTextColor="#82909B"
                  value={query}
                  className="ml-2 flex-1 font-body text-sm text-ink outline-none"
                />
                {query.length > 0 && (
                  <Pressable onPress={() => setQuery("")} accessibilityRole="button" className="px-2 py-1">
                    <Text className="font-medium text-xs text-aqua">{t("campus.clear")}</Text>
                  </Pressable>
                )}
              </View>
            </View>

            {activeModule === "overview" ? (
              <OverviewPanel role={role} />
            ) : (
              <WorkspacePanel
                module={activeModule}
                role={role}
                query={query}
                attendanceStates={attendanceStates}
                onToggleAttendance={toggleAttendance}
                onAction={handleAction}
                addedRecords={createdRecords[activeModule as AddableModule] ?? []}
                onCreateRecord={(module) => setAddModule(module)}
              />
            )}
          </ScrollView>
          {!isWeb && (
            <BottomBar
              onSignOut={signOut}
              role={role}
              activeModule={activeModule}
              onNavigate={navigateTo}
            />
          )}
        </View>
      </View>
      {addModule && (
        <AddRecordScreen
          key={addModule}
          module={addModule}
          visible
          onCancel={() => setAddModule(null)}
          onSubmit={(values) => saveRecord(addModule, values)}
        />
      )}
    </SafeAreaView>
  );
}