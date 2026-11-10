import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  Wallet,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { UserRole } from "../context/AppContext";
import { TranslationKey, useTranslation } from "../i18n/LocaleContext";
import Metric from "./Metric";

type OverviewMetric = {
  icon: React.ReactNode;
  label: TranslationKey;
  value: string;
  detail: TranslationKey;
};

const metricSets: Record<UserRole, OverviewMetric[]> = {
  admin: [
    { icon: <BookOpen size={16} color="#176B5B" />, label: "campus.activeStudents", value: "1,248", detail: "campus.acrossGrades" },
    { icon: <ClipboardCheck size={16} color="#137A8A" />, label: "campus.attendanceRate", value: "94.6%", detail: "campus.term" },
    { icon: <Wallet size={16} color="#C84B3C" />, label: "campus.feesDue", value: "₹4.28L", detail: "campus.unpaidThisTerm" },
    { icon: <CalendarDays size={16} color="#B07A18" />, label: "campus.examsScheduled", value: "06", detail: "campus.upcomingExams" },
  ],
  hod: [
    { icon: <BookOpen size={16} color="#176B5B" />, label: "campus.activeStudents", value: "342", detail: "campus.studentsToday" },
    { icon: <ClipboardCheck size={16} color="#137A8A" />, label: "campus.attendanceRate", value: "96.2%", detail: "campus.term" },
    { icon: <Clock3 size={16} color="#B07A18" />, label: "campus.marksAwaiting", value: "18", detail: "campus.examReview" },
    { icon: <CalendarDays size={16} color="#C84B3C" />, label: "campus.classes", value: "12", detail: "campus.myClasses" },
  ],
  faculty: [
    { icon: <CalendarDays size={16} color="#176B5B" />, label: "campus.myClassesCount", value: "04", detail: "campus.scheduleToday" },
    { icon: <ClipboardCheck size={16} color="#137A8A" />, label: "campus.attendanceRate", value: "93.0%", detail: "campus.term" },
    { icon: <Clock3 size={16} color="#B07A18" />, label: "campus.assignmentsToReview", value: "12", detail: "campus.actionRequired" },
    { icon: <BookOpen size={16} color="#C84B3C" />, label: "campus.examsScheduled", value: "02", detail: "campus.upcomingExams" },
  ],
  student: [
    { icon: <ClipboardCheck size={16} color="#176B5B" />, label: "campus.myAttendance", value: "92%", detail: "campus.term" },
    { icon: <Wallet size={16} color="#C84B3C" />, label: "campus.feeBalance", value: "₹12,500", detail: "campus.paymentDueOct20" },
    { icon: <BookOpen size={16} color="#137A8A" />, label: "campus.latestResult", value: "A", detail: "campus.overallGrade" },
    { icon: <CalendarDays size={16} color="#B07A18" />, label: "campus.nextExam", value: "03 days", detail: "campus.upcomingCount" },
  ],
};

const attendanceValues: Record<UserRole, number[]> = {
  admin: [82, 91, 87, 96, 93, 88, 98],
  hod: [90, 94, 89, 98, 96, 92, 99],
  faculty: [87, 92, 86, 95, 93, 90, 96],
  student: [88, 92, 90, 96, 93, 91, 98],
};

export default function OverviewPanel({ role }: { role: UserRole }) {
  const { language, t } = useTranslation();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-US", { weekday: "short" }).format(date);
  });

  const followUps: TranslationKey[] = role === "student"
    ? ["campus.nextExam", "campus.feeFollowUp", "campus.resultPublished"]
    : role === "faculty"
      ? ["campus.attendanceFollowUp", "campus.examReview", "campus.assignmentsToReview"]
      : ["campus.attendanceFollowUp", "campus.feeFollowUp", "campus.examReview"];

  return (
    <View>
      <View className="flex-row flex-wrap gap-3">
        {metricSets[role].map((metric) => (
          <Metric key={metric.label} icon={metric.icon} label={t(metric.label)} value={metric.value} detail={t(metric.detail)} />
        ))}
      </View>

      <View className="mt-6 flex-row flex-wrap gap-4">
        <View className="min-w-[280px] flex-1 rounded-xl border border-line bg-surface p-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="font-display text-base text-ink">{t("campus.weeklyAttendance")}</Text>
              <Text className="mt-1 font-body text-xs text-muted">{t("campus.term")}</Text>
            </View>
            <Text className="font-display text-lg text-acid">{role === "student" ? "92%" : role === "hod" ? "96.2%" : "94.6%"}</Text>
          </View>
          <View className="mt-5 h-32 flex-row items-end justify-between gap-2">
            {attendanceValues[role].map((value, index) => (
              <View key={days[index]} className="h-full flex-1 items-center justify-end gap-2">
                <View className="w-full flex-1 justify-end overflow-hidden rounded-t-md bg-raised">
                  <View className={`w-full rounded-t-md ${index === 6 ? "bg-acid" : "bg-aqua"}`} style={{ height: `${value}%` }} />
                </View>
                <Text className="font-body text-[10px] text-muted">{days[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="min-w-[280px] flex-1 rounded-xl border border-line bg-surface p-5">
          <View className="flex-row items-center gap-2">
            <CalendarDays size={16} color="#176B5B" />
            <Text className="font-display text-base text-ink">{role === "student" || role === "faculty" ? t("campus.myClasses") : t("campus.scheduleToday")}</Text>
          </View>
          <View className="mt-4 gap-3">
            {[
              { time: "09:00", subject: "Mathematics", room: "204" },
              { time: "10:30", subject: "Physics lab", room: "Lab 2" },
              { time: "12:15", subject: "English", room: "108" },
            ].map((item, index) => (
              <View key={item.time} className="flex-row items-center gap-3 border-t border-line pt-3">
                <Text className="w-12 font-medium text-xs text-aqua">{item.time}</Text>
                <View className="min-w-0 flex-1">
                  <Text className="font-medium text-sm text-ink">{item.subject}</Text>
                  <Text className="mt-0.5 font-body text-xs text-muted">{t("campus.room")} {item.room}</Text>
                </View>
                <View className={`h-2 w-2 rounded-full ${index === 0 ? "bg-acid" : "bg-raised"}`} />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-4 rounded-xl border border-line bg-surface p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Clock3 size={16} color="#B07A18" />
            <Text className="font-display text-base text-ink">{t("campus.actionRequired")}</Text>
          </View>
          <Text className="font-body text-xs text-muted">{t("campus.today")}</Text>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-x-8 gap-y-3">
          {followUps.map((item, index) => (
            <View key={item} className="min-w-[200px] flex-1 flex-row items-center gap-2">
              <View className={`h-2 w-2 rounded-full ${index === 1 ? "bg-coral" : "bg-amber-500"}`} />
              <Text className="flex-1 font-body text-sm text-muted">{t(item)}</Text>
              <Text className="font-medium text-xs text-ink">{index === 0 ? "04" : index === 1 ? "12" : "03"}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}