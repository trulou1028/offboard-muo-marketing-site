import { GuideH2, GuideP, GuideList, GuideCallout } from "@/components/marketing/resources/GuideArticle";

export default function WillEmployersKnowCoverLetterIsAi() {
  return (
    <>
      <GuideP>
        Short answer: most employers do not run cover letters through AI detectors, the detectors
        that exist are unreliable, and the real risk of an AI-written cover letter is not getting
        caught. It is sounding like everyone else. Here is what actually happens on the other side
        of the application, and how to use AI without sabotaging your shot.
      </GuideP>

      <GuideH2>Do companies actually check?</GuideH2>
      <GuideP>
        For the vast majority of roles, no one is running your cover letter through GPTZero or
        Originality.ai. Recruiters are reading dozens to hundreds of applications a day. They do
        not have time to copy paste each cover letter into a detector, and most ATS platforms do
        not include AI detection out of the box.
      </GuideP>
      <GuideP>
        There are exceptions. Some academic, government, and consulting roles run formal integrity
        checks. A small but growing number of large employers use ATS features that flag suspected
        AI text. If you are applying to one of those, assume your letter will be screened. For
        everyone else, the question is not whether you will get caught, it is whether your letter
        will stand out.
      </GuideP>

      <GuideH2>Why AI detectors do not really work</GuideH2>
      <GuideP>
        AI detection tools claim accuracy rates of 95% or higher. In practice, peer-reviewed
        studies and the tools' own disclaimers tell a different story.
      </GuideP>
      <GuideList
        items={[
          "False positives are common. Detectors regularly flag human-written text, especially from non-native English speakers, as AI-generated.",
          "False negatives are easy. Light editing, asking the model for a different tone, or paraphrasing a single paragraph can drop detection confidence below the threshold.",
          "OpenAI shut down its own AI classifier in 2023 because it could not deliver reliable results. The third-party tools have not solved the problem since.",
        ]}
      />
      <GuideP>
        A flag from a detector is rarely treated as a hiring veto. It is at most one signal among
        many, and most recruiters know not to rely on it alone.
      </GuideP>

      <GuideH2>What actually gets you screened out</GuideH2>
      <GuideP>
        The real giveaway is not formatting or word choice. It is content that could have been
        written about any company. The AI tell is generic. Lines like "I am excited about this
        opportunity to contribute to your innovative team" land identically in every inbox and
        signal nothing about you or this role.
      </GuideP>

      <GuideCallout title="The actual filter">
        Recruiters do not need a detector to spot AI cover letters. They spot the ones that say
        nothing specific. A letter that names the team's recent product launch, references a
        problem you know they are working on, or ties one of your concrete wins to their next
        quarter, those land regardless of how they were drafted.
      </GuideCallout>

      <GuideH2>How to use AI without sounding like AI</GuideH2>
      <GuideList
        ordered
        items={[
          "Start from your own material. Paste your resume, your notes about the company, and the job description into the model. A cover letter generated from your real work history reads as yours; one generated from the job description alone reads as generic.",
          "Replace at least one paragraph by hand. The opening or the closing is best. Make it about something concrete: a specific reason you applied, a person you met, a product you used.",
          "Cut every sentence that could appear in someone else's letter. If you can change the company name and the line still works for any company, delete it.",
          "Read it out loud. AI prose tends to over-hedge and over-qualify. Trim the soft openers (I believe, I think, perhaps) and the marketing words (innovative, dynamic, passionate).",
          "Keep it short. Three short paragraphs that say something specific beat five polished paragraphs that say nothing.",
        ]}
      />

      <GuideH2>The rules to know</GuideH2>
      <GuideP>
        A handful of employers and most US federal agencies now ask you to disclose if AI was used
        to write your application. If the application asks, answer honestly. The disclosure is
        almost never disqualifying on its own, but lying about it can be. Read the application
        instructions before you submit.
      </GuideP>

      <GuideH2>The honest bottom line</GuideH2>
      <GuideP>
        Most employers will not detect an AI-written cover letter. They will detect a generic one.
        Use AI to overcome the blank page, then spend ten minutes making the letter specifically
        yours, specifically about them, and specifically shorter than it started. That is the
        version that gets read.
      </GuideP>
      <GuideP>
        Offboard's cover letter generator starts from your career memory and the role you are
        applying to, then asks you to add one specific thing only you could write. The point is
        not to bypass detection. It is to make sure the letter sounds like you on your best day,
        every time.
      </GuideP>
    </>
  );
}
