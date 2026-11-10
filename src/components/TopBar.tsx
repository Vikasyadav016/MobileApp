import { Bell, ChevronDown, Command } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { AppPresentation } from "../context/AppContext";
import { useTranslation } from "../i18n/LocaleContext";
import BackButton from "../common/global/BackButton";
import PresentationSwitch from "./PresentationSwitch";

type TopBarProps = {
  variant: "authorized" | "unauthorized";
  presentation: AppPresentation;
  setPresentation: (value: AppPresentation) => void;
  userName?: string;
  onSignOut?: () => void;
};

export default function TopBar({
  variant,
  presentation,
  setPresentation,
  userName,
  onSignOut,
}: TopBarProps) {
  const { language, setLanguage, t } = useTranslation();
  const isAuthorized = variant === "authorized";

  return (
    <View className="h-[68px] flex-row items-center justify-between border-b border-line px-5 md:px-9">
      {isAuthorized ? (
        <View className="flex-row items-center gap-3">
          {presentation === "app" && <Command size={19} color="#C6F36A" />}
          <Text className="font-medium text-sm text-muted">{t("workspace")}</Text>
          <ChevronDown size={14} color="#7F8B8A" />
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <BackButton />
          <View className="h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface">
            <Command size={16} color="#C6F36A" />
          </View>
          <Text className="font-bold text-sm tracking-[2px] text-ink">NOVA</Text>
        </View>
      )}

      <View className="flex-row items-center gap-2 md:gap-3">
        <PresentationSwitch presentation={presentation} setPresentation={setPresentation} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={language === "en" ? t("language.hindi") : t("language.english")}
          onPress={() => setLanguage(language === "en" ? "hi" : "en")}
          className="h-9 min-w-10 items-center justify-center rounded-lg border border-line bg-surface px-2"
        >
          <Text className="font-medium text-xs text-ink">{language === "en" ? "हिंदी" : "EN"}</Text>
        </Pressable>
        {isAuthorized && (
          <>
            <Pressable accessibilityRole="button" accessibilityLabel={t("navigation.notifications")} className="h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface">
              <Bell size={16} color="#A8B1AD" />
            </Pressable>
            <Pressable onPress={onSignOut} accessibilityRole="button" accessibilityLabel={t("navigation.signOut")} className="h-9 w-9 items-center justify-center rounded-full bg-acid">
              <Text className="font-bold text-xs text-canvas">{userName?.slice(0, 1)}</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}