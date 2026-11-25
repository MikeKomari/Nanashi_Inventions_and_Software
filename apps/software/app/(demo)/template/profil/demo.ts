// The 06 Profil Pribadi demo: Kyouka Bella (made-up placeholder person). Imports only the Profil template.
import content from "@/content/demo/kyouka-bella.json";
import { profil } from "@/templates/profil";
import { loadDemo } from "@/templates/shared/demo";

export const demo = loadDemo("profil", profil, content);
