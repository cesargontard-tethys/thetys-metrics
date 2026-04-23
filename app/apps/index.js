import { sapioApp } from "./sapio";
import { vestigeApp } from "./vestige";

export const apps = [sapioApp, vestigeApp];

export const appsById = Object.fromEntries(apps.map((a) => [a.id, a]));
