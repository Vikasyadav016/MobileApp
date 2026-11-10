import { ArrowRight, BookOpen, GraduationCap, Landmark, Users, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext, UserRole } from "../context/AppContext";
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
  const [role, setRole] = useState<UserRole>("admin");

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
      await signIn(normalizedEmail, role);
      showNotice({ type: "success", message: t("signIn.welcome"), position: "right-top" });
    } catch {
      showNotice({ type: "error", message: t("signIn.failed"), mode: "modal", position: "center" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow justify-between px-4 pb-6 pt-3 sm:px-6 md:px-12"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          keyboardShouldPersistTaps="handled"
        >
        <TopBar variant="unauthorized" presentation={presentation} setPresentation={setPresentation} />
        <View className="w-full max-w-[520px] self-center py-6 md:py-8">
          <View className="mb-6 h-11 w-11 items-center justify-center rounded-xl bg-acid">
            <Landmark size={21} color="#FFFFFF" strokeWidth={2.2} />
          </View>
          <Text className="font-body text-xs tracking-[2px] text-aqua">{t("signIn.eyebrow")}</Text>
          <Text className="mt-3 font-display text-[38px] leading-[42px] text-ink">
            {t("signIn.headlineStart")}<Text>{"\n"}{t("signIn.headlineEnd")}</Text>
          </Text>
          <Text className="mt-3 max-w-[420px] font-body text-base leading-6 text-muted">
            {t("signIn.description")}
          </Text>

          <View className="mt-7 gap-4">
            <View>
              <Text className="mb-2 font-medium text-sm text-ink">{t("signIn.roleLabel")}</Text>
              <View className="flex-row flex-wrap gap-2">
                {([
                  { id: "admin", Icon: Landmark },
                  { id: "hod", Icon: Users },
                  { id: "faculty", Icon: BookOpen },
                  { id: "student", Icon: GraduationCap },
                ] as const).map(({ id, Icon }) => (
                  <Pressable
                    key={id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: role === id }}
                    onPress={() => setRole(id)}
                    className={`min-w-[45%] flex-1 flex-row items-center gap-2 rounded-lg border px-3 py-3 ${role === id ? "border-acid bg-acid/10" : "border-line bg-surface"}`}
                  >
                    <Icon size={16} color={role === id ? "#176B5B" : "#63717E"} />
                    <Text className={`font-medium text-sm ${role === id ? "text-acid" : "text-muted"}`}>{t(`roles.${id}`)}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
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
          <View className="mt-4 flex-row items-center gap-2">
            <LockKeyhole size={13} color="#7F8B8A" />
            <Text className="flex-1 font-body text-xs leading-4 text-muted">{t("signIn.demoRoleNote")}</Text>
          </View>
        </View>
        <Text className="font-body text-xs text-muted">{t("signIn.footer")}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}