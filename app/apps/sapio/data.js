import {
  makeDateLabels,
  makeDayLabels,
  periodToDays,
} from "@/lib/utils";

const EURO = "\u20AC";
const INFINITY = "\u221E";

const CAC_BY_CHANNEL = {
  organic: 0,
  meta: 1.8,
  google: 2.3,
  tiktok: 0.9,
  asa: 3.1,
  all: 1.95,
};

function volumeMultiplier(filters) {
  let m = 1;
  if (filters.ut === "free") m *= 0.72;
  if (filters.ut === "prem") m *= 0.28;
  if (filters.ut === "trial") m *= 0.08;

  if (filters.ch === "organic") m *= 0.42;
  if (filters.ch === "meta") m *= 0.22;
  if (filters.ch === "google") m *= 0.16;
  if (filters.ch === "tiktok") m *= 0.12;
  if (filters.ch === "asa") m *= 0.08;

  if (filters.pl === "ios") m *= 0.62;
  if (filters.pl === "android") m *= 0.38;
  return m;
}

function qualityMultiplier(filters) {
  let q = 1;
  if (filters.ut === "prem") q = 1.35;
  if (filters.ut === "trial") q = 1.12;
  if (filters.ut === "free") q = 0.82;

  if (filters.ch === "asa") q *= 1.18;
  if (filters.ch === "tiktok") q *= 0.72;
  if (filters.ch === "organic") q *= 1.08;

  if (filters.pl === "ios") q *= 1.06;
  if (filters.pl === "android") q *= 0.94;
  return q;
}

export function buildSapioData(filters) {
  const numDays = periodToDays(filters.pe);
  const weeks = makeDateLabels(filters.pe);
  const days = makeDayLabels(numDays);
  const v = volumeMultiplier(filters);
  const q = qualityMultiplier(filters);

  const isPremium = filters.ut === "prem";
  const isFree = filters.ut === "free";

  const dau = Math.round(4283 * v);
  const mau = Math.round(38540 * v);
  const baseChurn = isPremium ? 4.2 : isFree ? 12.8 : 8.6;
  const adjustedChurn = +(baseChurn / q).toFixed(1);

  const arppu = +(8.4 * q).toFixed(2);
  const ltv = +(arppu * 8.2 * q).toFixed(2);
  const cac = CAC_BY_CHANNEL[filters.ch] ?? 1.95;
  const ltvOverCac = cac > 0 ? +(ltv / cac).toFixed(1) : 999;

  const mrr = Math.round(
    12470 * v * (isPremium ? 1 : isFree ? 0.15 : 0.35),
  );

  const d1 = Math.min(95, Math.round(44 * q));
  const d7 = Math.min(80, Math.round(19 * q));
  const d30 = Math.min(60, Math.round(8 * q));

  const arpu = mau > 0 ? +(((mrr + 2340 * v) / mau).toFixed(2)) : 0;
  const payback = cac > 0 ? Math.round(cac / (arppu / 30) / q) : 0;

  return {
    m: {
      dau: dau.toLocaleString(),
      mau: mau.toLocaleString(),
      mrr: EURO + mrr.toLocaleString(),
      arr: EURO + (mrr * 12).toLocaleString(),
      arpu: EURO + arpu,
      arppu: EURO + arppu,
      ltv: EURO + ltv,
      cac: cac > 0 ? EURO + cac : EURO + "0",
      lc: ltvOverCac >= 999 ? INFINITY : ltvOverCac + "x",
      churn: adjustedChurn + "%",
      stick: (mau > 0 ? ((dau / mau) * 100).toFixed(1) : 0) + "%",
      t2p: Math.min(95, +(38.2 * q).toFixed(1)) + "%",
      pb: payback + "j",
      d1: d1 + "%",
      d7: d7 + "%",
      d30: d30 + "%",
      sess: (1.6 * q).toFixed(1),
      acc: Math.min(98, Math.round(64 * q)) + "%",
      onb: Math.min(95, Math.round(45.7 * q)) + "%",
      adR: EURO + Math.round(2340 * v),
      dl: Math.round(32100 * v).toLocaleString(),
      sessOnb: Math.round(8.4 * q) + "min",
      sessAll: Math.round(5.2 * q) + "min",
      pwFirst: "3.2 leçons",
      pwAvgBuy: "4.2 vues",
      pwLost: "8+ vues",
      liveBack: Math.round(34 * q) + "%",
      liveGone: Math.round(41 / q) + "%",
      liveQuit: Math.round(52 / q) + "%",
      liveUnlim: Math.round(48 * q) + "%",
      lesUser: Math.round(12.4 * q).toLocaleString(),
      adQuit: Math.round(12 / q) + "%",
      adPrem: Math.round(8 * q) + "%",
      liveTime: Math.round(4.2 * q) + "min",
      liveVidéo: Math.round(38 * q) + "%",
      pwPerSess: (1.4 / q).toFixed(1),
      adPerSess: (0.8 * q).toFixed(1),
      manchesSess: (2.3 * q).toFixed(1),
    },

    dauT: days.map((d, i) => {
      const base =
        numDays >= 365
          ? 2800 + i * 150
          : numDays >= 90
            ? 3000 + i * 45
            : 3400 + i * 30;
      return {
        d,
        v: Math.max(0, Math.round((base + Math.sin(i * 0.5) * 500) * v)),
      };
    }),

    mrrT: weeks.map((w, i) => {
      const growth = numDays >= 365 ? 220 : numDays >= 90 ? 300 : 380;
      return {
        w,
        v: Math.round((8200 + i * growth) * v * (isPremium ? 1 : 0.35)),
      };
    }),

    chT: weeks.map((w, i) => ({
      w,
      v: +(
        adjustedChurn + Math.sin(i * (6.28 / weeks.length)) * 1.2
      ).toFixed(1),
    })),

    ltT: weeks.map((w, i) => ({
      w,
      v: +(ltv * (0.1 + i * (0.9 / weeks.length))).toFixed(1),
    })),

    rC: Array.from({ length: 31 }, (_, i) => ({
      j: i,
      p: Math.max(
        0,
        Math.round(
          100 *
            Math.exp(
              -(isPremium ? 0.035 : isFree ? 0.085 : 0.055) * i / q,
            ),
        ),
      ),
    })),

    oF: [
      { s: "Pas de compte", v: Math.round(18400 * v) },
      { s: "Vidéo", v: Math.round(16800 * v) },
      { s: "Age/Goal/Level", v: Math.round(15200 * v) },
      { s: "Quiz (3 Q)", v: Math.round(12800 * v * q) },
      { s: "Objectif", v: Math.round(11100 * v * q) },
      { s: "Notifications", v: Math.round(10200 * v * q) },
      { s: "Compte", v: Math.round(9400 * v * q) },
      { s: "App", v: Math.round(8400 * v * q) },
    ],

    qT: [
      { t: "QC", a: Math.min(98, Math.round(81 * q)) },
      { t: "QCM img", a: Math.min(98, Math.round(74 * q)) },
      { t: "Assoc.", a: Math.min(98, Math.round(67 * q)) },
      { t: "Chrono", a: Math.min(98, Math.round(58 * q)) },
      { t: "Curseur", a: Math.min(98, Math.round(51 * q)) },
      { t: "Saisie", a: Math.min(98, Math.round(42 * q)) },
    ],

    dp: [
      { e: "Big Bang", u: Math.round(9200 * v), p: Math.min(100, Math.round(82 * q)) },
      { e: "Antiquité", u: Math.round(7800 * v), p: Math.min(100, Math.round(72 * q)) },
      { e: "M-Age", u: Math.round(5800 * v), p: Math.min(100, Math.round(58 * q)) },
      { e: "Renaiss.", u: Math.round(4100 * v), p: Math.min(100, Math.round(45 * q)) },
      { e: "Lumieres", u: Math.round(2900 * v), p: Math.min(100, Math.round(34 * q)) },
      { e: "Moderne", u: Math.round(1800 * v), p: Math.min(100, Math.round(22 * q)) },
      { e: "Guerres", u: Math.round(1100 * v), p: Math.min(100, Math.round(15 * q)) },
      { e: "G.Froide", u: Math.round(620 * v), p: Math.min(100, Math.round(10 * q)) },
      { e: "XXIe", u: Math.round(320 * v), p: Math.min(100, Math.round(6 * q)) },
    ],

    pF: [
      { s: "Paywall vu", v: Math.round(14200 * v) },
      { s: "Scroll", v: Math.round(8900 * v) },
      { s: "CTA click", v: Math.round(3100 * v * q) },
      { s: "Achat lance", v: Math.round(1850 * v * q) },
      { s: "Achat OK", v: Math.round(1480 * v * q) },
    ],

    ro: [
      { ch: "ASA", v: +(2.06 * q).toFixed(2) },
      { ch: "Meta", v: +(1.73 * q).toFixed(2) },
      { ch: "Google", v: +(1.28 * q).toFixed(2) },
      { ch: "TikTok", v: +(0.86 * q).toFixed(2) },
    ],

    rCh: [
      { ch: "Organic", d1: Math.round(48 * q), d7: Math.round(24 * q), d30: Math.round(12 * q) },
      { ch: "ASA", d1: Math.round(51 * q), d7: Math.round(28 * q), d30: Math.round(14 * q) },
      { ch: "Meta", d1: Math.round(42 * q), d7: Math.round(18 * q), d30: Math.round(8 * q) },
      { ch: "Google", d1: Math.round(38 * q), d7: Math.round(15 * q), d30: Math.round(6 * q) },
      { ch: "TikTok", d1: Math.round(35 * q), d7: Math.round(11 * q), d30: Math.round(4 * q) },
    ],

    co: [
      { w: "S-6", d1: Math.round(41 * q), d3: Math.round(27 * q), d7: Math.round(17 * q), d14: Math.round(11 * q), d30: Math.round(7 * q) },
      { w: "S-5", d1: Math.round(45 * q), d3: Math.round(31 * q), d7: Math.round(21 * q), d14: Math.round(14 * q), d30: null },
      { w: "S-4", d1: Math.round(43 * q), d3: Math.round(29 * q), d7: Math.round(19 * q), d14: null, d30: null },
      { w: "S-3", d1: Math.round(46 * q), d3: Math.round(32 * q), d7: null, d14: null, d30: null },
    ],

    ps: [
      { s: "Onboarding", r: +(16.8 * q).toFixed(1) },
      { s: "Pack lock", r: +(12.9 * q).toFixed(1) },
      { s: "Vies", r: +(11.1 * q).toFixed(1) },
      { s: "Post-lecon", r: +(9.0 * q).toFixed(1) },
      { s: "Settings", r: +(4.0 * q).toFixed(1) },
    ],

    mb: weeks.map((w, i) => ({
      w,
      n: Math.round((1800 + i * (640 / weeks.length)) * v),
      r: Math.round((7200 + i * (960 / weeks.length)) * v),
      l: -Math.round((1200 + i * (160 / weeks.length)) * v),
    })),

    qz: [
      { q: "Q1", v: Math.min(99, Math.round(82 * q)) },
      { q: "Q2", v: Math.min(99, Math.round(68 * q)) },
      { q: "Q3", v: Math.min(99, Math.round(54 * q)) },
    ],

    engD: days.map((d, i) => ({
      d,
      les: +(1.2 + Math.sin(i * (6.28 / days.length)) * 0.5).toFixed(1),
      acc: Math.min(
        98,
        Math.round((62 + Math.sin(i * (6.28 / days.length)) * 0.8 * 8) * q),
      ),
    })),

    stars: [
      { s: "1", c: Math.round(3200 * v) },
      { s: "2", c: Math.round(4100 * v) },
      { s: "3", c: Math.round(4050 * v) },
    ],

    cpiL: [
      { ch: "Organic", cpi: 0, ltv: +(4.2 * q).toFixed(1) },
      { ch: "Meta", cpi: 1.8, ltv: +(5.1 * q).toFixed(1) },
      { ch: "Google", cpi: 2.3, ltv: +(3.8 * q).toFixed(1) },
      { ch: "TikTok", cpi: 0.9, ltv: +(2.1 * q).toFixed(1) },
      { ch: "ASA", cpi: 3.1, ltv: +(6.4 * q).toFixed(1) },
    ],

    instS: weeks.map((w, i) => ({
      w,
      organic: Math.round((800 + i * (200 / weeks.length)) * v),
      meta: Math.round((450 + i * (100 / weeks.length)) * v),
      google: Math.round((300 + i * (40 / weeks.length)) * v),
      tiktok: Math.round((180 + i * (150 / weeks.length)) * v),
      asa: Math.round((100 + i * (40 / weeks.length)) * v),
    })),

    pErr: [
      { t: "Card declined", c: Math.round(124 * v) },
      { t: "Network", c: Math.round(98 * v) },
      { t: "Store", c: Math.round(72 * v) },
      { t: "Cancel", c: Math.round(58 * v) },
    ],

    t2ch: [
      { r: "1-2j", p: 32 },
      { r: "3-5j", p: 24 },
      { r: "6-14j", p: 22 },
      { r: "15-30j", p: 14 },
      { r: "30j+", p: 8 },
    ],

    fsl: [
      { n: "0", v: Math.round((18 * v) / q) },
      { n: "1", v: Math.round(42 * v * q) },
      { n: "2", v: Math.round(24 * v * q) },
      { n: "3", v: Math.round(10 * v * q) },
      { n: "4+", v: Math.round(6 * v * q) },
    ],

    pwFunnel: [
      { n: "1er", v: 100 },
      { n: "2e", v: 72 },
      { n: "3e", v: 51 },
      { n: "4e", v: 34 },
      { n: "5e+", v: 18 },
    ],

    topPacks: [
      { n: "Le corps humain", p: Math.round(4200 * v) },
      { n: "Capitales du monde", p: Math.round(3800 * v) },
      { n: "Harry Potter", p: Math.round(3200 * v) },
      { n: "Le football", p: Math.round(2900 * v) },
      { n: "Le systeme solaire", p: Math.round(2400 * v) },
      { n: "Les animaux", p: Math.round(2100 * v) },
      { n: "Cuisine du monde", p: Math.round(1800 * v) },
      { n: "Geographie France", p: Math.round(1500 * v) },
      { n: "Cinema", p: Math.round(1200 * v) },
      { n: "Musique pop", p: Math.round(900 * v) },
    ],

    packF: [
      { s: "Lancés", v: Math.round(6200 * v) },
      { s: "50%", v: Math.round(4300 * v) },
      { s: "Terminés", v: Math.round(3100 * v) },
      { s: "Rejoués", v: Math.round(370 * v) },
    ],

    adImpact: [
      { n: "Restent", v: 88 },
      { n: "Quittent", v: 12 },
    ],

    mrrProd: [
      { n: "Annuel", v: Math.round(mrr * 0.62) },
      { n: "Mensuel", v: Math.round(mrr * 0.31) },
      { n: "Hebdo", v: Math.round(mrr * 0.07) },
    ],

    jOrg: [
      { s: "App Store (découverte)", v: 50000 },
      { s: "Visite fiche", v: 50000 },
      { s: "Install", v: 8500 },
      { s: "Ouverture app", v: 7650 },
      { s: "Pas de compte", v: 7200 },
      { s: "Vidéo intro (68% skip)", v: 6800 },
      { s: "Age / Goal / Level", v: 6300 },
      { s: "Quiz (3 questions)", v: 5400 },
      { s: "Objectif quotidien", v: 5100 },
      { s: "Notifications (47% accept)", v: 4900 },
      { s: "Création compte", v: 4600 },
      { s: "App (suivre)", v: 4400 },
      { s: "1ère leçon terminée", v: 3500 },
      { s: "Paywall vu", v: 2800 },
      { s: "Trial démarré", v: 560 },
      { s: "Abonné payant", v: 215 },
      { s: "Actif J7", v: 1056 },
      { s: "Actif J30", v: 528 },
    ],

    jPaid: [
      { s: "Impression pub", v: 2800000 },
      { s: "Click pub (CTR 3.5%)", v: 98000 },
      { s: "Page Store", v: 98000 },
      { s: "Install (CPI ~1.95)", v: 23600 },
      { s: "Ouverture app", v: 20100 },
      { s: "Pas de compte", v: 18400 },
      { s: "Vidéo intro (68% skip)", v: 16800 },
      { s: "Age / Goal / Level", v: 15200 },
      { s: "Quiz (3 questions)", v: 12800 },
      { s: "Objectif quotidien", v: 11100 },
      { s: "Notifications", v: 10200 },
      { s: "Création compte", v: 9400 },
      { s: "App (suivre)", v: 8400 },
      { s: "1ère leçon terminée", v: 5880 },
      { s: "Paywall vu", v: 4700 },
      { s: "Trial démarré", v: 705 },
      { s: "Abonné payant", v: 254 },
      { s: "Actif J7", v: 3776 },
      { s: "Actif J30", v: 1652 },
    ],
  };
}
