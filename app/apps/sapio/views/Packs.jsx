"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { MetricCard, ChartCard, Funnel } from "@/app/components/ui";
import { colors, tickStyle, tooltipProps } from "@/lib/theme";

const STAR_COLORS = ["#0666EB", "#3D8BF2", "#6EAAF5"];

export function Packs({ D }) {
  const m = D.m;
  const [packFilter, setPackFilter] = useState("");

  const filteredPacks = D.topPacks.filter(
    (pack) =>
      packFilter === "" ||
      pack.n.toLowerCase().includes(packFilter.toLowerCase()),
  );

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
          label="Manches / session"
          value={m.manchesSess}
          sub="Nombre moyen de manches par session"
          status="info"
        />
        <MetricCard
          label="Accuracy packs"
          value="68%"
          sub="Bench: 65-75%"
          status="good"
        />
        <MetricCard
          label="Durée moy."
          value="6m30"
          sub="Par pack"
          status="info"
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
          title="Funnel packs"
          help="Du lancement au replay. Le taux de replay est un indicateur cle de la qualité du contenu."
        >
          <Funnel data={D.packF} accent="#0666EB" />
        </ChartCard>

        <ChartCard
          title="Étoiles"
          help="Les étoiles reflètent la difficulté perçue. 1 étoile = l utilisateur a eu du mal (frustration). 3 étoiles = trop facile (ennui). L idéal est d avoir la majorité en 2 étoiles : un défi accessible mais motivant."
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={D.stars}>
              <XAxis dataKey="s" tick={tickStyle} />
              <YAxis tick={tickStyle} width={35} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="c" name="Leçons" radius={[6, 6, 0, 0]}>
                {D.stars.map((_, i) => (
                  <Cell key={i} fill={STAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Top 10 packs les plus joués"
          wide
          help="Ce classement montre les 10 packs les plus joués par vos utilisateurs. Cela vous aide à comprendre quels thèmes plaisent le plus et à orienter la création de nouveaux packs. Utilisez la barre de recherche pour trouver un pack précis."
        >
          <input
            value={packFilter}
            onChange={(e) => setPackFilter(e.target.value)}
            placeholder="Rechercher un pack..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              fontSize: 12,
              fontFamily: "inherit",
              marginBottom: 10,
              boxSizing: "border-box",
              background: colors.card,
              color: "#FFFFFF",
            }}
          />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filteredPacks} layout="vertical">
              <XAxis type="number" tick={tickStyle} />
              <YAxis
                type="category"
                dataKey="n"
                tick={{ fontSize: 10, fill: colors.sub }}
                width={120}
              />
              <Tooltip {...tooltipProps} />
              <Bar
                dataKey="p"
                name="Joueurs"
                radius={[0, 6, 6, 0]}
                fill="#0666EB"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
