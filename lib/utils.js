const REFERENCE_DATE = new Date(2026, 3, 22);

export function makeDateLabels(period) {
  const length =
    period === "7d" ? 7 : period === "90d" ? 13 : period === "all" ? 12 : 30;

  return Array.from({ length }, (_, i) => {
    if (period === "all") {
      const d = new Date(2025, 4 + i, 1);
      return d.toLocaleDateString("fr-FR", { month: "short" });
    }

    const d = new Date(REFERENCE_DATE);
    if (period === "90d") {
      d.setDate(d.getDate() - 90 + i * 7);
    } else {
      d.setDate(d.getDate() - length + 1 + i);
    }
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  });
}

export function makeDayLabels(numDays) {
  if (numDays >= 365) {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(2025, 4 + i, 1);
      return d.toLocaleDateString("fr-FR", { month: "short" });
    });
  }

  if (numDays >= 90) {
    return Array.from({ length: 13 }, (_, i) => {
      const d = new Date(REFERENCE_DATE);
      d.setDate(d.getDate() - 90 + i * 7);
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
    });
  }

  return Array.from({ length: numDays }, (_, i) => {
    const d = new Date(REFERENCE_DATE);
    d.setDate(d.getDate() - numDays + 1 + i);
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  });
}

export function periodToDays(period) {
  if (period === "7d") return 7;
  if (period === "90d") return 90;
  if (period === "all") return 365;
  return 30;
}

export function scoreHigherIsBetter(value, goodThreshold, warnThreshold) {
  if (warnThreshold !== undefined) {
    return value >= goodThreshold
      ? "good"
      : value >= warnThreshold
        ? "warn"
        : "bad";
  }
  return value >= goodThreshold ? "good" : "bad";
}

export function scoreLowerIsBetter(value, goodThreshold, warnThreshold) {
  if (warnThreshold !== undefined) {
    return value < goodThreshold
      ? "good"
      : value < warnThreshold
        ? "warn"
        : "bad";
  }
  return value < goodThreshold ? "good" : "bad";
}
