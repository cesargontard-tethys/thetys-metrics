"use client";

import { MetricCard, ChartCard, Funnel } from "@/app/components/ui";
import { scoreHigherIsBetter, scoreLowerIsBetter } from "@/lib/utils";

export function Journey({ D }) {
  const m = D.m;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <MetricCard
          label="Vies: retour J+1"
          value={m.liveBack}
          sub="Reviennent après perte de vies"
          status={scoreHigherIsBetter(parseInt(m.liveBack), 40, 25)}
        />
        <MetricCard
          label="Vies: churn definitif"
          value={m.liveGone}
          sub="Ne reviennent jamais"
          status={scoreLowerIsBetter(parseInt(m.liveGone), 30, 50)}
        />
        <MetricCard
          label="Temps avant 0 vies"
          value={m.liveTime}
          sub="Temps moyen avant perte totale"
          status="info"
        />
        <MetricCard
          label="Clic vidéo = 1 vie"
          value={m.liveVidéo}
          sub="Regardent une pub pour une vie"
          status={scoreHigherIsBetter(parseInt(m.liveVidéo), 40, 25)}
        />
        <MetricCard
          label="Clic Vies illimitees"
          value={m.liveUnlim}
          sub="CTA premium sur perte vies"
          status={scoreHigherIsBetter(parseInt(m.liveUnlim), 50, 30)}
        />
      </div>

      <ChartCard
        title="Parcours Organique"
        help="Ce funnel montre le parcours complet d un utilisateur organique (qui vous découvre naturellement). Chaque barre = une étape, de la découverte sur l App Store jusqu à J30. Les badges rouges signalent les plus grosses pertes."
        wide
      >
        <Funnel data={D.jOrg} accent="#0666EB" />
      </ChartCard>

      <div style={{ height: 16 }} />

      <ChartCard
        title="Parcours Paid Ads"
        help="Ce funnel montre le parcours d un utilisateur provenant de la publicité. Le volume est plus important mais la qualité est inférieure : moins de complétion d onboarding, moins de rétention, LTV plus faible."
        wide
      >
        <Funnel data={D.jPaid} accent="#3D8BF2" />
      </ChartCard>
    </div>
  );
}
