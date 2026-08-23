import { GuideH2, GuideH3, GuideP, GuideList, GuideCallout, GuideBlockquote } from "@/components/marketing/resources/GuideArticle";

export default function HowToAnnounceALayoffOnLinkedIn() {
  return (
    <>
      <GuideP>
        You do not have to post anything on LinkedIn after a layoff. But if you decide to, a good
        post is one of the highest-leverage hours you will spend in your search. It puts your
        situation in front of hundreds of people who already know your work and may quietly route
        an opportunity to you within days. Here is how to write one that lands, plus three
        templates you can adapt.
      </GuideP>

      <GuideH2>Should you post at all?</GuideH2>
      <GuideP>
        Post if any of these are true: you have a strong professional network on LinkedIn, you are
        open about looking, you can write the post without anger or pleading, and you can stay
        offline for a few hours after publishing while it gathers comments.
      </GuideP>
      <GuideP>
        Wait if you are still in shock, mid-negotiation on severance, bound by a non-disparagement
        clause you have not read carefully, or planning to take a real break before searching.
        There is no expiration date on this. A post a month from now works as well as a post
        tomorrow.
      </GuideP>

      <GuideH2>What a good post does</GuideH2>
      <GuideList
        items={[
          "Names the situation in one calm sentence. No drama, no company-bashing.",
          "Says what you do well, in specific terms. Not 'product leader', but 'product leader who shipped two zero-to-one B2B SaaS products and grew the second from $0 to $4M ARR in 18 months'.",
          "Says what you are looking for, with enough specificity that someone could match you to a role. Function, industries, location or remote, level.",
          "Makes it easy to help. A clear ask (intros, leads, referrals), an email address, and a green Open to Work frame on your photo if you are open about searching.",
          "Ends with thanks, not desperation.",
        ]}
      />

      <GuideCallout title="One rule above all">
        Avoid the lines recruiters and your network have read a thousand times: humbled, blessed,
        grateful for the journey, excited for the next chapter. Be a person, not a press release.
      </GuideCallout>

      <GuideH2>Template 1: The clean and direct version</GuideH2>
      <GuideBlockquote>
        News: I was laid off from [Company] last week as part of a broader reduction.
        <br />
        <br />
        For the last [X years] I have led [function] at [Company] and [previous company]. My focus
        has been [one specific area, e.g. growth experimentation, design systems, supply chain
        optimization]. The work I am proudest of: [one concrete result, with a number].
        <br />
        <br />
        I am looking for a [role] at a [stage and type of company], ideally [remote / in city] and
        focused on [domain]. If you know of something or someone, I would love an intro. You can
        reach me at [email].
        <br />
        <br />
        Thank you to everyone who has already reached out.
      </GuideBlockquote>

      <GuideH2>Template 2: The story version</GuideH2>
      <GuideBlockquote>
        A short update, and a small ask.
        <br />
        <br />
        Last Tuesday I was part of a layoff at [Company]. I am sad to leave the team and proud of
        what we built: [one sentence on a specific shipped outcome].
        <br />
        <br />
        I am taking a couple of weeks to rest, then opening up a search for [role] roles. The
        problems I most want to work on: [two short bullets].
        <br />
        <br />
        If any of that sounds like something you are building or know someone who is, I would
        welcome the introduction. [Email].
      </GuideBlockquote>

      <GuideH2>Template 3: The pivot version</GuideH2>
      <GuideBlockquote>
        I was laid off from [Company] last month, and I am using the moment to pivot.
        <br />
        <br />
        For the last [X years] I have done [previous function], most recently focused on [specific
        area]. The skills I want to bring forward: [two bullets]. The new direction I am exploring:
        [function or industry], because [one sentence of honest reasoning].
        <br />
        <br />
        Open to conversations with anyone in [target field], hiring or not. Coffee, a 15-minute
        call, anything that helps me learn faster is welcome. [Email].
      </GuideBlockquote>

      <GuideH2>Small things that meaningfully raise the response rate</GuideH2>
      <GuideList
        items={[
          "Post on a Tuesday, Wednesday, or Thursday morning in your timezone. Engagement is noticeably higher than weekends or Mondays.",
          "Add the Open to Work green frame to your profile photo. It is the single biggest visibility lever LinkedIn gives you.",
          "Update your headline to what you do, not what you did. 'Senior Product Designer, fintech and consumer' lands better than 'Senior Product Designer at [Defunct Company]'.",
          "Reply to every comment in the first 24 hours. The algorithm rewards conversation, not just likes.",
          "Pin the post to your profile for the first two weeks.",
        ]}
      />

      <GuideH2>What to do after you post</GuideH2>
      <GuideH3>The first 48 hours</GuideH3>
      <GuideP>
        Expect a wave of well-wishes, a handful of real leads, and a few cold pitches from coaches
        and resume services. Reply warmly, log every concrete lead somewhere you will actually
        check (a tracker, not your inbox), and ignore the pitches.
      </GuideP>
      <GuideH3>The first two weeks</GuideH3>
      <GuideP>
        Send a short follow-up message to each person who offered a specific introduction or lead.
        Make it easy to help by including a one-paragraph blurb they can forward, plus your resume
        and the kind of roles you are targeting. The follow-up is where most of the actual value
        of the post gets unlocked.
      </GuideP>

      <GuideP>
        Inside Offboard, every contact who reaches out, every lead, and every intro thread becomes
        part of your career memory, attached to the role and the company. You stop losing the
        intro that came in on day three because it was buried by day fourteen. The LinkedIn post
        is the spark. The follow-through is what turns it into a job.
      </GuideP>
    </>
  );
}
