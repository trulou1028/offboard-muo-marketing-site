import { GuideP, GuideH2, GuideList, GuideBlockquote } from "@/components/marketing/resources/GuideArticle";

export default function SevenLevelsAiAgentCapability() {
  return (
    <>
      <GuideP>
        Artificial intelligence is changing so fast that it is easy to get distracted by demos.
      </GuideP>
      <GuideP>
        One week, everyone is talking about a chatbot that can write code. The next week, it is a
        swarm of agents moving around a canvas. Then it is a voice assistant booking meetings,
        summarizing calls, and sending follow-ups.
      </GuideP>
      <GuideP>The surface keeps changing.</GuideP>
      <GuideP>But underneath all of it, there is a much more important question:</GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">
          What are the actual levels of AI capability, and where is all of this heading?
        </strong>
      </GuideP>
      <GuideP>
        That question matters for founders, product teams, investors, and everyday users. If you do
        not have a framework, it becomes very easy to confuse flashy interfaces with meaningful
        leaps in intelligence.
      </GuideP>
      <GuideP>
        At Offboard, we spend a lot of time thinking about this because job search is one of the
        clearest examples of where AI should go next. A job search is not a single task. It is a
        messy, emotional, multi-week mission full of changing conditions, missed signals, deadlines,
        self-doubt, and constant reprioritization.
      </GuideP>
      <GuideP>That makes it a great lens for thinking about the future of AI agents.</GuideP>
      <GuideP>Here is the framework I keep coming back to.</GuideP>

      <GuideH2>Level 1: Intelligence</GuideH2>
      <GuideP>This is the foundation.</GuideP>
      <GuideP>
        Large language models brought us a new kind of software primitive: systems that can
        understand language, reason through problems, generate content, summarize, explain, and
        answer questions.
      </GuideP>
      <GuideP>This first level is about knowledge and reasoning.</GuideP>
      <GuideP>An AI at this level can:</GuideP>
      <GuideList
        items={[
          "answer a question",
          "draft a message",
          "summarize a document",
          "brainstorm ideas",
          "explain a concept",
          "generate code or content",
        ]}
      />
      <GuideP>
        This is the level most people first encountered with ChatGPT and similar products.
      </GuideP>
      <GuideP>
        It was a huge breakthrough, but it is still mostly passive. The model waits for the user to
        ask for something.
      </GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">In simple terms: it knows.</strong>
      </GuideP>

      <GuideH2>Level 2: Agency</GuideH2>
      <GuideP>
        The second level is where AI begins to <em className="italic">do</em> things, not just say
        things.
      </GuideP>
      <GuideP>
        An agent combines intelligence with tool use. It can access software, browse the web, call
        APIs, update records, send drafts, read files, schedule actions, or manipulate a user
        interface.
      </GuideP>
      <GuideP>This is where AI starts to feel useful in a more concrete way.</GuideP>
      <GuideP>An agent at this level can:</GuideP>
      <GuideList
        items={[
          "research across multiple sources",
          "update a CRM",
          "draft and send outreach",
          "modify a calendar or task list",
          "read and analyze uploaded files",
          "take action inside software tools",
        ]}
      />
      <GuideP>
        This is the category most people mean when they say &ldquo;AI agent&rdquo; today.
      </GuideP>
      <GuideP>The common mental model is:</GuideP>
      <GuideBlockquote>LLM + tools = agent</GuideBlockquote>
      <GuideP>That is a decent shorthand.</GuideP>
      <GuideP>
        But this level is still often episodic. The agent handles a task or a session, then stops.
      </GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">In simple terms: it acts.</strong>
      </GuideP>

      <GuideH2>Level 3: Persistence</GuideH2>
      <GuideP>This is where things start to get much more interesting.</GuideP>
      <GuideP>
        A persistent agent does not just complete a task and disappear. It stays connected to the
        problem over time.
      </GuideP>
      <GuideP>
        It remembers the goal. It retains state. It can carry context across sessions. It does not
        need to be fully re-briefed every time.
      </GuideP>
      <GuideP>This is the difference between:</GuideP>
      <GuideList
        items={[
          "“Help me draft this message”",
          "“Help me keep making progress on this mission over the next six weeks”",
        ]}
      />
      <GuideP>A persistent agent can:</GuideP>
      <GuideList
        items={[
          "track progress over time",
          "remember what matters",
          "carry unfinished work forward",
          "maintain continuity across sessions",
          "stay oriented around an outcome rather than a single prompt",
        ]}
      />
      <GuideP>This is a major shift.</GuideP>
      <GuideP>
        Most AI today is still task-based. Persistence is where AI starts to become longitudinal.
      </GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">
          In simple terms: it stays with the problem.
        </strong>
      </GuideP>

      <GuideH2>Level 4: Adaptation</GuideH2>
      <GuideP>Persistence alone is not enough.</GuideP>
      <GuideP>A system can remember context and still be dumb about what to do next.</GuideP>
      <GuideP>
        The next level is adaptation: the ability to change strategy as conditions change.
      </GuideP>
      <GuideP>
        An adaptive agent does not just keep going. It learns from what is happening and adjusts.
      </GuideP>
      <GuideP>That means it can notice things like:</GuideP>
      <GuideList
        items={[
          "the current strategy is not working",
          "a deadline is becoming urgent",
          "the user is losing momentum",
          "the environment has changed",
          "a better path has opened up",
          "the goal is the same, but the plan should change",
        ]}
      />
      <GuideP>
        This is the level where AI begins to feel less like automation and more like judgment.
      </GuideP>
      <GuideP>
        A lot of people describe the future of AI as &ldquo;more autonomous.&rdquo; That is part of
        it. But autonomy without adaptation is overrated. What matters is not that the system keeps
        moving. It is that it knows how to change course intelligently.
      </GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">In simple terms: it adjusts.</strong>
      </GuideP>

      <GuideH2>Level 5: Orchestration</GuideH2>
      <GuideP>Once you have persistence and adaptation, the next leap is orchestration.</GuideP>
      <GuideP>
        This is where multiple workflows, tools, or specialized agents work together under one
        higher-level objective.
      </GuideP>
      <GuideP>
        We are already seeing early versions of this. Some products let you deploy multiple agents
        in parallel. Others split work across research, planning, writing, design, or code
        generation. In some cases, you can literally watch multiple agent cursors moving around a
        canvas or see several research threads being executed at once.
      </GuideP>
      <GuideP>That is not just a gimmick.</GuideP>
      <GuideP>
        It points to a future where AI is not one general helper, but a coordinated system of
        specialists.
      </GuideP>
      <GuideP>An orchestrated system can:</GuideP>
      <GuideList
        items={[
          "divide work across specialized agents",
          "run parallel research or execution paths",
          "combine findings into one recommendation",
          "coordinate multiple moving parts under one mission",
          "prioritize which sub-problem matters most right now",
        ]}
      />
      <GuideP>
        <strong className="font-semibold text-foreground">In simple terms: it coordinates.</strong>
      </GuideP>

      <GuideH2>Level 6: Anticipation</GuideH2>
      <GuideP>This is where the framework starts to move from useful to truly strategic.</GuideP>
      <GuideP>
        An anticipatory system does not just respond to what has happened. It models what is likely
        to happen next and helps shape the path before problems fully emerge.
      </GuideP>
      <GuideP>This is the beginning of something closer to a world model.</GuideP>
      <GuideP>An anticipatory agent can:</GuideP>
      <GuideList
        items={[
          "infer which path has a higher chance of success",
          "detect likely bottlenecks before they become obvious",
          "simulate tradeoffs between different approaches",
          "predict which actions matter most right now",
          "recommend pivots before the user loses too much time",
        ]}
      />
      <GuideP>This is a very different experience from basic AI assistance.</GuideP>
      <GuideP>
        Instead of saying, &ldquo;Here is the answer to your question,&rdquo; it starts saying,
        &ldquo;Given everything I know about your goal, your environment, and the outcomes so far, I
        think path B now has a better expected return than path A.&rdquo;
      </GuideP>
      <GuideP>That is a serious jump.</GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">
          In simple terms: it chooses ahead.
        </strong>
      </GuideP>

      <GuideH2>Level 7: Collective Learning</GuideH2>
      <GuideP>The final level in this framework is collective learning.</GuideP>
      <GuideP>
        This is where the system improves not just from one user&apos;s history, but from patterns
        across many users, workflows, and outcomes.
      </GuideP>
      <GuideP>
        At this level, the AI is no longer just helping a person in the moment. It is building a
        domain-specific intelligence layer.
      </GuideP>
      <GuideP>A system with collective learning can:</GuideP>
      <GuideList
        items={[
          "learn which behaviors lead to the best outcomes",
          "identify patterns across many users and cases",
          "improve recommendations based on real-world feedback",
          "create better playbooks over time",
          "compound value as usage grows",
        ]}
      />
      <GuideP>This is where real defensibility starts to appear.</GuideP>
      <GuideP>
        It is also where the gap between generic AI wrappers and category-defining products gets
        much bigger.
      </GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">In simple terms: it compounds.</strong>
      </GuideP>

      <GuideH2>Why this framework matters</GuideH2>
      <GuideP>
        A lot of AI product conversations get stuck because people mix up these levels.
      </GuideP>
      <GuideP>
        A company will say they have an &ldquo;agent,&rdquo; but what they really have is a smart
        content generator with a few triggers.
      </GuideP>
      <GuideP>
        Another company will show a multi-agent demo, but it still lacks persistence. It looks
        impressive in the moment, yet has no real continuity.
      </GuideP>
      <GuideP>
        Another tool may remember context, but it does not adapt when the situation changes.
      </GuideP>
      <GuideP>These are not all the same thing.</GuideP>
      <GuideP>That is why having a framework matters.</GuideP>
      <GuideP>It helps you ask better questions:</GuideP>
      <GuideList
        items={[
          "Is this system just intelligent, or is it agentic?",
          "Is it agentic, or is it persistent?",
          "Is it persistent, or is it adaptive?",
          "Is it adaptive, or can it orchestrate?",
          "Can it anticipate, or does it only react?",
          "Does it learn across outcomes, or does it reset every time?",
        ]}
      />
      <GuideP>That is how you separate novelty from actual capability.</GuideP>

      <GuideH2>The Roz test</GuideH2>
      <GuideP>
        One of my favorite analogies for this came from <em className="italic">The Wild Robot</em>.
      </GuideP>
      <GuideP>
        Roz is interesting not because she can perform tasks. She is interesting because she locks
        onto a mission, adapts to a changing world, and keeps working toward the outcome through
        hundreds of sub-tasks.
      </GuideP>
      <GuideP>She does not just need a new prompt every few minutes.</GuideP>
      <GuideP>She stays oriented around the mission.</GuideP>
      <GuideP>That is a useful benchmark for where AI is heading.</GuideP>
      <GuideP>
        The best AI systems of the future will not just be smart tools. They will feel more like
        mission-aware systems that can stay grounded in an objective, adjust to changing conditions,
        and keep making progress over time.
      </GuideP>
      <GuideP>
        That does not mean humans disappear from the loop. In many cases, quite the opposite. As AI
        becomes more powerful, trust, control, and judgment will matter even more. The systems that
        win will likely be the ones that feel collaborative, transparent, and aligned, not just
        hyper-automated.
      </GuideP>

      <GuideH2>What this means for the future of job search</GuideH2>
      <GuideP>Job search is one of the clearest areas where this evolution matters.</GuideP>
      <GuideP>
        The old process of applying cold through job boards is already under pressure. Recruiters
        are overloaded. Job seekers are overwhelmed. More of the process is fragmenting across
        referrals, communities, personal brands, direct outreach, AI-assisted applications, and
        internal talent networks.
      </GuideP>
      <GuideP>In that world, a basic assistant is not enough.</GuideP>
      <GuideP>
        Job seekers do not just need a chatbot that can rewrite a resume. They need help navigating
        a mission.
      </GuideP>
      <GuideP>That mission includes:</GuideP>
      <GuideList
        items={[
          "choosing which roles are actually worth pursuing",
          "deciding where to spend limited time and energy",
          "adjusting strategy based on traction or lack of traction",
          "preparing for interviews",
          "managing emotional momentum",
          "balancing ideal roles against financial urgency",
          "keeping all of the moving parts organized across weeks or months",
        ]}
      />
      <GuideP>
        That is why we believe the future is not just AI assistance. It is adaptive, persistent AI
        that can help users manage a real-life transition.
      </GuideP>

      <GuideH2>Final thought</GuideH2>
      <GuideP>AI is not evolving in one straight line.</GuideP>
      <GuideP>
        It is expanding across several dimensions at once: intelligence, action, persistence,
        adaptation, coordination, anticipation, and learning.
      </GuideP>
      <GuideP>But if I had to simplify the path, I would say it like this:</GuideP>
      <GuideList
        items={[
          <>
            <strong className="font-semibold text-foreground">Intelligence</strong> means AI knows.
          </>,
          <>
            <strong className="font-semibold text-foreground">Agency</strong> means AI acts.
          </>,
          <>
            <strong className="font-semibold text-foreground">Persistence</strong> means AI stays
            with the problem.
          </>,
          <>
            <strong className="font-semibold text-foreground">Adaptation</strong> means AI changes
            strategy.
          </>,
          <>
            <strong className="font-semibold text-foreground">Orchestration</strong> means AI
            coordinates many moving parts.
          </>,
          <>
            <strong className="font-semibold text-foreground">Anticipation</strong> means AI sees
            around corners.
          </>,
          <>
            <strong className="font-semibold text-foreground">Collective learning</strong> means AI
            gets better across outcomes.
          </>,
        ]}
      />
      <GuideP>That is the ladder.</GuideP>
      <GuideP>
        And the products that matter most in the next few years will probably not be the ones with
        the flashiest demo. They will be the ones that move meaningfully up that ladder in ways that
        solve real human problems.
      </GuideP>
      <GuideP>At Offboard, that is the direction we are building toward.</GuideP>
      <GuideP>Not just AI that answers.</GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">AI that stays with the mission.</strong>
      </GuideP>
      <GuideP>
        <em className="italic">
          If you&apos;re navigating a layoff or job search and want an AI system built for the full
          journey, not just isolated tasks, Offboard is building exactly that.
        </em>
      </GuideP>
    </>
  );
}
