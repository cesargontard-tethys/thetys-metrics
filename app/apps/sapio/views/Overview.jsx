"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { MetricCard, ChartCard } from "@/app/components/ui";
import { colors, tickStyle, tooltipProps } from "@/lib/theme";
import { scoreHigherIsBetter, scoreLowerIsBetter } from "@/lib/utils";

const sectionTitleStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: colors.sub,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 8,
};

const metricsRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 22,
};

export function Overview({ D }) {
  const m = D.m;
  const tickInterval = (data) => Math.max(0, Math.ceil(data.length / 5) - 1);

  return (
    <div>
      <div style={sectionTitleStyle}>Revenus</div>
      <div style={metricsRowStyle}>
        <MetricCard label="MRR" value={m.mrr} sub="Récurrent mensuel" status="good" />
        <MetricCard label="ARR" value={m.arr} sub="Annualise" status="good" />
        <MetricCard
          label="ARPU"
          value={m.arpu}
          sub="Bench: 0.30-0.80"
          status={scoreHigherIsBetter(parseFloat(m.arpu.slice(1)), 0.35)}
        />
        <MetricCard
          label="ARPPU"
          value={m.arppu}
          sub="Bench: 7-12"
          status={scoreHigherIsBetter(parseFloat(m.arppu.slice(1)), 8)}
        />
        <MetricCard
          label="LTV"
          value={m.ltv}
          sub="Durée de vie"
          status={scoreHigherIsBetter(parseFloat(m.ltv.slice(1)), 25)}
        />
        <MetricCard
          label="LTV/CAC"
          value={m.lc}
          sub="Cible: 3-5x"
          status={scoreHigherIsBetter(parseFloat(m.lc) || 0, 3, 2)}
        />
      </div>

      <div style={sectionTitleStyle}>Utilisateurs et sessions</div>
      <div style={metricsRowStyle}>
        <MetricCard label="DAU" value={m.dau} sub="Actifs/jour" status="good" />
        <MetricCard label="MAU" value={m.mau} sub="Actifs/mois" status="good" />
        <MetricCard
          label="Downloads"
          value={m.dl}
          sub="Téléchargements totaux"
          status="good"
        />
        <MetricCard
          label="Stickiness"
          value={m.stick}
          sub="Bench: 15-25%"
          status={scoreHigherIsBetter(parseFloat(m.stick), 20, 12)}
        />
        <MetricCard
          label="Session tous"
          value={m.sessAll}
          sub="Tous users"
          status={scoreHigherIsBetter(parseFloat(m.sessAll), 5)}
        />
        <MetricCard
          label="Session onboardes"
          value={m.sessOnb}
          sub="Apres onboarding"
          status={scoreHigherIsBetter(parseFloat(m.sessOnb), 7)}
        />
      </div>

      <div style={sectionTitleStyle}>Conversion et rétention</div>
      <div style={metricsRowStyle}>
        <MetricCard
          label="Onboarding"
          value={m.onb}
          sub="Bench: plus de 60%"
          status={scoreHigherIsBetter(parseInt(m.onb), 60, 45)}
        />
        <MetricCard
          label="Trial to Paid"
          value={m.t2p}
          sub="Bench: 35-50%"
          status={scoreHigherIsBetter(parseFloat(m.t2p), 40, 30)}
        />
        <MetricCard
          label="Churn"
          value={m.churn}
          sub="Bench: moins de 6%"
          status={scoreLowerIsBetter(parseFloat(m.churn), 5, 10)}
        />
        <MetricCard
          label="Ret. J1"
          value={m.d1}
          sub="Bench: plus de 40%"
          status={scoreHigherIsBetter(parseInt(m.d1), 40)}
        />
        <MetricCard
          label="Ret. J30"
          value={m.d30}
          sub="Bench: plus de 10%"
          status={scoreHigherIsBetter(parseInt(m.d30), 10)}
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
          title="DAU"
          help="Ce graphique montre le nombre de personnes qui utilisent Sapio chaque jour. Si la courbe monte, votre app gagne en popularité. Si elle chute brutalement, il y a un problème (bug, mauvaise mise à jour, fin d une campagne pub...)."
        >
          <ResponsiveContainer width="100%" height={165}>
            <AreaChart data={D.dauT}>
              <XAxis
                dataKey="d"
                tick={tickStyle}
                interval={tickInterval(D.dauT)}
              />
              <YAxis tick={tickStyle} width={40} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#0666EB"
                fill="#0666EB15"
                strokeWidth={2}
                name="DAU"
                style={{ filter: "drop-shadow(0 0 8px #0666EB80)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="MRR"
          help="Le MRR (Monthly Recurring Revenue) représente l argent que vos abonnés vous rapportent chaque mois. Chaque barre = une période. Si les barres montent, votre business croît de façon saine et prévisible."
        >
          <ResponsiveContainer width="100%" height={165}>
            <BarChart data={D.mrrT}>
              <XAxis
                dataKey="w"
                tick={tickStyle}
                interval={tickInterval(D.mrrT)}
              />
              <YAxis tick={tickStyle} width={42} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" fill="#0666EB" name="MRR" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Churn"
          help="Le churn mesure le pourcentage d abonnés qui annulent chaque mois. La ligne verte représente l objectif de 5%. Au-dessus, vous perdez trop de monde. Un churn qui baisse signifie que vos utilisateurs sont de plus en plus satisfaits."
        >
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={D.chT}>
              <XAxis
                dataKey="w"
                tick={tickStyle}
                interval={tickInterval(D.mrrT)}
              />
              <YAxis tick={tickStyle} width={30} />
              <Tooltip {...tooltipProps} />
              <ReferenceLine y={5} stroke="#8E949A" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#0666EB"
                strokeWidth={2}
                dot={false}
                name="Churn %"
                style={{ filter: "drop-shadow(0 0 8px #0666EB80)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="LTV par cohorte"
          help="La LTV (Lifetime Value) estime combien d argent un utilisateur vous rapportera au total pendant toute sa durée de vie dans l app. Si les barres montent, vos utilisateurs restent plus longtemps et dépensent plus."
        >
          <ResponsiveContainer width="100%" height={165}>
            <BarChart data={D.ltT}>
              <XAxis
                dataKey="w"
                tick={tickStyle}
                interval={tickInterval(D.mrrT)}
              />
              <YAxis tick={tickStyle} width={38} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" fill="#0666EB" name="LTV" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
