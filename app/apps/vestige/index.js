import { buildVestigeData } from "./data";
import { Overview } from "./views/Overview";

export const vestigeApp = {
  id: "vestige",
  name: "Vestige",
  description: "App à venir",
  icon: "/assets/Vestige.png",
  buildData: buildVestigeData,
  nav: [{ id: "overview", label: "Vue d'ensemble", view: Overview }],
};
