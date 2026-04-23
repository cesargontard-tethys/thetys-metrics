import { buildSapioData } from "./data";
import { Overview } from "./views/Overview";
import { Journey } from "./views/Journey";
import { Acquisition } from "./views/Acquisition";
import { Onboarding } from "./views/Onboarding";
import { Engagement } from "./views/Engagement";
import { Packs } from "./views/Packs";
import { Monetization } from "./views/Monetization";
import { Retention } from "./views/Retention";
import { Weekly } from "./views/Weekly";

export const sapioApp = {
  id: "sapio",
  name: "Sapio",
  description: "EdTech App",
  icon: "/assets/Sapio.png",
  buildData: buildSapioData,
  nav: [
    { id: "overview", label: "Vue d'ensemble", view: Overview },
    { id: "journey", label: "User Journey", view: Journey },
    { id: "acquisition", label: "Acquisition", view: Acquisition },
    { id: "onboarding", label: "Onboarding", view: Onboarding },
    { id: "engagement", label: "Engagement", view: Engagement },
    { id: "packs", label: "Packs", view: Packs },
    { id: "monetization", label: "Monétisation", view: Monetization },
    { id: "retention", label: "Rétention", view: Retention },
    { id: "weekly", label: "Weekly Report", view: Weekly },
  ],
};
