"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

import { MetricCard, ChartCard, Funnel } from "@/app/components/ui";
import { colors, tickStyle, tooltipProps, gridColor } from "@/lib/theme";

const PAYWALL_FATIGUE_COLORS = [
  "#0666EB",
  "#0666EB",
  "#3D8BF2",
  "#6EAAF5",
  "#A0CAF8",
];

function StatTile({ label, value, color }) {
  return (
    <div
      style={{
        flex: "1 1 120px",
        padding: "10px 12px",
        borderRadius: 8,
        background: "#0D0F12",
        border: "1px solid #2A2F35",
      }}
    >
      <div style={{ fontSize: 10, color: colors.sub }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: color || undefined }}>
        {value}
      </div>
    </div>
  );
}

export function Monetization({ D }) {
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
          label="1er paywall"
          value={m.pwFirst}
          sub="Quand l user voit le 1er paywall"
          status="info"
        />
        <MetricCard
          label="Paywalls avant achat"
          value={m.pwAvgBuy}
          sub="En moyenne pour convertir"
          status="info"
        />
        <MetricCard
          label="Paywalls = perdu"
          value={m.pwLost}
          sub="Seuil : l user ne convertira plus"
          status="warn"
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
          title="Funnel achat"
          help="Ce funnel retrace le parcours d achat complet : le paywall s affiche, l utilisateur scrolle, clique, lance le paiement, et le paiement aboutit. Chaque étape perdue = des clients potentiels qui abandonnent."
        >
          <Funnel data={D.pF} />
        </ChartCard>

        <ChartCard
          title="Paywall fatigue"
          help="% des users encore actifs après chaque paywall vu. Au-dela de 5 paywalls sans achat, l user est considere comme perdu."
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={D.pwFunnel}>
              <XAxis dataKey="n" tick={tickStyle} />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" name="% restants" radius={[6, 6, 0, 0]}>
                {D.pwFunnel.map((_, i) => (
                  <Cell key={i} fill={PAYWALL_FATIGUE_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Conversion par écran"
          help="Quel écran source généré le plus de conversions. Onboarding = moment ou l user est le plus receptif."
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={D.ps} layout="vertical">
              <XAxis type="number" tick={tickStyle} />
              <YAxis type="category" dataKey="s" tick={tickStyle} width={80} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="r" name="%" radius={[0, 6, 6, 0]}>
                {D.ps.map((_, i) => (
                  <Cell key={i} fill="#0666EB" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Évolution MRR"
          wide
          help="Ce graphique décompose l évolution de vos revenus récurrents. Vert = nouveaux abonnés qui arrivent. Violet = abonnés existants qui renouvellent. Rouge = abonnés qui partent. Pour que votre revenu grandisse, le vert + violet doit toujours dépasser le rouge."
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={D.mb} stackOffset="sign">
              <XAxis
                dataKey="w"
                tick={tickStyle}
                interval={tickInterval(D.mb)}
              />
              <YAxis tick={tickStyle} width={42} />
              <Tooltip {...tooltipProps} />
              <ReferenceLine y={0} stroke={gridColor} />
              <Bar
                dataKey="n"
                stackId="a"
                fill="#0666EB"
                name="Nouveaux"
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="r"
                stackId="a"
                fill={colors.o3}
                name="Renouvelés"
              />
              <Bar
                dataKey="l"
                stackId="a"
                fill="#0666EB40"
                name="Perdus"
                radius={[0, 0, 5, 5]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Publicité in-app"
          help="Ce graphique montre l impact des publicités sur vos utilisateurs. La part verte = ceux qui restent dans l app après la pub. La part rouge = ceux qui quittent immédiatement. Si la part rouge dépasse 15%, les pubs nuisent à l expérience."
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <StatTile label="Rev. pubs" value={m.adR} />
            <StatTile
              label="Quittent après pub"
              value={m.adQuit}
              color={colors.bad}
            />
            <StatTile
              label="Premium pour supprimer"
              value={m.adPrem}
              color={colors.good}
            />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={D.adImpact}
                dataKey="v"
                nameKey="n"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                label={(e) => `${e.n} ${e.v}%`}
              >
                {D.adImpact.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#0666EB" : "#0666EB30"} />
                ))}
              </Pie>
              <Tooltip {...tooltipProps} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Paywalls et vidéos par session"
          help="Ces deux chiffres montrent à quelle fréquence vos utilisateurs sont exposés aux sollicitations commerciales. Trop de paywalls crée de la lassitude. Trop de vidéos pub dégrade l expérience."
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.o1 }}>
                {m.pwPerSess}
              </div>
              <div style={{ fontSize: 11, color: colors.sub, marginTop: 4 }}>
                Paywalls / session
              </div>
            </div>
            <div
              style={{ width: 1, height: 50, background: colors.border }}
            />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.o2 }}>
                {m.adPerSess}
              </div>
              <div style={{ fontSize: 11, color: colors.sub, marginTop: 4 }}>
                Vidéos pub / session
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Erreurs achat"
          help="Ces barres montrent pourquoi des paiements échouent. Chaque erreur = une personne qui voulait payer mais n a pas pu. C est du revenu perdu récupérable en corrigeant les bugs."
        >
          {D.pErr.map((err, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: colors.sub,
                  width: 100,
                  flexShrink: 0,
                }}
              >
                {err.t}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: colors.bg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${
                      D.pErr[0].c >= 1 ? (err.c / D.pErr[0].c) * 100 : 0
                    }%`,
                    background: i === 0 ? "#0666EB" : "#3D8BF2",
                    borderRadius: 4,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.text,
                  width: 30,
                  textAlign: "right",
                }}
              >
                {err.c}
              </span>
            </div>
          ))}
        </ChartCard>
      </div>
    </div>
  );
}
