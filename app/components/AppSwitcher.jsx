"use client";

import { useState } from "react";

import { colors } from "@/lib/theme";

export function AppSwitcher({ apps, currentApp, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 10px",
          borderRadius: 10,
          background: "#0D0F12",
          border: `1px solid ${colors.border}`,
          cursor: "pointer",
        }}
      >
        <img
          src={currentApp.icon}
          alt={currentApp.name}
          style={{
            width: 32,
            height: 32,
            borderRadius: 12,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
            {currentApp.name}
          </div>
          <div style={{ fontSize: 10, color: colors.sub }}>
            {currentApp.description}
          </div>
        </div>
        <span style={{ fontSize: 10, color: colors.sub }}>{"\u25BC"}</span>
      </div>

      {open && (
        <>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: 4,
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              boxShadow: "0 12px 40px rgba(0,0,0,.6)",
              padding: 6,
              zIndex: 200,
            }}
          >
            {apps.map((app) => {
              const active = app.id === currentApp.id;
              return (
                <div
                  key={app.id}
                  onClick={() => {
                    onSelect(app.id);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: active ? "rgba(6,102,235,.1)" : "transparent",
                    border: active
                      ? "1px solid rgba(6,102,235,.4)"
                      : "1px solid transparent",
                  }}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 10,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {app.name}
                    </div>
                    <div style={{ fontSize: 10, color: colors.sub }}>
                      {app.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 199 }}
          />
        </>
      )}
    </div>
  );
}
