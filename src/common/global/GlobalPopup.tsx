import { AlertCircle, CheckCircle2, TriangleAlert, X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../i18n/LocaleContext";

export type NoticeType = "error" | "success" | "warning";
export type NoticePosition = "left-top" | "right-top" | "center-top" | "center";
export type NoticeMode = "modal" | "toast";

export type NoticeInput = {
  type: NoticeType;
  message: string;
  position?: NoticePosition;
  mode?: NoticeMode;
  duration?: number;
};

export type Notice = NoticeInput & {
  position: NoticePosition;
  mode: NoticeMode;
};

const noticeStyles = {
  error: { color: "#FF8D72", Icon: AlertCircle },
  success: { color: "#C6F36A", Icon: CheckCircle2 },
  warning: { color: "#F4C56A", Icon: TriangleAlert },
};

function NoticeContent({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  const { t } = useTranslation();
  const { color, Icon } = noticeStyles[notice.type];
  const title = notice.type === "error"
    ? t("notice.error")
    : notice.type === "success"
      ? t("notice.success")
      : t("notice.warning");

  return (
    <View className="w-full flex-row items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-lg">
      <Icon size={19} color={color} />
      <View className="min-w-0 flex-1">
        <Text className="font-medium text-sm text-ink">{title}</Text>
        <Text className="mt-1 font-body text-sm leading-5 text-muted">{notice.message}</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={t("notice.close")} onPress={onDismiss}>
        <X size={16} color="#7F8B8A" />
      </Pressable>
    </View>
  );
}

export default function GlobalPopup({
  notice,
  onDismiss,
}: {
  notice: Notice | null;
  onDismiss: () => void;
}) {
  if (!notice) return null;

  if (notice.mode === "modal") {
    return (
      <Modal transparent animationType="fade" onRequestClose={onDismiss}>
        <Pressable onPress={onDismiss} style={styles.backdrop}>
          <Pressable onPress={(event) => event.stopPropagation()} style={styles.modalContent}>
            <NoticeContent notice={notice} onDismiss={onDismiss} />
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View pointerEvents="auto" style={[styles.toast, getPositionStyle(notice.position)]}>
        <NoticeContent notice={notice} onDismiss={onDismiss} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
  },
  modalContent: {
    width: "100%",
    maxWidth: 420,
  },
  toast: {
    position: "absolute",
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: 16,
  },
});

function getPositionStyle(position: NoticePosition) {
  switch (position) {
    case "left-top":
      return { top: 24, left: 0 };
    case "right-top":
      return { top: 24, right: 0 };
    case "center-top":
      return { top: 24, alignSelf: "center" as const };
    case "center":
      return { top: "45%" as const, alignSelf: "center" as const };
  }
}