import { Suspense } from "react";

import { OverviewCards } from "@/src/components/dashboard/overview-cards";
import { PlannerPreview } from "@/src/components/dashboard/planner-preview";
import { SuggestionsPanel } from "@/src/components/dashboard/suggestions-panel";

export default function AppHomePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <OverviewCards />
        <Suspense fallback={<div className="rounded-lg border border-dashed p-6">Loading planner…</div>}>
          <PlannerPreview />
        </Suspense>
      </div>
      <Suspense fallback={<div className="rounded-lg border border-dashed p-6">Loading suggestions…</div>}>
        <SuggestionsPanel />
      </Suspense>
    </div>
  );
}
