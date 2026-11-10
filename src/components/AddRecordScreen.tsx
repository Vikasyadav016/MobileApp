import { ArrowLeft, BookOpen, GraduationCap, Users } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddableModule } from "../constants/campus";
import { TranslationKey, useTranslation } from "../i18n/LocaleContext";

type FieldConfig = {
  key: string;
  label: TranslationKey;
  keyboardType?: "default" | "email-address";
  optional?: boolean;
};

const formConfig: Record<AddableModule, { title: TranslationKey; Icon: typeof Users; fields: FieldConfig[] }> = {
  students: {
    title: "form.addStudent",
    Icon: GraduationCap,
    fields: [
      { key: "name", label: "form.fullName" },
      { key: "id", label: "form.studentId" },
      { key: "group", label: "form.gradeClass" },
      { key: "email", label: "form.guardianEmail", keyboardType: "email-address", optional: true },
    ],
  },
  faculty: {
    title: "form.addFaculty",
    Icon: Users,
    fields: [
      { key: "name", label: "form.fullName" },
      { key: "id", label: "form.employeeId" },
      { key: "group", label: "form.department" },
      { key: "email", label: "form.workEmail", keyboardType: "email-address" },
    ],
  },
  courses: {
    title: "form.addSubject",
    Icon: BookOpen,
    fields: [
      { key: "name", label: "form.subjectName" },
      { key: "id", label: "form.subjectCode" },
      { key: "group", label: "form.gradeClass" },
      { key: "email", label: "form.teacher" },
    ],
  },
};

export default function AddRecordScreen({
  module,
  visible,
  onCancel,
  onSubmit,
}: {
  module: AddableModule;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Record<string, string>) => void;
}) {
  const { t } = useTranslation();
  const [values, setValues] = useState<Record<string, string>>({});
  const { title, Icon, fields } = formConfig[module];
  const isValid = fields.every((field) => field.optional || values[field.key]?.trim());

  function submit() {
    if (!isValid) return;
    onSubmit(values);
    setValues({});
  }

  function cancel() {
    setValues({});
    onCancel();
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={cancel} presentationStyle="fullScreen">
      <SafeAreaView className="flex-1 bg-canvas">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View className="h-14 flex-row items-center justify-between border-b border-line px-4 sm:px-6">
            <Pressable onPress={cancel} accessibilityRole="button" className="flex-row items-center gap-2 py-2">
              <ArrowLeft size={17} color="#176B5B" />
              <Text className="font-medium text-sm text-aqua">{t("form.cancel")}</Text>
            </Pressable>
            <Text className="font-medium text-xs tracking-[1px] text-muted">CAMPUS</Text>
            <View className="w-16" />
          </View>
          <ScrollView
            className="flex-1"
            contentContainerClassName="w-full max-w-[640px] self-center px-5 pb-8 pt-7 sm:px-8"
            keyboardShouldPersistTaps="handled"
          >
            <View className="mb-6 h-11 w-11 items-center justify-center rounded-xl bg-acid/10">
              <Icon size={20} color="#176B5B" />
            </View>
            <Text className="font-display text-[28px] leading-9 text-ink">{t(title)}</Text>
            <Text className="mt-2 font-body text-sm leading-5 text-muted">{t("form.required")}</Text>

            <View className="mt-7 gap-5">
              {fields.map((field) => (
                <View key={field.key}>
                  <Text className="mb-2 font-medium text-sm text-ink">{t(field.label)}</Text>
                  <TextInput
                    accessibilityLabel={t(field.label)}
                    autoCapitalize={field.keyboardType === "email-address" ? "none" : "words"}
                    keyboardType={field.keyboardType ?? "default"}
                    onChangeText={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
                    placeholder={t(field.label)}
                    placeholderTextColor="#82909B"
                    value={values[field.key] ?? ""}
                    className="h-12 rounded-lg border border-line bg-surface px-3 font-body text-sm text-ink outline-none"
                  />
                </View>
              ))}
            </View>

            <Pressable
              disabled={!isValid}
              onPress={submit}
              accessibilityRole="button"
              className={`mt-8 h-12 items-center justify-center rounded-lg ${isValid ? "bg-acid" : "bg-raised"}`}
            >
              <Text className={`font-medium text-sm ${isValid ? "text-white" : "text-muted"}`}>{t("form.save")}</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}