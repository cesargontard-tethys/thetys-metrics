"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

import { MetricCard, ChartCard, Funnel } from "@/app/components/ui";
import { tickStyle, tooltipProps } from "@/lib/theme";
import { scoreHigherIsBetter } from "@/lib/utils";

export function Onboarding({ D }) {
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
          label="Complétion"
          value={m.onb}
          sub="Bench: 55-70%"
          status={scoreHigherIsBetter(parseInt(m.onb), 55)}
        />
        <MetricCard
          label="Skip vidéo"
          value="68%"
          status="bad"
          sub="Bench: moins de 30%"
        />
        <MetricCard
          label="Push opt-in"
          value="47%"
          status="warn"
          sub="Bench: plus de 55%"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        <ChartCard
          title="Funnel onboarding"
          help="Ce funnel montre chaque étape de l onboarding et combien d utilisateurs passent à la suivante. Les badges rouges signalent les étapes où vous perdez le plus de monde. C est là qu il faut concentrer vos efforts d amélioration."
        >
          <Funnel data={D.oF} />
        </ChartCard>

        <ChartCard
          title="Réussite quiz"
          help="Chaque barre montre le taux de réussite d une question du quiz d onboarding. Si une barre est sous la ligne rouge (50%), la question est trop dure pour un premier contact. Les nouveaux utilisateurs se découragent et quittent l app."
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={D.qz}>
              <XAxis dataKey="q" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} domain={[0, 100]} />
              <Tooltip {...tooltipProps} />
              <ReferenceLine y={50} stroke="#8E949A" strokeDasharray="4 4" />
              <Bar dataKey="v" name="Réussite %" radius={[6, 6, 0, 0]}>
                {D.qz.map((_, i) => (
                  <Cell key={i} fill="#0666EB" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
