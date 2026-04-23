"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { MetricCard, ChartCard } from "@/app/components/ui";
import { colors, tickStyle, tooltipProps } from "@/lib/theme";
import { scoreHigherIsBetter, scoreLowerIsBetter } from "@/lib/utils";

const T2C_COLORS = ["#0666EB", "#0666EB", "#3D8BF2", "#6EAAF5", "#A0CAF8"];

function cohortBackground(value) {
  if (value === null) return colors.card;
  if (value >= 30) return "#0666EB";
  if (value >= 15) return "#0666EB90";
  if (value >= 10) return "#0666EB50";
  return "#0666EB25";
}

function cohortColor(value) {
  return value === null ? colors.sub : "#FFFFFF";
}

export function Retention({ D }) {
  const m = D.m;
  const cohortColumns = ["d1", "d3", "d7", "d14", "d30"];
  const cohortHeaders = ["J1", "J3", "J7", "J14", "J30"];

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
          label="Jour 1"
          value={m.d1}
          sub="Bench: plus de 40%"
          status={scoreHigherIsBetter(parseInt(m.d1), 40)}
        />
        <MetricCard
          label="Jour 7"
          value={m.d7}
          sub="Bench: plus de 20%"
          status={scoreHigherIsBetter(parseInt(m.d7), 20)}
        />
        <MetricCard
          label="Jour 30"
          value={m.d30}
          sub="Bench: plus de 10%"
          status={scoreHigherIsBetter(parseInt(m.d30), 10)}
        />
        <MetricCard
          label="Churn"
          value={m.churn}
          sub="Bench: moins de 6%"
          status={scoreLowerIsBetter(parseFloat(m.churn), 5, 10)}
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
          title="Cohortes"
          wide
          help="Chaque ligne = une semaine d install. Chaque colonne = rétention a J+n. Vert = bon. Rouge = problème."
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderSpacing: 0,
                fontSize: 12,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "8px 10px",
                      textAlign: "left",
                      color: colors.sub,
                      fontSize: 11,
                    }}
                  >
                    Cohorte
                  </th>
                  {cohortHeaders.map((d) => (
                    <th
                      key={d}
                      style={{
                        padding: "8px 10px",
                        textAlign: "center",
                        color: colors.sub,
                        fontSize: 11,
                      }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {D.co.map((cohort, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "7px 10px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {cohort.w}
                    </td>
                    {cohortColumns.map((col) => (
                      <td
                        key={col}
                        style={{
                          padding: "7px 10px",
                          textAlign: "center",
                          fontWeight: 600,
                          background: cohortBackground(cohort[col]),
                          color: cohortColor(cohort[col]),
                          borderRadius: 0,
                          border: "1px solid #000000",
                        }}
                      >
                        {cohort[col] !== null ? `${cohort[col]}%` : "--"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard
          title="Courbe de rétention"
          help="Cette courbe montre quel pourcentage de vos utilisateurs est encore actif chaque jour après l installation. Plus la courbe descend lentement, mieux c est. L objectif est de garder la courbe au-dessus de 10% à J30."
        >
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={D.rC}>
              <XAxis dataKey="j" tick={tickStyle} />
              <YAxis tick={tickStyle} width={32} domain={[0, 100]} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="p"
                stroke={colors.o1}
                strokeWidth={2.5}
                dot={false}
                name="Rétention %"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Rétention par canal"
          help="Ce graphique compare la qualité des utilisateurs selon leur provenance. Les barres montrent quel pourcentage revient à J1, J7 et J30. Un canal avec une bonne rétention amène des gens vraiment intéressés, pas juste des curieux."
        >
          <ResponsiveContainer width="100%" height={190}>
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

        <ChartCard
          title="Time to churn"
          help="TIME TO CHURN : montre QUAND les utilisateurs partent definitivement. C est une distribution. Chaque barre indique quel % du churn total se produit dans cette tranche de jours. Par exemple, si la barre 1-2j est a 32%, cela veut dire que 32% de tous les utilisateurs qui partent le font dans les 2 premiers jours. Cela aide a savoir A QUEL MOMENT intervenir pour les retenir."
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={D.t2ch}>
              <XAxis dataKey="r" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="p" name="% du churn" radius={[6, 6, 0, 0]}>
                {D.t2ch.map((_, i) => (
                  <Cell key={i} fill={T2C_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
