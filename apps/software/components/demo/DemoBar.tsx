import { asset, BASE_PATH, CONTACT } from "@/lib/site";
import { waLink } from "@/templates/shared/whatsapp";
import type { SiteCopy } from "@/content/site/id";
import styles from "./DemoBar.module.css";

/** "Ini demo template Kafe · Pesan template ini →", linking to Nanashi's WhatsApp. */
export function DemoBar({ t, templateName }: { t: SiteCopy; templateName: string }) {
  return (
    <div className={styles.bar} data-demo-bar>
      <div className={styles.inner}>
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
          className={styles.cta}
        >
          {t.demo.cta}&nbsp;→
        </a>
      </div>
    </div>
  );
}
