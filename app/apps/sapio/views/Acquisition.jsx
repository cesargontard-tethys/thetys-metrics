"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

import { ChartCard } from "@/app/components/ui";
import { tickStyle, tooltipProps } from "@/lib/theme";

export function Acquisition({ D }) {
  const tickInterval = (data) => Math.max(0, Math.ceil(data.length / 5) - 1);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        <ChartCard
          title="ROAS par canal"
          wide
          help="Le ROAS montre combien chaque euro de publicité vous rapporte. Si la barre dépasse la ligne rouge (1x), le canal est rentable : vous gagnez plus que vous ne dépensez. En dessous, vous perdez de l argent sur ce canal."
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={D.ro} layout="vertical">
              <XAxis type="number" tick={tickStyle} />
              <YAxis type="category" dataKey="ch" tick={tickStyle} width={55} />
              <Tooltip {...tooltipProps} />
              <ReferenceLine x={1} stroke="#8E949A" strokeDasharray="4 4" />
              <Bar dataKey="v" name="ROAS" radius={[0, 6, 6, 0]}>
                {D.ro.map((_, i) => (
                  <Cell key={i} fill="#0666EB" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="CPI vs LTV"
          help="Rouge = ce que vous payez pour acquérir un utilisateur (CPI). Vert = ce que cet utilisateur vous rapporte sur sa durée de vie (LTV). Le vert doit être au moins 3 fois plus grand que le rouge pour que le canal soit rentable."
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={D.cpiL}>
              <XAxis dataKey="ch" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <Bar
                dataKey="cpi"
                fill="#0666EB60"
                name="CPI"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="ltv"
                fill="#0666EB"
                name="LTV"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Installs par source"
          wide
          help="Ce graphique montre d où viennent vos installations chaque semaine. Chaque couleur = un canal d acquisition. L organique (gratuit) devrait représenter au moins 30% pour ne pas dépendre uniquement de la pub."
        >
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={D.instS}>
              <XAxis
                dataKey="w"
                tick={tickStyle}
                interval={tickInterval(D.instS)}
              />
              <YAxis tick={tickStyle} width={40} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="organic"
                stackId="1"
                stroke="#0666EB"
                fill="#0666EB20"
                name="Organique"
              />
              <Area
                type="monotone"
                dataKey="meta"
                stackId="1"
                stroke="#3D8BF2"
                fill="#3D8BF220"
                name="Meta"
              />
              <Area
                type="monotone"
                dataKey="google"
                stackId="1"
                stroke="#6EAAF5"
                fill="#6EAAF520"
                name="Google"
              />
              <Area
                type="monotone"
                dataKey="tiktok"
                stackId="1"
                stroke="#A0CAF8"
                fill="#A0CAF820"
                name="TikTok"
              />
              <Area
                type="monotone"
                dataKey="asa"
                stackId="1"
                stroke="#D0E4FC"
                fill="#D0E4FC15"
                name="ASA"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Rétention par canal"
          help="Ce graphique compare la qualité des utilisateurs selon leur provenance. Les barres montrent quel pourcentage revient à J1, J7 et J30. Un canal avec une bonne rétention amène des gens vraiment intéressés, pas juste des curieux."
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={D.rCh}>
              <XAxis dataKey="ch" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="d1" fill="#0666EB" name="J1" radius={[5, 5, 0, 0]} />
              <Bar dataKey="d7" fill="#3D8BF2" name="J7" radius={[5, 5, 0, 0]} />
              <Bar
                dataKey="d30"
                fill="#6EAAF5"
                name="J30"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
