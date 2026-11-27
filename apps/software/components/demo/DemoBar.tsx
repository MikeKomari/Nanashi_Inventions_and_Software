import { asset, BASE_PATH, CONTACT } from "@/lib/site";
import { waLink } from "@/templates/shared/whatsapp";
import type { SiteCopy } from "@/content/site/id";
import type { TryItConfig } from "@/templates/shared/kind";
import { TryIt } from "./TryIt";
import styles from "./DemoBar.module.css";

type Props = {
  t: SiteCopy;
  templateName: string;
  /** The demo's own name and accent, and what "Coba dengan usahamu" may change. */
  demoName: string;
  demoAccent: string;
  tryIt: TryItConfig;
};

/** "Ini demo template Kafe · Pesan template ini → · Coba dengan usahamu", linking to Nanashi's WhatsApp. */
export function DemoBar({ t, templateName, demoName, demoAccent, tryIt }: Props) {
  return (
    <div className={styles.bar} data-demo-bar>
      <TryIt locale="id" templateName={templateName} name={demoName} accent={demoAccent} config={tryIt}>
        {/* Plain <a>: the Nanashi site uses a different root layout, so this is a full page load anyway. */}
        <a href={BASE_PATH} className={styles.home} aria-label={t.demo.home}>
          {/* Reversed (white) symbol on the dark bar, per the logo rules. Plain <img>: 2 KB SVG. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/nanashi-symbol-reversed.svg")} alt="" width={18} height={18} />
        </a>
        <span>{t.demo.bar(templateName)}</span>
        <span className={styles.sep} aria-hidden="true">
          ·
        </span>
        <a
          href={waLink(CONTACT.whatsapp, t.templates.orderMessage(templateName))}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-where="demo_bar"
          className={styles.cta}
        >
          {t.demo.cta}&nbsp;→
        </a>
      </TryIt>
    </div>
  );
}
