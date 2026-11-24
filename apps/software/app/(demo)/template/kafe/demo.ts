// The 01 Kafe demo: Kopi Elysia (made up). Imports only the Kafe template.
import content from "@/content/demo/kopi-elysia.json";
import { kafe } from "@/templates/kafe";
import { loadDemo } from "@/templates/shared/demo";

export const demo = loadDemo("kafe", kafe, content);
