"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ChartCard, Note } from "@/app/components/ui";
import { tickStyle, tooltipProps } from "@/lib/theme";

export function Overview({ D }) {
  const tickInterval = Math.max(0, Math.ceil(D.sample.length / 5) - 1);

  return (
    <div>
      <Note
        type="info"
        text="App Vestige — squelette en place. Ajoutez vos métriques dans app/apps/vestige/data.js et créez des vues dans app/apps/vestige/views/."
      />

      <div style={{ height: 16 }} />

      <ChartCard
        title="Échantillon"
        wide
        help="Donnée placeholder pour valider le pipeline. Remplacer par vos vraies métriques."
      >
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={D.sample}>
            <XAxis dataKey="d" tick={tickStyle} interval={tickInterval} />
            <YAxis tick={tickStyle} width={40} />
            <Tooltip {...tooltipProps} />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#7C3AED"
              fill="#7C3AED20"
              strokeWidth={2}
              name="Échantillon"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
