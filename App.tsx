import "./global.css";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Blocks,
  Check,
  ChevronDown,
  Command,
  Compass,
  Cpu,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MoreHorizontal,
  Plus,
  Radio,
  Settings2,
  Sparkles,
  Workflow,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppPresentation, AppProvider, useAppContext } from "./src/context/AppContext";

const projects = [
  { name: "Helix interface", type: "DESIGN SYSTEM", progress: 82, color: "bg-acid" },
  { name: "Orbit protocol", type: "RESEARCH", progress: 56, color: "bg-aqua" },
  { name: "Signal studio", type: "EXPERIMENT", progress: 34, color: "bg-coral" },
];

function AppRoot() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) return <View className="flex-1 bg-canvas" />;

  return (
    <AppProvider>
      <StatusBar style="light" />
      <AppGate />
    </AppProvider>
  );
}

function AppGate() {
  const { user, isReady } = useAppContext();
  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator color="#C6F36A" />
      </View>
    );
  }
  return user ? <Dashboard /> : <SignIn />;
}

function SignIn() {
  const { signIn, presentation, setPresentation } = useAppContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address to continue.");
      return;
    }
    setError("");
    await signIn(email.trim().toLowerCase());
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 justify-between px-6 pb-8 pt-5 md:px-12">
        <TopBar presentation={presentation} setPresentation={setPresentation} />
        <View className="w-full max-w-[430px] self-center py-14">
          <View className="mb-10 h-12 w-12 items-center justify-center rounded-2xl bg-acid">
            <Command size={23} color="#090B0E" strokeWidth={2.5} />
          </View>
          <Text className="font-body text-xs tracking-[3px] text-acid">YOUR SPACE, REIMAGINED</Text>
          <Text className="mt-4 font-display text-[42px] leading-[46px] text-ink">
            Make room for{"\n"}what&apos;s next.
          </Text>
          <Text className="mt-4 max-w-[350px] font-body text-base leading-6 text-muted">
            A calmer command center for the ideas you&apos;re bringing to life.
          </Text>

          <View className="mt-10 gap-4">
            <View className="h-14 flex-row items-center rounded-xl border border-line bg-surface px-4">
              <Mail size={17} color="#7F8B8A" />
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                onSubmitEditing={handleSignIn}
                placeholder="you@example.com"
                placeholderTextColor="#697472"
                value={email}
                className="ml-3 flex-1 font-body text-base text-ink outline-none"
              />
            </View>
            {!!error && <Text className="font-body text-sm text-coral">{error}</Text>}
            <Pressable
              accessibilityRole="button"
              onPress={handleSignIn}
              className="h-14 flex-row items-center justify-center gap-2 rounded-xl bg-acid active:opacity-80"
            >
              <Text className="font-medium text-base text-canvas">Enter your workspace</Text>
              <ArrowRight size={17} color="#090B0E" />
            </Pressable>
          </View>
          <View className="mt-6 flex-row items-center gap-2">
            <LockKeyhole size={13} color="#7F8B8A" />
            <Text className="font-body text-xs text-muted">Your workspace stays yours.</Text>
          </View>
        </View>
        <Text className="font-body text-xs text-muted">NOVA / PERSONAL WORKSPACE · 01</Text>
      </View>
    </SafeAreaView>
  );
}

function TopBar({
  presentation,
  setPresentation,
}: {
  presentation: AppPresentation;
  setPresentation: (value: AppPresentation) => void;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface">
          <Command size={16} color="#C6F36A" />
        </View>
        <Text className="font-bold text-sm tracking-[2px] text-ink">NOVA</Text>
      </View>
      <PresentationSwitch presentation={presentation} setPresentation={setPresentation} />
    </View>
  );
}

function PresentationSwitch({
  presentation,
  setPresentation,
}: {
  presentation: AppPresentation;
  setPresentation: (value: AppPresentation) => void;
}) {
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
            {value === "app" ? "APP" : "WEB"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function Dashboard() {
  const { user, signOut, presentation, setPresentation } = useAppContext();
  const isWeb = presentation === "web";
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  }).format(new Date()).toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 flex-row">
        {isWeb && <Sidebar onSignOut={signOut} />}
        <View className="min-w-0 flex-1">
          <View className="h-[68px] flex-row items-center justify-between border-b border-line px-5 md:px-9">
            <View className="flex-row items-center gap-3">
              {!isWeb && <Command size={19} color="#C6F36A" />}
              <Text className="font-medium text-sm text-muted">Workspace</Text>
              <ChevronDown size={14} color="#7F8B8A" />
            </View>
            <View className="flex-row items-center gap-3">
              <PresentationSwitch presentation={presentation} setPresentation={setPresentation} />
              <Pressable accessibilityLabel="Notifications" className="h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface">
                <Bell size={16} color="#A8B1AD" />
              </Pressable>
              <Pressable onPress={signOut} accessibilityLabel="Sign out" className="h-9 w-9 items-center justify-center rounded-full bg-acid">
                <Text className="font-bold text-xs text-canvas">{user?.name.slice(0, 1)}</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView contentContainerClassName="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-8 md:px-9 md:pt-10">
            <View className="mb-8 flex-row items-end justify-between gap-4">
              <View>
                <Text className="font-body text-sm text-muted">{today}</Text>
                <Text className="mt-2 font-display text-[34px] leading-10 text-ink">
                  Good to have you, {user?.name}.
                </Text>
              </View>
              <Pressable accessibilityRole="button" className="hidden h-10 flex-row items-center gap-2 rounded-lg bg-acid px-4 sm:flex">
                <Plus size={16} color="#090B0E" />
                <Text className="font-medium text-sm text-canvas">New project</Text>
              </Pressable>
            </View>

            <View className="flex-row flex-wrap gap-3">
              <Metric icon={<Workflow size={16} color="#C6F36A" />} label="IN MOTION" value="08" detail="Across 3 workstreams" />
              <Metric icon={<Radio size={16} color="#70E0CE" />} label="FOCUS TIME" value="12.4h" detail="+2.1h this week" />
              <Metric icon={<Sparkles size={16} color="#FF8D72" />} label="IDEAS CAPTURED" value="24" detail="5 ready to explore" />
            </View>

            <View className="mt-9 flex-row items-center justify-between">
              <View>
                <Text className="font-display text-xl text-ink">Your orbit</Text>
                <Text className="mt-1 font-body text-sm text-muted">A little progress adds up.</Text>
              </View>
              <Pressable accessibilityRole="button" className="flex-row items-center gap-1 py-2">
                <Text className="font-medium text-sm text-aqua">All projects</Text>
                <ArrowRight size={14} color="#70E0CE" />
              </Pressable>
            </View>

            <View className="mt-4 gap-3">
              {projects.map((project, index) => (
                <ProjectRow key={project.name} {...project} index={index} />
              ))}
            </View>

            <View className="mt-8 flex-row flex-wrap gap-3">
              <View className="min-h-[170px] min-w-[250px] flex-1 rounded-xl border border-line bg-surface p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Compass size={16} color="#70E0CE" />
                    <Text className="font-medium text-sm text-ink">Next on your radar</Text>
                  </View>
                  <MoreHorizontal size={18} color="#7F8B8A" />
                </View>
                <View className="mt-5 flex-row items-center justify-between border-t border-line pt-4">
                  <View>
                    <Text className="font-medium text-base text-ink">Prototype review</Text>
                    <Text className="mt-1 font-body text-sm text-muted">Today · 2:30 PM</Text>
                  </View>
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-raised">
                    <ArrowUpRight size={16} color="#C6F36A" />
                  </View>
                </View>
              </View>
              <View className="min-h-[170px] min-w-[250px] flex-1 rounded-xl border border-line bg-surface p-5">
                <View className="flex-row items-center gap-2">
                  <Cpu size={16} color="#FF8D72" />
                  <Text className="font-medium text-sm text-ink">Studio signal</Text>
                </View>
                <View className="mt-5 flex-row items-end gap-1.5">
                  {[34, 50, 39, 68, 46, 83, 58, 72, 48, 92, 63, 76, 52, 88, 61, 100].map((height, index) => (
                    <View key={index} style={{ height: `${height}%` }} className={`h-16 flex-1 rounded-sm ${index === 15 ? "bg-acid" : "bg-raised"}`} />
                  ))}
                </View>
                <Text className="mt-2 font-body text-xs text-muted">Your creative rhythm, this week</Text>
              </View>
            </View>
          </ScrollView>
          {!isWeb && <BottomBar onSignOut={signOut} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Metric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <View className="min-w-[155px] flex-1 rounded-xl border border-line bg-surface p-4 md:p-5">
      <View className="flex-row items-center gap-2">{icon}<Text className="font-body text-[10px] tracking-[1.4px] text-muted">{label}</Text></View>
      <Text className="mt-4 font-display text-[30px] leading-9 text-ink">{value}</Text>
      <Text className="mt-1 font-body text-xs text-muted">{detail}</Text>
    </View>
  );
}

function ProjectRow({
  name,
  type,
  progress,
  color,
  index,
}: {
  name: string;
  type: string;
  progress: number;
  color: string;
  index: number;
}) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-line bg-surface p-4 md:gap-5 md:px-5">
      <View className={`h-9 w-1 rounded-full ${color}`} />
      <View className="min-w-0 flex-1">
        <Text className="font-medium text-sm text-ink">{name}</Text>
        <Text className="mt-1 font-body text-[10px] tracking-[1px] text-muted">{type}</Text>
      </View>
      <View className="hidden flex-1 flex-row items-center gap-3 sm:flex">
        <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
          <View className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
        </View>
        <Text className="w-9 text-right font-body text-xs text-muted">{progress}%</Text>
      </View>
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-raised">
        {index === 1 ? <ArrowDownRight size={15} color="#A8B1AD" /> : index === 0 ? <Check size={15} color="#C6F36A" /> : <Blocks size={15} color="#A8B1AD" />}
      </View>
    </View>
  );
}

function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <View className="hidden w-[228px] border-r border-line px-4 py-5 md:flex">
      <View className="mb-10 flex-row items-center gap-2 px-2">
        <Command size={19} color="#C6F36A" />
        <Text className="font-bold text-sm tracking-[2px] text-ink">NOVA</Text>
      </View>
      <Text className="mb-3 px-2 font-body text-[10px] tracking-[1.6px] text-muted">WORKSPACE</Text>
      <View className="gap-1">
        <NavItem icon={<LayoutDashboard size={16} />} label="Overview" active />
        <NavItem icon={<Workflow size={16} />} label="Projects" />
        <NavItem icon={<Sparkles size={16} />} label="Ideas" />
        <NavItem icon={<Settings2 size={16} />} label="Settings" />
      </View>
      <Pressable onPress={onSignOut} className="mt-auto flex-row items-center gap-3 rounded-lg px-3 py-3">
        <Text className="font-body text-sm text-muted">Sign out</Text>
      </Pressable>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable className={`flex-row items-center gap-3 rounded-lg px-3 py-3 ${active ? "bg-raised" : ""}`}>
      <View className={active ? "text-acid" : "text-muted"}>{icon}</View>
      <Text className={`font-medium text-sm ${active ? "text-ink" : "text-muted"}`}>{label}</Text>
      {active && <View className="ml-auto h-1.5 w-1.5 rounded-full bg-acid" />}
    </Pressable>
  );
}

function BottomBar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <View className="h-[62px] flex-row items-center justify-around border-t border-line bg-canvas px-3">
      <View className="items-center gap-1"><LayoutDashboard size={18} color="#C6F36A" /><Text className="font-body text-[10px] text-acid">Home</Text></View>
      <View className="items-center gap-1"><Workflow size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">Projects</Text></View>
      <View className="items-center gap-1"><Sparkles size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">Ideas</Text></View>
      <Pressable onPress={onSignOut} className="items-center gap-1"><Settings2 size={18} color="#7F8B8A" /><Text className="font-body text-[10px] text-muted">Account</Text></Pressable>
    </View>
  );
}

export default AppRoot;