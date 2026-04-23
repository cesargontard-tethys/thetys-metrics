"use client";

import { useState, useMemo } from "react";

import { apps, appsById } from "@/app/apps";
import { AppSwitcher } from "./AppSwitcher";
import { FilterBar } from "./FilterBar";
import { colors } from "@/lib/theme";

const DEFAULT_FILTERS = { ut: "all", pe: "30d", ch: "all", pl: "all" };

const GLOBAL_STYLE = `
  @keyframes gIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  * {
    transition:
      background .2s cubic-bezier(.4,0,.2,1),
      color .2s ease,
      border-color .2s ease,
      box-shadow .2s ease,
      transform .2s cubic-bezier(.4,0,.2,1);
  }
`;

export default function Dashboard() {
  const [appId, setAppId] = useState(apps[0].id);
  const [tabsByApp, setTabsByApp] = useState(() =>
    Object.fromEntries(apps.map((a) => [a.id, a.nav[0].id])),
  );
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [countries, setCountries] = useState(["all"]);

  const currentApp = appsById[appId];
  const currentTabId = tabsByApp[appId];
  const currentNavItem =
    currentApp.nav.find((n) => n.id === currentTabId) || currentApp.nav[0];
  const CurrentView = currentNavItem.view;

  const data = useMemo(
    () => currentApp.buildData(filters),
    [currentApp, filters],
  );

  function selectApp(nextAppId) {
    setAppId(nextAppId);
    setTabsByApp((prev) => ({
      ...prev,
      [nextAppId]: prev[nextAppId] ?? appsById[nextAppId].nav[0].id,
    }));
  }

  function selectTab(tabId) {
    setTabsByApp((prev) => ({ ...prev, [appId]: tabId }));
  }

  return (
    <div
      style={{
        display: "flex",
        fontFamily:
          "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLE }} />

      <aside
        style={{
          width: sidebarOpen ? 210 : 0,
          minWidth: sidebarOpen ? 210 : 0,
          background: colors.bg,
          borderRight: `1px solid ${colors.border}`,
          transition: "all .25s ease",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px 16px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -0.03,
              marginBottom: 14,
            }}
          >
            THETYS METRICS
          </div>
          <AppSwitcher
            apps={apps}
            currentApp={currentApp}
            onSelect={selectApp}
          />
        </div>

        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {currentApp.nav.map((item) => {
            const active = currentTabId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectTab(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 14px",
                  marginBottom: 3,
                  borderRadius: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  background: active ? "rgba(6,102,235,.1)" : "transparent",
                  boxShadow: active ? "inset 3px 0 0 #0666EB" : "none",
                  border: active
                    ? "1px solid #0666EB"
                    : "1px solid transparent",
                  color: active ? "#FFFFFF" : colors.sub,
                  textShadow: active ? "0 0 14px #0666EB50" : "none",
                  transition: "all .3s cubic-bezier(.4,0,.2,1)",
                  textAlign: "left",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            background: "#000000",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 52,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: `1px solid ${colors.border}`,
                  background: colors.card,
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "inherit",
                }}
              >
                {sidebarOpen ? "\u2190" : "\u2192"}
              </button>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: -0.02,
                }}
              >
                {currentNavItem.label}
              </div>
            </div>
          </div>

          <FilterBar
            filters={filters}
            setFilters={setFilters}
            countries={countries}
            setCountries={setCountries}
          />
        </header>

        <div style={{ padding: "24px 28px 60px" }}>
          <CurrentView D={data} />
        </div>
      </main>
    </div>
  );
}
