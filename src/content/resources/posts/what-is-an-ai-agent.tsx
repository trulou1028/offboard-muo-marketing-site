import { GuideH2, GuideH3, GuideList, GuideP } from "@/components/marketing/resources/GuideArticle";

export default function WhatIsAnAiAgent() {
  return (
    <>
      <GuideP>
        If you have spent any time around AI lately, you have probably heard the word{" "}
        <em className="italic">agent</em> thrown around constantly. AI agents are suddenly
        everywhere. One company says their agent can research and write reports. Another says their
        agents can book meetings, update CRM records, and send follow-ups. Meanwhile, plenty of
        products that are really just chatbots or automation tools are also being marketed as
        agents.
      </GuideP>
      <GuideP>
        So what actually counts as an AI agent? And what are the different types of AI agents people
        are talking about?
      </GuideP>

      <GuideH2>What is an AI agent?</GuideH2>
      <GuideP>
        An AI agent is a software system that can understand a goal, perceive context, reason about
        what to do, and take actions to move toward that goal. That is what separates an agent from
        a basic chatbot.
      </GuideP>
      <GuideP>A chatbot mostly responds to prompts. An agent can take action.</GuideP>
      <GuideP>The strongest current definitions all point in roughly the same direction:</GuideP>
      <GuideList
        items={[
          <>
            <strong className="font-semibold text-foreground">Anthropic</strong> distinguishes
            between workflows, where code determines the path, and agents, where the model
            dynamically directs its own process and tool use.
          </>,
          <>
            <strong className="font-semibold text-foreground">Google Cloud</strong> defines AI
            agents as systems that pursue goals on behalf of users and show reasoning, planning,
            memory, and some autonomy.
          </>,
          <>
            <strong className="font-semibold text-foreground">Microsoft</strong> describes an agent
            as a system that perceives its environment through inputs and takes actions to achieve a
            defined objective.
          </>,
          <>
            <strong className="font-semibold text-foreground">IBM</strong> defines AI agents as
            systems capable of autonomously performing tasks on behalf of a user or another system.
          </>,
        ]}
      />
      <GuideP>
        Put simply:{" "}
        <strong className="font-semibold text-foreground">
          An AI agent is not just something that talks. It is something that can decide and do.
        </strong>
      </GuideP>

      <GuideH2>AI agent vs chatbot vs automation</GuideH2>
      <GuideP>This is where a lot of confusion comes from.</GuideP>

      <GuideH3>Chatbot</GuideH3>
      <GuideP>
        A chatbot is mainly designed to respond to user input in conversation. Examples:
      </GuideP>
      <GuideList
        items={[
          "Answering questions",
          "Summarizing text",
          "Drafting messages",
          "Explaining concepts",
        ]}
      />
      <GuideP>A chatbot may feel smart, but it usually stops at the response.</GuideP>

      <GuideH3>Automation</GuideH3>
      <GuideP>Automation follows predefined rules. Examples:</GuideP>
      <GuideList
        items={[
          "If a form is submitted, send an email",
          "If a lead changes stage, assign a task",
          "If a meeting is booked, create a calendar event",
        ]}
      />
      <GuideP>
        Automation is powerful, but it is not intelligent in the same way. It typically does not
        reason through a situation in real time.
      </GuideP>

      <GuideH3>AI agent</GuideH3>
      <GuideP>An AI agent combines intelligence with action. Examples:</GuideP>
      <GuideList
        items={[
          "Research a company, summarize findings, and draft a tailored outreach email",
          "Read an incoming email, decide whether it is urgent, and route it appropriately",
          "Review a job posting, compare it to your background, and recommend whether it is worth pursuing",
        ]}
      />
      <GuideP>
        The important distinction is that an agent is working toward an objective, not just firing a
        rule or replying with text.
      </GuideP>

      <GuideH2>How do AI agents work?</GuideH2>
      <GuideP>Most modern AI agents follow some version of a loop like this:</GuideP>
      <GuideList
        ordered
        items={[
          "Observe the current situation or inputs",
          "Reason about what matters",
          "Plan the next step or sequence of steps",
          "Act using available tools",
          "Review the result and adjust if needed",
        ]}
      />
      <GuideP>
        Microsoft describes AI agents as following a perception-reasoning-action loop, and Google
        highlights reasoning, acting, observing, and planning as core features. More advanced
        systems also add memory, collaboration, and self-refinement.
      </GuideP>
      <GuideP>
        In plain English: an agent looks at the situation, decides what to do, does it, sees what
        happened, and keeps going if needed.
      </GuideP>

      <GuideH2>The classic 5 types of AI agents</GuideH2>
      <GuideP>
        If you search for &ldquo;different types of AI agents,&rdquo; you will often find the
        classic AI taxonomy. IBM summarizes five main types:
      </GuideP>

      <GuideH3>1. Simple reflex agents</GuideH3>
      <GuideP>
        These are the most basic. They respond directly to current conditions using fixed rules.
        Examples:
      </GuideP>
      <GuideList
        items={[
          "A thermostat turning heat on or off based on temperature",
          "A basic spam filter blocking messages based on predefined patterns",
        ]}
      />
      <GuideP>
        These systems are useful in predictable environments, but they do not remember the past or
        plan for the future.
      </GuideP>

      <GuideH3>2. Model-based reflex agents</GuideH3>
      <GuideP>
        These agents still use rules, but they also maintain an internal model of the world. That
        means they can track state, not just immediate input. Examples:
      </GuideP>
      <GuideList
        items={[
          "A robot vacuum that remembers which areas it has already cleaned",
          "A navigation system that tracks known obstacles and room layout",
        ]}
      />
      <GuideP>Best for: stateful environments where memory matters.</GuideP>

      <GuideH3>3. Goal-based agents</GuideH3>
      <GuideP>
        These agents evaluate actions based on whether they help achieve a goal. Examples:
      </GuideP>
      <GuideList
        items={[
          "A route planner trying to find the best way to get from point A to point B",
          "A sales assistant agent trying to move a lead toward a booked demo",
        ]}
      />
      <GuideP>
        Goal-based agents are more flexible because they are not only reacting. They are choosing
        actions in service of an objective.
      </GuideP>

      <GuideH3>4. Utility-based agents</GuideH3>
      <GuideP>
        These agents do not just ask, &ldquo;Does this help achieve the goal?&rdquo; They ask,
        &ldquo;Which option is best among competing tradeoffs?&rdquo; Examples:
      </GuideP>
      <GuideList
        items={[
          "A delivery system balancing speed, fuel cost, and reliability",
          "An AI assistant deciding whether to interrupt you now or wait until later based on urgency and context",
        ]}
      />
      <GuideP>Best for: optimization under competing priorities.</GuideP>

      <GuideH3>5. Learning agents</GuideH3>
      <GuideP>These agents improve over time based on experience and feedback. Examples:</GuideP>
      <GuideList
        items={[
          "Recommendation systems that improve as users interact with them",
          "Fraud detection systems that get better as they see more examples",
          "Assistants that learn which actions are most useful in a given workflow",
        ]}
      />
      <GuideP>A learning agent is not stuck with the same rules forever. It adapts.</GuideP>

      <GuideH2>The modern types people actually mean</GuideH2>
      <GuideP>
        The classic taxonomy is still useful, but in practice most people talking about AI agents
        today mean a more modern set of categories. Here is a simpler practical breakdown.
      </GuideP>

      <GuideH3>1. Prompt-and-response agents</GuideH3>
      <GuideP>
        The lightest version. They take in a prompt and produce a useful result, sometimes with some
        tool use, but they are still fairly session-based. Examples:
      </GuideP>
      <GuideList
        items={["A writing assistant", "A meeting-note summarizer", "A customer-support responder"]}
      />

      <GuideH3>2. Workflow agents</GuideH3>
      <GuideP>
        These operate within predefined paths. Anthropic makes an important distinction here:
        workflows are agentic systems where the LLM and tools are orchestrated through predefined
        code paths, while true agents dynamically direct their own process. Examples:
      </GuideP>
      <GuideList
        items={[
          "A support flow that always classifies, drafts, escalates, and logs in the same order",
          "A hiring flow that always reviews a resume, scores fit, and drafts follow-up questions",
        ]}
      />
      <GuideP>
        Workflow agents can be very effective and often more predictable than open-ended agents.
      </GuideP>

      <GuideH3>3. Tool-using agents</GuideH3>
      <GuideP>
        These are the systems most people picture when they hear &ldquo;AI agent.&rdquo; They can
        call tools like web search, APIs, calendars, CRMs, file systems, and internal databases.
        Examples:
      </GuideP>
      <GuideList
        items={[
          "An agent that researches prospects and updates a CRM",
          "An agent that reads a contract and flags unusual clauses",
          "An agent that analyzes job descriptions and drafts tailored outreach",
        ]}
      />

      <GuideH3>4. Multi-agent systems</GuideH3>
      <GuideP>
        These systems use multiple agents that each specialize in a different part of a task. One
        agent might research. Another might write. Another might validate findings. Examples:
      </GuideP>
      <GuideList
        items={[
          "A design tool where multiple agents build different parts of a prototype",
          "A research system where several agents gather evidence in parallel and one synthesizes the answer",
        ]}
      />

      <GuideH3>5. Persistent agents</GuideH3>
      <GuideP>
        These agents work over time, not just in one session. They remember the goal, retain state,
        and carry work forward across days or weeks. Examples:
      </GuideP>
      <GuideList
        items={[
          "An agent managing an ongoing job search",
          "An agent helping a founder prepare for fundraising over several weeks",
          "An agent guiding a customer-success process from onboarding through renewal",
        ]}
      />

      <GuideH3>6. Adaptive agents</GuideH3>
      <GuideP>
        These agents do not just continue over time. They also change strategy based on what is
        happening:
      </GuideP>
      <GuideList
        items={[
          "An agent that notices outreach is not getting replies and shifts the playbook",
          "An agent that sees interview traction but no offers and pivots toward interview coaching",
          "An agent that reprioritizes based on urgency, feedback, or changing constraints",
        ]}
      />
      <GuideP>This is where AI starts to feel more strategic.</GuideP>

      <GuideH2>What makes an AI agent good?</GuideH2>
      <GuideP>
        Not every AI agent is good just because it can call tools. The most useful agents usually
        have a few things in common:
      </GuideP>
      <GuideList
        items={[
          <>
            <strong className="font-semibold text-foreground">Clear goals</strong> - If the
            objective is vague, the output often gets vague too.
          </>,
          <>
            <strong className="font-semibold text-foreground">The right tools</strong> - An agent is
            only as useful as the systems it can access.
          </>,
          <>
            <strong className="font-semibold text-foreground">Strong context</strong> - Agents need
            the right information at the right time.
          </>,
          <>
            <strong className="font-semibold text-foreground">Memory or state</strong> - Many
            real-world tasks require continuity.
          </>,
          <>
            <strong className="font-semibold text-foreground">Feedback loops</strong> - The agent
            should be able to learn what worked.
          </>,
          <>
            <strong className="font-semibold text-foreground">Guardrails</strong> - Human oversight,
            permissions, and limits matter a lot.
          </>,
        ]}
      />
      <GuideP>
        Anthropic explicitly recommends starting with the simplest possible solution and only
        increasing complexity when needed, because more agentic systems often trade predictability,
        latency, and cost for flexibility.
      </GuideP>

      <GuideH2>When should you use an AI agent?</GuideH2>
      <GuideP>Use an AI agent when the job:</GuideP>
      <GuideList
        items={[
          "Has multiple steps",
          "Benefits from reasoning and tool use",
          "Changes based on context",
          "Requires flexibility rather than rigid rules",
          "Has a clear enough objective to guide decisions",
        ]}
      />
      <GuideP>
        Examples: sales prospecting, customer support triage, recruiting coordination, financial
        analysis, research and reporting, job search management.
      </GuideP>
      <GuideP>
        Do not assume you need an agent when a simple prompt, retrieval system, or workflow
        automation would do the job more reliably and cheaply.
      </GuideP>

      <GuideH2>Why AI agents matter</GuideH2>
      <GuideP>
        AI agents matter because they shift software from passive tools to active systems. Instead
        of just helping you think, they can help you move.
      </GuideP>
      <GuideP>
        That does not mean every agent should be fully autonomous. But it does mean software is
        starting to move from:
      </GuideP>
      <GuideList items={["Answering", "To assisting", "To acting", "To adapting"]} />
      <GuideP>That is a major shift.</GuideP>

      <GuideH2>Final takeaway</GuideH2>
      <GuideP>If you remember one thing, make it this:</GuideP>
      <GuideP>
        <strong className="font-semibold text-foreground">
          A chatbot talks. Automation follows rules. An AI agent works toward a goal.
        </strong>
      </GuideP>
      <GuideP>
        And as AI keeps improving, the most important differences between agents will come down to a
        few key questions:
      </GuideP>
      <GuideList
        items={[
          "Can it take action?",
          "Can it use tools?",
          "Can it remember context?",
          "Can it adapt?",
          "Can it coordinate multiple steps or agents?",
          "Can it improve over time?",
        ]}
      />
      <GuideP>
        Those are the questions that separate a flashy demo from a genuinely useful system. At
        Offboard, we think that distinction matters a lot - especially in areas like job search,
        where people do not just need answers. They need systems that can help them manage a mission
        over time.
      </GuideP>
    </>
  );
}
