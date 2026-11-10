import { Bell, ChevronDown, Command } from "lucide-react-native";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
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
  const { width } = useWindowDimensions();
  const isAuthorized = variant === "authorized";
  const compact = width < 520;

  return (
    <View className={`h-[60px] flex-row items-center justify-between border-b border-line px-3 sm:h-[68px] sm:px-5 md:px-9 ${compact ? "gap-2" : "gap-4"}`}>
      {isAuthorized ? (
        <View className="flex-row items-center gap-3">
          {presentation === "app" && <Command size={19} color="#176B5B" />}
          <Text numberOfLines={1} className="font-medium text-xs text-muted sm:text-sm">{t("workspace")}</Text>
          <ChevronDown size={14} color="#7F8B8A" />
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <BackButton />
          <View className="h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface">
            <Command size={16} color="#C6F36A" />
          </View>
          <Text className="font-bold text-sm tracking-[2px] text-ink">CAMPUS</Text>
        </View>
      )}

      <View className="flex-row items-center gap-2 md:gap-3">
        {!compact && <PresentationSwitch presentation={presentation} setPresentation={setPresentation} />}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={language === "en" ? t("language.hindi") : t("language.english")}
          onPress={() => setLanguage(language === "en" ? "hi" : "en")}
          className="h-9 min-w-10 items-center justify-center rounded-lg border border-line bg-surface px-2"
        >
          <Text className="font-medium text-xs text-ink">{language === "en" ? "हिंदी" : "EN"}</Text>
        </Pressable>
        {isAuthorized && !compact && (
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