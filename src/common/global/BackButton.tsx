import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";
import { useTranslation } from "../../i18n/LocaleContext";

export default function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  if (!router.canGoBack()) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("back")}
      onPress={() => router.back()}
      className="mr-2 h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface"
    >
      <ArrowLeft size={16} color="#A8B1AD" />
    </Pressable>
  );
}