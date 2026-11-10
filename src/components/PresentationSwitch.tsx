import { Pressable, Text, View } from "react-native";
import { AppPresentation } from "../context/AppContext";
import { useTranslation } from "../i18n/LocaleContext";

export default function PresentationSwitch({
  presentation,
  setPresentation,
}: {
  presentation: AppPresentation;
  setPresentation: (value: AppPresentation) => void;
}) {
  const { t } = useTranslation();

  return (
    <View className="flex-row rounded-lg border border-line bg-surface p-1">
      {(["app", "web"] as const).map((value) => (
        <Pressable
          key={value}
          accessibilityRole="button"
          accessibilityState={{ selected: presentation === value }}
          onPress={() => setPresentation(value)}
          className={`rounded-md px-3 py-1.5 ${presentation === value ? "bg-raised" : ""}`}
        >
          <Text className={`font-medium text-xs ${presentation === value ? "text-ink" : "text-muted"}`}>
            {t(value === "app" ? "presentation.app" : "presentation.web")}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}