import { makeDayLabels, periodToDays } from "@/lib/utils";

export function buildVestigeData(filters) {
  const numDays = periodToDays(filters.pe);
  const days = makeDayLabels(numDays);

  return {
    m: {
      placeholder: "—",
    },
    sample: days.map((d, i) => ({
      d,
      v: Math.round(1000 + Math.sin(i * 0.4) * 200 + i * 5),
    })),
  };
}
