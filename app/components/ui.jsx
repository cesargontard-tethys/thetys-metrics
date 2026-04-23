"use client";

import { colors } from "@/lib/theme";

const STATUS_DOT_COLORS = {
  good: "#00B341",
  bad: "#EF4444",
  warn: "#F59E0B",
};

export function MetricCard({ label, value, sub, status }) {
  const dotColor = STATUS_DOT_COLORS[status] || "#D1D5DB";

  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: 16,
        background: colors.card,
        flex: "1 1 155px",
        minWidth: 148,
        boxShadow:
          "0 0 0 1px rgba(0,0,0,.04),0 2px 8px rgba(0,0,0,.02)",
        border: "none",
        transition: "all .25s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: dotColor,
          }}
        />
        <div
          style={{
            fontSize: 11.5,
            color: colors.sub,
            fontWeight: 500,
            letterSpacing: 0.1,
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: colors.text,
          letterSpacing: -0.5,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: "#9CA3AF",
            marginTop: 6,
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export function ChartCard({ title, children, help, wide }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: 12,
        background: colors.card,
        gridColumn: wide ? "1/-1" : undefined,
        border: "1px solid #2A2F35",
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.text,
          marginBottom: 14,
          letterSpacing: -0.02,
        }}
      >
        {title}
      </div>
      {children}
      {help && (
        <div
          style={{
            fontSize: 11,
            color: "#6B7280",
            lineHeight: 1.55,
            marginTop: 14,
            fontStyle: "italic",
          }}
        >
          {help}
        </div>
      )}
    </div>
  );
}

const NOTE_COLORS = {
  good: colors.good,
  warn: colors.warn,
  bad: colors.bad,
  info: colors.pri,
};

export function Note({ type, text }) {
  const accent = NOTE_COLORS[type] || NOTE_COLORS.info;
  return (
    <div
      style={{
        padding: "12px 16px",
        marginBottom: 8,
        fontSize: 13,
        color: accent,
        lineHeight: 1.6,
        fontWeight: 400,
        borderLeft: `2px solid ${accent}`,
        background: "#0D0F12",
        borderRadius: "0 8px 8px 0",
      }}
    >
      {text}
    </div>
  );
}

export function HighlightBox({ title, text }) {
  return (
    <div
      style={{
        padding: "16px 18px",
        borderRadius: 10,
        background: "#FFF5EE",
        border: "1px solid #F5C9A8",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.o1,
          marginBottom: 5,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12.5, color: "#4C4C6D", lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
}

export function Funnel({ data, accent = colors.pri }) {
  const max = data[0].v;
  const last = data[data.length - 1].v;
  const globalConversion = ((last / max) * 100).toFixed(max >= 100000 ? 2 : 1);
  const globalLoss = (100 - parseFloat(globalConversion)).toFixed(1);

  return (
    <div>
      {data.map((step, i) => {
        const widthPct = Math.max(22, (step.v / max) * 100);
        const previousValue = i >= 1 ? data[i - 1].v : step.v;
        const dropRate =
          i >= 1
            ? (((previousValue - step.v) / previousValue) * 100).toFixed(1)
            : null;
        const isMajorDrop = dropRate && parseFloat(dropRate) >= 12;

        return (
          <div key={i} style={{ marginBottom: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: `${widthPct}%`,
                  minWidth: 95,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "#0D0F12",
                  borderLeft: "none",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  {step.s}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: accent,
                    textShadow: `0 0 12px ${accent}60`,
                  }}
                >
                  {step.v.toLocaleString()}
                </span>
              </div>
              {dropRate && (
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 5,
                    background: isMajorDrop ? `${colors.bad}20` : colors.card,
                    color: isMajorDrop ? colors.bad : colors.sub,
                    whiteSpace: "nowrap",
                  }}
                >
                  {`-${dropRate}%`}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: colors.sub,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Conversion globale
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: accent,
              textShadow: `0 0 14px ${accent}60`,
            }}
          >
            {`${globalConversion}%`}
          </div>
          <div style={{ fontSize: 10, color: colors.bad, fontWeight: 500 }}>
            {`${globalLoss}% de perte`}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Segmented({ opts, val, set }) {
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      {opts.map((o) => {
        const active = val === o.v;
        return (
          <button
            key={o.v}
            onClick={() => set(o.v)}
            style={{
              padding: "7px 16px",
              borderRadius: 24,
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all .3s cubic-bezier(.4,0,.2,1)",
              background: active ? "#FFFFFF" : "#191C20",
              color: active ? "#000000" : "#8E949A",
              boxShadow: "none",
            }}
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}
