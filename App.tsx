import { ExpoRoot } from "expo-router";
import type { ComponentProps } from "react";

type ExpoRouteContext = ComponentProps<typeof ExpoRoot>["context"];

const appContext = (require as NodeRequire & {
  context: (directory: string) => ExpoRouteContext;
}).context("./app");

export default function App() {
  return <ExpoRoot context={appContext} />;
}