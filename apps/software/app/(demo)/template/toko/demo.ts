// The 04 Toko UMKM demo: Kriuk Kiana (made up, a temporary demo). Imports only the Toko template.
import content from "@/content/demo/kriuk-kiana.json";
import { toko } from "@/templates/toko";
import { loadDemo } from "@/templates/shared/demo";

export const demo = loadDemo("toko", toko, content);
