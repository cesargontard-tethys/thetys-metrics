"use client";

import {
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { MetricCard, ChartCard } from "@/app/components/ui";
import { colors, tickStyle, tooltipProps } from "@/lib/theme";
import { scoreHigherIsBetter } from "@/lib/utils";

export function Engagement({ D }) {
  const m = D.m;
  const tickInterval = (data) => Math.max(0, Math.ceil(data.length / 5) - 1);

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
          label="Leçons/j"
          value={m.sess}
          sub="Bench: 1.5-3"
          status={scoreHigherIsBetter(parseFloat(m.sess), 1.5)}
        />
        <MetricCard
          label="Accuracy"
          value={m.acc}
          sub="Zone idéale: 65-75%"
          status={scoreHigherIsBetter(parseInt(m.acc), 65, 55)}
        />
        <MetricCard
          label="Leçons / joueur"
          value={m.lesUser}
          sub="Moyenne totale par utilisateur"
          status={scoreHigherIsBetter(parseFloat(m.lesUser), 12, 6)}
        />
        <MetricCard
          label="Leçons 1ère session"
          value="1.8"
          status={scoreHigherIsBetter(1.8, 2, 1)}
          sub="Bench: 2-3"
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
          title="Leçons/jour et Accuracy"
          wide
          help="Barres = leçons par user. Courbe = taux de réussite. Si les barres montent mais la courbe descend, la difficulté est mal calibree."
        >
          <ResponsiveContainer width="100%" height={180}>
            <ComposedChart data={D.engD}>
              <XAxis
                dataKey="d"
                tick={tickStyle}
                interval={tickInterval(D.engD)}
              />
              <YAxis yAxisId="l" tick={tickStyle} width={30} />
              <YAxis
                yAxisId="r"
                orientation="right"
                tick={tickStyle}
                width={30}
                domain={[40, 90]}
              />
              <Tooltip {...tooltipProps} />
              <Bar
                yAxisId="l"
                dataKey="les"
                fill={`${colors.o1}50`}
                name="Leçons"
                radius={[5, 5, 0, 0]}
              />
              <Line
                yAxisId="r"
                type="monotone"
                dataKey="acc"
                stroke={colors.good}
                name="Réussite %"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Réussite par format"
          help="Chaque barre représente un type de question et son taux de réussite. Vert (plus de 65%) = la difficulté est bien calibrée. Orange (55-65%) = limite. Rouge (sous 55%) = trop dur, les utilisateurs se sentent en échec et risquent de quitter l app."
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={D.qT} layout="vertical">
              <XAxis type="number" tick={tickStyle} domain={[0, 100]} />
              <YAxis type="category" dataKey="t" tick={tickStyle} width={50} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="a" name="%" radius={[0, 6, 6, 0]}>
                {D.qT.map((_, i) => (
                  <Cell key={i} fill="#0666EB" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Leçons à la 1ère session"
          help="Ce graphique montre combien de leçons un utilisateur complète lors de sa toute première session. La barre rouge (0 leçon) représente les gens qui quittent l app sans même essayer le contenu. L objectif est de minimiser cette barre."
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={D.fsl}>
              <XAxis dataKey="n" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" name="Users" radius={[6, 6, 0, 0]}>
                {D.fsl.map((_, i) => (
                  <Cell key={i} fill="#0666EB" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Progression contenu"
          help="Barres = nombre d users par ere. Courbe = taux de complétion. La chute montre ou le contenu perd les gens."
        >
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={D.dp}>
              <XAxis
                dataKey="e"
                tick={{ fontSize: 8, fill: colors.sub }}
              />
              <YAxis yAxisId="u" tick={tickStyle} width={38} />
              <YAxis
                yAxisId="c"
                orientation="right"
                tick={tickStyle}
                width={30}
                domain={[0, 100]}
              />
              <Tooltip {...tooltipProps} />
              <Bar
                yAxisId="u"
                dataKey="u"
                fill="#0666EB25"
                name="Users"
                radius={[6, 6, 0, 0]}
              />
              <Line
                yAxisId="c"
                type="monotone"
                dataKey="p"
                stroke={colors.bad}
                name="Complétion %"
                strokeWidth={2}
                dot
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
