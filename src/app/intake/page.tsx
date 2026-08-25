import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing/homepage/MarketingSite";
import { IntakeForm } from "@/components/marketing/intake/IntakeForm";

export const metadata: Metadata = {
  title: "Intake | Offboard",
  description:
    "Tell us a bit about your offboarding story. Our team reviews every intake and reaches out directly.",
};

export default function Page() {
  return (
    <MarketingShell current="intake">
      <main id="main-content">
        <section className="mh-section mh-intake-page">
          <IntakeForm />
        </section>
      </main>
    </MarketingShell>
  );
}
