import type { Viewport } from "next";
import { DemoShell } from "@/templates/shared/demo";
import { demo } from "./demo";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function ProfilDemoLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell demo={demo}>{children}</DemoShell>;
}
