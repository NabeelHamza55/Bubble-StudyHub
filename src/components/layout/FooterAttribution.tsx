import { SITE } from "../../config/site";

interface FooterAttributionProps {
  className?: string;
}

/** Single-line powered by, copyright, and builder credit. */
export function FooterAttribution({ className = "footer-attribution" }: FooterAttributionProps) {
  const { publisher, creator } = SITE;
  const year = SITE.copyrightYear;

  return (
    <p className={className}>
      Powered by{" "}
      {publisher.url ? (
        <a href={publisher.url} target="_blank" rel="noopener noreferrer">
          {publisher.name}
        </a>
      ) : (
        <strong>{publisher.name}</strong>
      )}
      {" · "}© {year} {SITE.copyrightHolder}
      {" · "}Built by{" "}
      <a href={creator.github} target="_blank" rel="noopener noreferrer">
        {creator.name}
      </a>
    </p>
  );
}
