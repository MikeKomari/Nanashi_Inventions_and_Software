import { demoMetadata } from "@/templates/shared/demo";
import { demo } from "./demo";

export const metadata = demoMetadata(demo);

export default function ProfilDemoPage() {
  return demo.page;
}
