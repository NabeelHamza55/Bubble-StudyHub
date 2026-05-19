import { useEffect, useMemo } from "react";
import { SITE } from "../config/site";
import type { PageSeo } from "../seo/seoConfig";

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function usePageSeo(seo: PageSeo, jsonLd?: object | object[]) {
  const jsonLdSerialized = useMemo(
    () => (jsonLd ? JSON.stringify(jsonLd) : ""),
    [jsonLd]
  );

  useEffect(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : new URL(SITE.url).origin;
    const path = seo.path.startsWith("/") ? seo.path : `/${seo.path}`;
    const url = path === "/" ? `${origin}/` : `${origin}${path}`;
    const keywords = seo.keywords?.join(", ") ?? SITE.keywords.join(", ");

    document.title = seo.title;
    upsertMeta("description", seo.description);
    upsertMeta("keywords", keywords);
    upsertMeta("robots", seo.noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("author", SITE.author);
    upsertLink("canonical", url);

    upsertMeta("og:type", "website", "property");
    upsertMeta("og:site_name", SITE.name, "property");
    upsertMeta("og:title", seo.title, "property");
    upsertMeta("og:description", seo.description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:locale", SITE.locale, "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", seo.title);
    upsertMeta("twitter:description", seo.description);
    if (SITE.twitterHandle) {
      upsertMeta("twitter:site", SITE.twitterHandle);
    }

    if (jsonLdSerialized) {
      const parsed = JSON.parse(jsonLdSerialized) as object | object[];
      const graphs = Array.isArray(parsed) ? parsed : [parsed];
      upsertJsonLd(
        "page-json-ld",
        graphs.length === 1 ? graphs[0] : { "@graph": graphs }
      );
    }

    return () => {
      document.getElementById("page-json-ld")?.remove();
    };
  }, [seo.title, seo.description, seo.path, seo.noindex, seo.keywords, jsonLdSerialized]);
}
