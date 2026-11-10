import { ArrowRight, Command, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../context/AppContext";
import { useFeedback } from "../common/global/FeedbackProvider";
import Loader from "../common/global/Loader";
import { useTranslation } from "../i18n/LocaleContext";
import TopBar from "./TopBar";

export default function SignIn() {
  const { signIn, presentation, setPresentation } = useAppContext();
  const { t } = useTranslation();
  const { showNotice } = useFeedback();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError(t("signIn.invalidEmail"));
      showNotice({ type: "error", message: t("signIn.invalidEmail"), position: "center-top" });
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await signIn(normalizedEmail);
      showNotice({ type: "success", message: t("signIn.welcome"), position: "right-top" });
    } catch {
      showNotice({ type: "error", message: t("signIn.failed"), mode: "modal", position: "center" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 justify-between px-6 pb-8 pt-5 md:px-12">
        <TopBar variant="unauthorized" presentation={presentation} setPresentation={setPresentation} />
        <View className="w-full max-w-[430px] self-center py-14">
          <View className="mb-10 h-12 w-12 items-center justify-center rounded-2xl bg-acid">
            <Command size={23} color="#090B0E" strokeWidth={2.5} />
          </View>
          <Text className="font-body text-xs tracking-[3px] text-acid">{t("signIn.eyebrow")}</Text>
          <Text className="mt-4 font-display text-[42px] leading-[46px] text-ink">
            {t("signIn.headlineStart")}\n{t("signIn.headlineEnd")}
          </Text>
          <Text className="mt-4 max-w-[350px] font-body text-base leading-6 text-muted">
            {t("signIn.description")}
          </Text>

          <View className="mt-10 gap-4">
            <View className="h-14 flex-row items-center rounded-xl border border-line bg-surface px-4">
              <Mail size={17} color="#7F8B8A" />
              <TextInput
                accessibilityLabel={t("signIn.emailPlaceholder")}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                onSubmitEditing={handleSignIn}
                placeholder={t("signIn.emailPlaceholder")}
                placeholderTextColor="#697472"
                returnKeyType="go"
                value={email}
                className="ml-3 flex-1 font-body text-base text-ink outline-none"
              />
            </View>
            {!!error && <Text accessibilityRole="alert" className="font-body text-sm text-coral">{error}</Text>}
            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={handleSignIn}
              className="h-14 flex-row items-center justify-center gap-2 rounded-xl bg-acid active:opacity-80"
            >
              {isSubmitting ? (
                <Loader mode="inline" />
              ) : (
                <>
                  <Text className="font-medium text-base text-canvas">{t("signIn.enterWorkspace")}</Text>
                  <ArrowRight size={17} color="#090B0E" />
                </>
              )}
            </Pressable>
          </View>
          <View className="mt-6 flex-row items-center gap-2">
            <LockKeyhole size={13} color="#7F8B8A" />
            <Text className="font-body text-xs text-muted">{t("signIn.privacy")}</Text>
          </View>
        </View>
        <Text className="font-body text-xs text-muted">{t("signIn.footer")}</Text>
      </View>
    </SafeAreaView>
  );
}