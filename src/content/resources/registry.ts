// Single source of truth for the Guides & Resources library.
//
// Ported from the legacy TanStack marketing site
// (~/Documents/Codex/offboard-marketing-site/src/content/resources.ts) as
// part of plan 013. The `image` field was dropped: this repo has no
// asset-pipeline equivalent for the legacy `@/assets/blog/*.webp` imports,
// and porting binary images was out of the plan's declared scope. If it is
// needed later, add it back here and to `GuideArticle`. `guestAuthor` is
// kept as plain strings (name/bio/company/url), dropping only the binary
// `avatar` field for the same reason.
//
// This registry is also the future CMS import surface (see plan 013
// Maintenance notes): when the Supabase CMS phase lands, this becomes a
// fetch and the posts move to the CMS, while the route and layout survive.

export type ResourceCategory = "Guides" | "AI & Technology" | "Essays" | "Policy & Accountability";

export type ResourcePost = {
  slug: string;
  title: string;
  category: ResourceCategory;
  excerpt: string;
  readingTime: string;
  date?: string;
  author?: { name: string; role: string };
  guestAuthor?: { name: string; bio: string; company: string; url: string };
  related?: string[];
  /** True once the article body has been ported into src/content/resources/posts/. */
  ported: boolean;
};

export const categoryMeta: Record<ResourceCategory, { description: string }> = {
  Guides: { description: "Practical, calm how-tos for the moments right after a layoff." },
  "AI & Technology": {
    description: "Clear explainers on AI, agents, and how hiring is actually changing.",
  },
  Essays: { description: "Founder notes on layoffs, work, and why Offboard exists." },
  "Policy & Accountability": {
    description:
      "Reported opinion on how public money meets (or misses) laid-off workers, and what measurable accountability looks like.",
  },
};

// Display order for the hub.
export const categoryOrder: ResourceCategory[] = ["Guides", "AI & Technology", "Essays", "Policy & Accountability"];

export const resources: ResourcePost[] = [
  // ---------------------------------------------------------------- Guides
  {
    slug: "first-week-after-a-layoff",
    title: "What to do in your first week after a layoff",
    category: "Guides",
    excerpt:
      "A calm, ordered checklist for the first seven days, so the urgent things get handled and the rest can wait.",
    readingTime: "6 min read",
    related: ["negotiating-your-severance", "rebuild-your-resume-after-a-layoff"],
    ported: true,
  },
  {
    slug: "negotiating-your-severance",
    title: "How to read and negotiate your severance",
    category: "Guides",
    excerpt:
      "What is actually negotiable, the questions to ask before you sign, and how to buy yourself more runway.",
    readingTime: "7 min read",
    related: ["first-week-after-a-layoff", "career-changers-guide-to-job-offer-negotiations"],
    ported: true,
  },
  {
    slug: "rebuild-your-resume-after-a-layoff",
    title: "Rebuild your resume after a layoff",
    category: "Guides",
    excerpt:
      "How to frame the layoff, lead with outcomes, and tailor a base resume to each role without starting over every time.",
    readingTime: "8 min read",
    related: ["first-week-after-a-layoff", "how-ai-is-changing-the-job-search-in-2026"],
    ported: true,
  },
  {
    slug: "career-changers-guide-to-job-offer-negotiations",
    title: "The Career Changer's Guide to Job Offer Negotiations",
    category: "Guides",
    excerpt:
      "How to negotiate your worth when you're changing careers, and why most people leave money on the table. Expert strategies from the cofounders of YourNegotiations.",
    readingTime: "8 min read",
    date: "2026-03-18",
    author: { name: "Offboard", role: "Team" },
    guestAuthor: {
      name: "Gerta & Alex",
      bio: "Cofounders of YourNegotiations.com. They help professionals negotiate job offers with confidence. Their clients have negotiated millions in additional compensation across tech, finance, and consulting.",
      company: "YourNegotiations",
      url: "https://yournegotiations.com",
    },
    related: ["negotiating-your-severance", "rebuild-your-resume-after-a-layoff"],
    ported: true,
  },
  {
    slug: "health-insurance-after-a-layoff",
    title: "Health insurance after a layoff: COBRA, ACA, and the cheaper options people miss",
    category: "Guides",
    excerpt:
      "Most laid-off workers default to COBRA and overpay. A clear, 30-minute comparison of every coverage option and how to choose before the deadline.",
    readingTime: "7 min read",
    date: "2026-06-04",
    author: { name: "Offboard", role: "Team" },
    related: ["first-week-after-a-layoff", "negotiating-your-severance"],
    ported: true,
  },
  {
    slug: "how-to-announce-a-layoff-on-linkedin",
    title: "How to announce a layoff on LinkedIn (with three templates)",
    category: "Guides",
    excerpt:
      "When to post, what to say, and three templates you can adapt. Plus the small things that meaningfully raise the response rate.",
    readingTime: "6 min read",
    date: "2026-06-04",
    author: { name: "Offboard", role: "Team" },
    related: ["first-week-after-a-layoff", "rebuild-your-resume-after-a-layoff"],
    ported: true,
  },
  {
    slug: "best-job-application-trackers-2026",
    title: "Best job application trackers in 2026: Huntr vs Teal vs Simplify vs spreadsheets",
    category: "Guides",
    excerpt:
      "An honest comparison of the four options most job seekers actually consider, what each does well, and how to pick the one you will actually keep up with.",
    readingTime: "7 min read",
    date: "2026-06-04",
    author: { name: "Offboard", role: "Team" },
    related: ["rebuild-your-resume-after-a-layoff", "how-ai-is-changing-the-job-search-in-2026"],
    ported: true,
  },

  // -------------------------------------------------------- AI & Technology
  {
    slug: "how-ai-is-changing-the-job-search-in-2026",
    title: "How AI Is Changing the Job Search in 2026",
    category: "AI & Technology",
    excerpt:
      "AI is changing the job search in 2026 by speeding up hiring, filtering candidates earlier, and reshaping resume screening. Here's what job seekers need to know.",
    readingTime: "10 min read",
    date: "2026-03-17",
    author: { name: "Offboard", role: "Team" },
    related: ["what-is-an-ai-agent", "7-levels-ai-agent-capability"],
    ported: true,
  },
  {
    slug: "what-is-an-ai-agent",
    title: "What Is an AI Agent? A Simple Guide to the Different Types of AI Agents",
    category: "AI & Technology",
    excerpt:
      "A clear, jargon-free guide to what AI agents actually are, how they differ from chatbots and automation, and the different types you should know about.",
    readingTime: "10 min read",
    date: "2026-03-16",
    author: { name: "Offboard", role: "Team" },
    related: ["7-levels-ai-agent-capability", "how-ai-is-changing-the-job-search-in-2026"],
    ported: true,
  },
  {
    slug: "7-levels-ai-agent-capability",
    title: "The 7 Levels of AI Agent Capability: Where AI Is Going Next",
    category: "AI & Technology",
    excerpt:
      "A practical framework for understanding AI agent maturity, from basic intelligence to collective learning, and why it matters for your job search.",
    readingTime: "9 min read",
    date: "2026-03-16",
    author: { name: "Offboard", role: "Team" },
    related: ["what-is-an-ai-agent", "how-ai-is-changing-the-job-search-in-2026"],
    ported: true,
  },
  {
    slug: "will-employers-know-cover-letter-is-ai",
    title: "Will employers know your cover letter is AI? What detection actually catches",
    category: "AI & Technology",
    excerpt:
      "Most employers do not run cover letters through AI detectors, and the detectors that exist are unreliable. The real risk is sounding generic. Here is how to use AI without sabotaging your shot.",
    readingTime: "6 min read",
    date: "2026-06-04",
    author: { name: "Offboard", role: "Team" },
    related: ["how-ai-is-changing-the-job-search-in-2026", "rebuild-your-resume-after-a-layoff"],
    ported: true,
  },

  // ---------------------------------------------------------------- Essays
  // Not ported yet: these await an owner editorial pass before republication
  // under the new shell. See next.config.ts for their 301s to /resources.
  {
    slug: "this-is-not-charity-it-is-reconstruction",
    title: "This Is Not Charity. It Is Reconstruction.",
    category: "Essays",
    excerpt:
      "A raw, personal account of life after layoff — the rage, the despair, and the third path between torching everything and disappearing. Why Offboard exists.",
    readingTime: "4 min read",
    date: "2026-04-16",
    author: { name: "Steph", role: "Founder" },
    related: ["we-forgot-to-reinforce-the-foundations", "they-think-an-idea-is-bulletproof-they-are-wrong"],
    ported: false,
  },
  {
    slug: "a-series-of-fortunate-events",
    title: "A Series of Fortunate Events",
    category: "Essays",
    excerpt:
      "The ones that feel like fate whispering “keep going.” A reflection on three serendipitous moments during Tech Week that rebooted a founder's compass.",
    readingTime: "3 min read",
    date: "2025-12-30",
    author: { name: "Steph", role: "Founder" },
    related: ["this-is-not-charity-it-is-reconstruction", "the-mentor-trap-a-silicon-valley-horror-story"],
    ported: false,
  },
  {
    slug: "they-think-an-idea-is-bulletproof-they-are-wrong",
    title: "They Think an Idea is Bulletproof. They Are Wrong.",
    category: "Essays",
    excerpt:
      "This essay calls out the myth of a “bulletproof” AI future and the VC playbook that treats workers as expendable. It ends with a concrete IC playbook that flips the script.",
    readingTime: "5 min read",
    date: "2025-09-29",
    author: { name: "Steph", role: "Founder" },
    related: ["we-forgot-to-reinforce-the-foundations", "the-valleys-hypocrisy-hustle-exposed-by-the-overemployed"],
    ported: false,
  },
  {
    slug: "we-forgot-to-reinforce-the-foundations",
    title: "We Forgot to Reinforce the Foundations",
    category: "Essays",
    excerpt:
      "The tech industry treated layoffs like a spreadsheet exercise and forgot the human foundations that keep the whole thing standing. A call to patch the system with people.",
    readingTime: "3 min read",
    date: "2025-08-20",
    author: { name: "Steph", role: "Founder" },
    related: ["this-is-not-charity-it-is-reconstruction", "they-think-an-idea-is-bulletproof-they-are-wrong"],
    ported: false,
  },
  {
    slug: "the-mentor-trap-a-silicon-valley-horror-story",
    title: "The Mentor Trap: A Silicon Valley Horror Story",
    category: "Essays",
    excerpt:
      "Why grown adults shouldn't need babysitters with black books. A raw take on predatory mentorship in VC culture and a call for accountability.",
    readingTime: "3 min read",
    date: "2025-07-27",
    author: { name: "Steph", role: "Founder" },
    related: ["the-valleys-hypocrisy-hustle-exposed-by-the-overemployed", "a-series-of-fortunate-events"],
    ported: false,
  },
  {
    slug: "the-valleys-hypocrisy-hustle-exposed-by-the-overemployed",
    title: "The Valley's Hypocrisy Hustle Exposed by the Overemployed",
    category: "Essays",
    excerpt:
      "How the overemployed cracked the system and turned hustle culture into a joke. An expose on Silicon Valley's class war and the workers fighting back.",
    readingTime: "4 min read",
    date: "2025-07-23",
    author: { name: "Steph", role: "Founder" },
    related: ["the-mentor-trap-a-silicon-valley-horror-story", "they-think-an-idea-is-bulletproof-they-are-wrong"],
    ported: false,
  },

  // ------------------------------------------------- Policy & Accountability
  {
    slug: "alameda-d2-safety-net-transparency",
    title: "She won on the safety net. Three weeks later, it came calling.",
    category: "Policy & Accountability",
    excerpt:
      "Alameda County District 2 ran on protecting the safety net, then passed a $19.3M AHS lifeline nobody would source. A look at what real accountability would look like, and where the ACT pilot fits.",
    readingTime: "9 min read",
    date: "2026-06-29",
    author: { name: "Steph", role: "Founder" },
    related: ["this-is-not-charity-it-is-reconstruction", "we-forgot-to-reinforce-the-foundations"],
    ported: false,
  },
];

export function getResource(slug: string): ResourcePost | undefined {
  return resources.find((post) => post.slug === slug);
}

export function getByCategory(category: ResourceCategory): ResourcePost[] {
  return resources.filter((post) => post.category === category && post.ported);
}

export const portedResources: ResourcePost[] = resources.filter((post) => post.ported);

export const unportedResources: ResourcePost[] = resources.filter((post) => !post.ported);

export type ResourceSection = { category: ResourceCategory; posts: ResourcePost[] };

/**
 * Builds the /resources hub's category sections (in display order, dropping
 * empty categories). Shared by the route (src/app/resources/page.tsx) and
 * its tests, so both stay in sync with the registry as the single builder
 * (plan 015 step 6: /resources' data-fetch moves here so MarketingResources
 * itself can be a plain view that takes sections as a prop).
 */
export function buildResourceSections(): ResourceSection[] {
  return categoryOrder
    .map((category) => ({ category, posts: getByCategory(category) }))
    .filter(({ posts }) => posts.length > 0);
}
