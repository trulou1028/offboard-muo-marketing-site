import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json exists in the home directory; without this,
  // Turbopack infers the workspace root as ~ and warns on every build.
  turbopack: {
    root: __dirname,
  },
  // 301 map for the domain cutover from the current production site
  // (see plans/006-resources-shell-redirects-cutover.md). `/intake` is
  // deliberately absent: it is a native route in this repo (plan 010) and
  // a redirect here would shadow it.
  async redirects() {
    return [
      // These four used to land on /how-it-works. That page is deferred and
      // serves `noindex`, so a 301 into it gave the inbound value nowhere to
      // go and the destination could not rank (docs/cutover-checklist.md).
      // The owner ruled out bringing the page back on 2026-09-15, so each one
      // now points at the live page that answers the same question.
      //
      // /product and /why-offboard described what Offboard is; the homepage's
      // four-step strip is that story now, and `#how-it-works` is its id.
      { source: "/product", destination: "/#how-it-works", permanent: true },
      { source: "/why-offboard", destination: "/about", permanent: true },
      // The former /job-search page became the product-led Application Packet
      // page. Keep every older entry point on one permanent destination.
      { source: "/job-search", destination: "/application-packet", permanent: true },
      { source: "/job-packet", destination: "/application-packet", permanent: true },
      // /about's "Fair questions" is the live general FAQ, and one of its five
      // questions is word for word one of the hidden page's.
      { source: "/faq", destination: "/about#faq", permanent: true },
      { source: "/community", destination: "/#community", permanent: true },
      { source: "/founder-story", destination: "/about", permanent: true },
      // Retargeted from /about in plan 034, now that a real trust page exists.
      { source: "/security", destination: "/privacy-security", permanent: true },
      // The thin crosslink page was retired into /workforce in plan 035; the
      // URL is in the wild, so it keeps working through this 301.
      { source: "/public-partners", destination: "/workforce", permanent: true },
      { source: "/for-organizations", destination: "/employers", permanent: true },
      { source: "/for-recruiters", destination: "/employers", permanent: true },
      { source: "/gift", destination: "/pricing", permanent: true },
      { source: "/tools", destination: "/resources", permanent: true },
      // Offboard's own three pages inside the old tool directory, ahead of the
      // catch-all below because Next matches in order (Search Console, six
      // months to 2026-09-14). The ghost checker is the best-converting page
      // on the whole site - 10 clicks from 32 impressions, a 31% clickthrough
      // - and it was landing on the guides index.
      { source: "/tools/offboard-ghost-job-checker", destination: "/application-packet", permanent: true },
      { source: "/tools/offboard-job-packets", destination: "/application-packet", permanent: true },
      { source: "/tools/offboard-lumo", destination: "/lumo", permanent: true },
      { source: "/tools/:slug*", destination: "/resources", permanent: true },
      { source: "/tool-directory", destination: "/resources", permanent: true },

      // The older www.offboard.co site, still indexed. None of these appear in
      // offboard.co/sitemap.xml, which is why the sitemap-only pass missed
      // them: 42 URLs, 14 clicks and 2,984 impressions that would have 404ed.
      // Measured in docs/cutover-checklist.md.
      { source: "/articles", destination: "/resources", permanent: true },
      { source: "/articles/:slug*", destination: "/resources", permanent: true },
      // The two /blog slugs that have a ported article go straight to it; a
      // single hop beats a chain, and the rest fall through to the index.
      { source: "/blog/what-is-an-ai-agent", destination: "/resources/what-is-an-ai-agent", permanent: true },
      { source: "/blog/how-ai-is-changing-the-job-search-in-2026", destination: "/resources/how-ai-is-changing-the-job-search-in-2026", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug*", destination: "/resources", permanent: true },
      { source: "/categories", destination: "/resources", permanent: true },
      { source: "/categories/:slug*", destination: "/resources", permanent: true },
      { source: "/article-categories", destination: "/resources", permanent: true },
      { source: "/article-categories/:slug*", destination: "/resources", permanent: true },
      // One indexed misspelling of the site's best article. The garbled
      // variants Google guessed at are left alone; they carry no clicks and
      // /resources/[slug] already 404s an unknown slug.
      { source: "/resources/will-employers-know-your-cover-letter-is-ai", destination: "/resources/will-employers-know-cover-letter-is-ai", permanent: true },
      // Subject matches, not nearest-page guesses.
      { source: "/layoff-checklist", destination: "/layoff-support", permanent: true },
      { source: "/job-packet-agent", destination: "/application-packet", permanent: true },
      { source: "/ai-job-matchmaker", destination: "/application-packet", permanent: true },
      { source: "/gpt", destination: "/integrations", permanent: true },
      { source: "/mission", destination: "/about", permanent: true },
      { source: "/for-teams", destination: "/employers", permanent: true },
      { source: "/privacy", destination: "/privacy-security", permanent: true },
      // Follows its parent, which is the whole reason it was left pointing at
      // /how-it-works until that decision was made.
      { source: "/product/:slug*", destination: "/#how-it-works", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // A Webflow leftover with no subject of its own.
      { source: "/wireframe/:slug*", destination: "/", permanent: true },
      // App routes that were once served from the marketing domain. The
      // marketing site has no terms page; the footer already points at the
      // app's, so these do too.
      { source: "/terms", destination: "https://app.offboard.co/terms", permanent: true },
      { source: "/user-account", destination: "https://app.offboard.co/", permanent: true },
      { source: "/update-password", destination: "https://app.offboard.co/", permanent: true },
      // Per-slug /resources redirects that used to live here are gone as of
      // plan 016. A slug retained as `retired` in the CMS, currently the
      // Alameda policy article, receives the same permanent redirect from
      // src/app/resources/[slug]/page.tsx at the route level (via
      // permanentRedirect() from next/navigation) after looking up the
      // slug's status — see docs/cms-architecture.md "One publish state,
      // not three" and "Decisions" #3.
    ];
  },
};

export default nextConfig;
