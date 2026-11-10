import { ArrowDownToLine, ArrowUpRight, Plus, Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AddableModule, CampusModule, moduleLabels } from "../constants/campus";
import { UserRole } from "../context/AppContext";
import { TranslationKey, useTranslation } from "../i18n/LocaleContext";

type AttendanceState = "present" | "absent" | "late";
type Tone = "green" | "red" | "amber" | "blue";

export type CampusRecord = {
  id: string;
  name: string;
  secondary: string;
  meta: string;
  status: TranslationKey;
  tone: Tone;
  action?: TranslationKey;
};

type AttendanceScope = "students" | "faculty";

const records: Partial<Record<CampusModule, CampusRecord[]>> = {
  students: [
    { id: "s-1", name: "Aarav Sharma", secondary: "STU-24018 · Grade 10-A", meta: "Science stream", status: "campus.active", tone: "green" },
    { id: "s-2", name: "Ananya Patel", secondary: "STU-24022 · Grade 10-A", meta: "Science stream", status: "campus.active", tone: "green" },
    { id: "s-3", name: "Ishaan Mehta", secondary: "STU-24031 · Grade 10-B", meta: "Commerce stream", status: "campus.active", tone: "green" },
    { id: "s-4", name: "Sara Khan", secondary: "STU-24035 · Grade 9-C", meta: "Humanities stream", status: "campus.active", tone: "green" },
  ],
  faculty: [
    { id: "f-1", name: "Dr. Meera Nair", secondary: "Mathematics · MTH-014", meta: "Grade 9-12", status: "campus.onDuty", tone: "green" },
    { id: "f-2", name: "Rahul Verma", secondary: "Physics · PHY-008", meta: "Grade 10-12", status: "campus.onDuty", tone: "green" },
    { id: "f-3", name: "Priya Das", secondary: "English · ENG-021", meta: "Grade 8-10", status: "campus.onDuty", tone: "green" },
    { id: "f-4", name: "Amit Joshi", secondary: "Biology · BIO-011", meta: "Grade 9-12", status: "campus.underReview", tone: "amber" },
  ],
  attendance: [
    { id: "a-1", name: "Aarav Sharma", secondary: "Grade 10-A · Roll 04", meta: "08:42 AM", status: "campus.present", tone: "green", action: "campus.markAbsent" },
    { id: "a-2", name: "Ananya Patel", secondary: "Grade 10-A · Roll 08", meta: "08:46 AM", status: "campus.present", tone: "green", action: "campus.markAbsent" },
    { id: "a-3", name: "Ishaan Mehta", secondary: "Grade 10-A · Roll 12", meta: "Not checked in", status: "campus.absent", tone: "red", action: "campus.markPresent" },
    { id: "a-4", name: "Sara Khan", secondary: "Grade 10-A · Roll 18", meta: "08:51 AM", status: "campus.late", tone: "amber", action: "campus.markPresent" },
  ],
  exams: [
    { id: "e-1", name: "Mid-term assessment", secondary: "Grade 10 · Mathematics", meta: "Oct 21 · 09:00 AM", status: "campus.scheduled", tone: "blue" },
    { id: "e-2", name: "Practical examination", secondary: "Grade 12 · Physics", meta: "Oct 23 · 11:00 AM", status: "campus.scheduled", tone: "blue" },
    { id: "e-3", name: "Unit test 4", secondary: "Grade 9 · English", meta: "Oct 25 · 10:00 AM", status: "campus.scheduled", tone: "blue" },
  ],
  results: [
    { id: "r-1", name: "Aarav Sharma", secondary: "Grade 10-A · Mathematics", meta: "92 / 100 · A", status: "campus.published", tone: "green" },
    { id: "r-2", name: "Ananya Patel", secondary: "Grade 10-A · Mathematics", meta: "88 / 100 · A", status: "campus.published", tone: "green" },
    { id: "r-3", name: "Grade 12 Physics", secondary: "Practical examination", meta: "18 marks pending", status: "campus.underReview", tone: "amber" },
  ],
  courses: [
    { id: "c-1", name: "Mathematics · Grade 10", secondary: "Dr. Meera Nair · Room 204", meta: "4 classes this week", status: "campus.active", tone: "green" },
    { id: "c-2", name: "Physics · Grade 12", secondary: "Rahul Verma · Lab 2", meta: "3 classes this week", status: "campus.active", tone: "green" },
    { id: "c-3", name: "English · Grade 9", secondary: "Priya Das · Room 108", meta: "2 assignments to review", status: "campus.underReview", tone: "amber" },
  ],
  fees: [
    { id: "p-1", name: "Aarav Sharma", secondary: "Grade 10-A · Term 2", meta: "₹18,500 · Due Oct 18", status: "campus.overdue", tone: "red", action: "campus.recordPayment" },
    { id: "p-2", name: "Ananya Patel", secondary: "Grade 10-A · Term 2", meta: "₹18,500 · Due Oct 20", status: "campus.due", tone: "amber", action: "campus.recordPayment" },
    { id: "p-3", name: "Ishaan Mehta", secondary: "Grade 10-B · Term 2", meta: "₹18,500 · Paid Oct 08", status: "campus.paid", tone: "green" },
  ],
  library: [
    { id: "b-1", name: "Concepts of Physics · Vol. 1", secondary: "H. C. Verma · PHY-2041", meta: "Due Oct 16 · Aarav Sharma", status: "campus.overdue", tone: "red", action: "campus.issueBook" },
    { id: "b-2", name: "The Discovery of India", secondary: "Jawaharlal Nehru · HIS-1138", meta: "Available · Shelf B-12", status: "campus.active", tone: "green", action: "campus.issueBook" },
    { id: "b-3", name: "Advanced Mathematics", secondary: "R. D. Sharma · MAT-0872", meta: "Due Oct 20 · Ananya Patel", status: "campus.due", tone: "amber", action: "campus.issueBook" },
  ],
  classes: [
    { id: "cl-1", name: "Grade 10-A", secondary: "32 students · Room 204", meta: "Class teacher: Dr. Meera Nair", status: "campus.active", tone: "green" },
    { id: "cl-2", name: "Grade 10-B", secondary: "30 students · Room 205", meta: "Class teacher: Rahul Verma", status: "campus.active", tone: "green" },
    { id: "cl-3", name: "Grade 12-Science", secondary: "28 students · Science block", meta: "Class teacher: Amit Joshi", status: "campus.active", tone: "green" },
  ],
  departments: [
    { id: "d-1", name: "Mathematics", secondary: "8 faculty · 12 courses", meta: "Head: Dr. Meera Nair", status: "campus.active", tone: "green" },
    { id: "d-2", name: "Sciences", secondary: "14 faculty · 18 courses", meta: "Head: Rahul Verma", status: "campus.active", tone: "green" },
    { id: "d-3", name: "Humanities", secondary: "9 faculty · 11 courses", meta: "Head: Priya Das", status: "campus.active", tone: "green" },
  ],
  reports: [
    { id: "rp-1", name: "Monthly attendance summary", secondary: "All grades · October", meta: "Updated 8:42 AM", status: "campus.published", tone: "green", action: "campus.export" },
    { id: "rp-2", name: "Fee collection report", secondary: "Term 2 · Finance office", meta: "Updated yesterday", status: "campus.published", tone: "green", action: "campus.export" },
    { id: "rp-3", name: "Exam performance analysis", secondary: "Mid-term · Grade 9-12", meta: "Results review needed", status: "campus.underReview", tone: "amber", action: "campus.export" },
  ],
  timetable: [
    { id: "t-1", name: "Mathematics", secondary: "Grade 10-A · Room 204", meta: "09:00 – 09:45 AM", status: "campus.active", tone: "green" },
    { id: "t-2", name: "Mathematics", secondary: "Grade 10-B · Room 205", meta: "10:00 – 10:45 AM", status: "campus.active", tone: "green" },
    { id: "t-3", name: "Faculty meeting", secondary: "Conference room", meta: "12:15 – 01:00 PM", status: "campus.scheduled", tone: "blue" },
  ],
};

const teacherAttendanceRecords: CampusRecord[] = [
  { id: "ta-1", name: "Dr. Meera Nair", secondary: "Mathematics · MTH-014", meta: "08:12 AM", status: "campus.present", tone: "green", action: "campus.markAbsent" },
  { id: "ta-2", name: "Rahul Verma", secondary: "Physics · PHY-008", meta: "08:27 AM", status: "campus.present", tone: "green", action: "campus.markAbsent" },
  { id: "ta-3", name: "Priya Das", secondary: "English · ENG-021", meta: "Not checked in", status: "campus.absent", tone: "red", action: "campus.markPresent" },
  { id: "ta-4", name: "Amit Joshi", secondary: "Biology · BIO-011", meta: "08:51 AM", status: "campus.late", tone: "amber", action: "campus.markPresent" },
];

const toneClasses: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-rose-50 text-rose-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-sky-50 text-sky-700",
};

export default function WorkspacePanel({
  module,
  role,
  query,
  attendanceStates,
  onToggleAttendance,
  onAction,
  addedRecords,
  onCreateRecord,
}: {
  module: CampusModule;
  role: UserRole;
  query: string;
  attendanceStates: Record<string, AttendanceState>;
  onToggleAttendance: (id: string) => void;
  onAction: (action: TranslationKey) => void;
  addedRecords: CampusRecord[];
  onCreateRecord: (module: AddableModule) => void;
}) {
  const { t } = useTranslation();
  const [attendanceScope, setAttendanceScope] = useState<AttendanceScope>("students");
  const sourceRecords = module === "attendance"
    ? attendanceScope === "students" ? records.attendance : teacherAttendanceRecords
    : records[module];
  const moduleRecords = [...(sourceRecords ?? []), ...addedRecords].filter((record) => {
    if (role === "student") return module === "attendance"
      ? attendanceScope === "students" && record.id === "a-1"
      : ["e-1", "r-1", "c-1", "p-1", "b-1", "t-1"].includes(record.id);
    if (role === "faculty") return !["s-3", "s-4", "p-2", "p-3"].includes(record.id);
    return true;
  });
  const filteredRecords = moduleRecords.filter((record) =>
    `${record.name} ${record.secondary} ${record.meta}`.toLowerCase().includes(query.toLowerCase()),
  );
  const canManage = role === "admin" || role === "hod" || role === "faculty";
  const canExport = role !== "student";
  const canRecordPayments = role === "admin" || role === "hod";
  const canManageAttendance = attendanceScope === "students"
    ? role === "admin" || role === "hod" || role === "faculty"
    : role === "admin" || role === "hod";
  const addableModule: AddableModule | null = module === "students" || module === "faculty" || module === "courses"
    ? module
    : null;

  return (
    <View className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
      <View className="flex-row flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-5">
        <View>
          <Text className="font-display text-lg text-ink">{t(moduleLabels[module])}</Text>
          <Text className="mt-1 font-body text-xs text-muted">{t("campus.term")}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          {canExport && (
            <Pressable onPress={() => onAction("campus.export")} accessibilityRole="button" className="h-9 flex-row items-center gap-2 rounded-lg border border-line px-3">
              <ArrowDownToLine size={15} color="#63717E" />
              <Text className="font-medium text-xs text-muted">{t("campus.export")}</Text>
            </Pressable>
          )}
          {canManage && addableModule && (
            <Pressable onPress={() => onCreateRecord(addableModule)} accessibilityRole="button" className="h-9 flex-row items-center gap-2 rounded-lg bg-acid px-3">
              <Plus size={15} color="#FFFFFF" />
              <Text className="font-medium text-xs text-white">{t(addableModule === "students" ? "form.addStudent" : addableModule === "faculty" ? "form.addFaculty" : "form.addSubject")}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {module === "attendance" && role !== "student" && (
        <View className="flex-row gap-2 border-b border-line px-4 py-3 md:px-5">
          {(["students", "faculty"] as const).map((scope) => (
            <Pressable
              key={scope}
              accessibilityRole="button"
              accessibilityState={{ selected: attendanceScope === scope }}
              onPress={() => setAttendanceScope(scope)}
              className={`rounded-lg px-3 py-2 ${attendanceScope === scope ? "bg-acid/10" : "bg-raised"}`}
            >
              <Text className={`font-medium text-xs ${attendanceScope === scope ? "text-acid" : "text-muted"}`}>
                {t(scope === "students" ? "form.attendanceStudentTab" : "form.attendanceFacultyTab")}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <View className="hidden flex-row border-b border-line bg-raised px-5 py-2.5 md:flex">
        <Text className="flex-1 font-body text-[10px] tracking-[1px] text-muted">{module === "library" ? t("campus.bookTitle") : module === "exams" || module === "timetable" ? t("campus.subject") : t("campus.student")}</Text>
        <Text className="w-[190px] font-body text-[10px] tracking-[1px] text-muted">{t("campus.class")}</Text>
        <Text className="w-[140px] font-body text-[10px] tracking-[1px] text-muted">{t("campus.status")}</Text>
      </View>

      {filteredRecords.length ? filteredRecords.map((record) => {
        const attendanceState = attendanceStates[record.id];
        const statusKey = module === "attendance" && attendanceState
          ? `campus.${attendanceState}` as TranslationKey
          : record.status;
        const actionKey = module === "attendance"
          ? canManageAttendance
            ? attendanceState === "present" ? "campus.markAbsent" : "campus.markPresent"
            : undefined
          : module === "fees" && !canRecordPayments
            ? undefined
            : module === "library" && role === "student"
              ? "campus.requestBook"
              : record.action;

        return (
          <View key={record.id} className="flex-row items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 md:gap-4 md:px-5">
            <View className="min-w-0 flex-1">
              <Text numberOfLines={1} className="font-medium text-sm text-ink">{record.name}</Text>
              <Text numberOfLines={1} className="mt-1 font-body text-xs text-muted">{record.secondary}</Text>
            </View>
            <View className="hidden w-[190px] md:flex">
              <Text numberOfLines={2} className="font-body text-xs text-muted">{record.meta}</Text>
            </View>
            <View className="items-end gap-2 md:w-[140px] md:items-start">
              <Text className={`rounded-full px-2.5 py-1 font-medium text-[10px] ${toneClasses[record.tone]}`}>{t(statusKey)}</Text>
              {actionKey && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => module === "attendance" ? onToggleAttendance(record.id) : onAction(actionKey)}
                  className="flex-row items-center gap-1 py-1"
                >
                  <Text className="font-medium text-xs text-aqua">{t(actionKey)}</Text>
                  <ArrowUpRight size={13} color="#137A8A" />
                </Pressable>
              )}
            </View>
          </View>
        );
      }) : (
        <View className="items-center px-5 py-12">
          <Search size={20} color="#63717E" />
          <Text className="mt-3 font-body text-sm text-muted">{t("campus.noResults")}</Text>
        </View>
      )}
    </View>
  );
}