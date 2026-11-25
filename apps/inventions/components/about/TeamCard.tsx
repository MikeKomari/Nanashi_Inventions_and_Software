import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FounderLinked } from "@/components/ui/RichText";

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo: string | null;
  photoAlt?: string;
  links: { label: string; href: string }[];
};

/** One team member. Without a photo yet, a monogram stands in (no stock or placeholder faces). */
export function TeamCard({ m, bioPending }: { m: Member; bioPending: string }) {
  return (
    <article className="team-card lift">
      <div className="team-photo">
        {m.photo ? (
          <Image src={m.photo} alt={m.photoAlt ?? m.name} fill sizes="(min-width: 900px) 360px, 92vw" className="object-cover" />
        ) : (
          <span className="team-monogram" aria-hidden="true">
            {m.initials}
          </span>
        )}
      </div>
      <div className="team-body">
        <p className="eyebrow">{m.role}</p>
        <h3 className="team-name">
          <FounderLinked text={m.name} />
        </h3>
        <p className="team-bio">{m.bio || bioPending}</p>
        <ul className="team-links">
          {m.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-arrow" rel="noopener">
                {l.label}
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
