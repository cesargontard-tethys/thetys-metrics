"use client";

import { useState } from "react";

const DAYS_OF_WEEK = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const HOURS = [
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
];

function ChipButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 20,
        border: "none",
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all .2s",
        background: active ? "#0666EB" : "#0D0F12",
        color: active ? "#FFFFFF" : "#8E949A",
      }}
    >
      {label}
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#191C20",
        borderRadius: 12,
        border: "1px solid #2A2F35",
        padding: 20,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

export function Weekly({ D }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleDay, setScheduleDay] = useState("Dimanche");
  const [scheduleTime, setScheduleTime] = useState("20:00");
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  function generateReport() {
    setLoading(true);
    const m = D.m;
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content:
              "Analyse ces metriques EdTech. JSON: {summary,trends:[{title,direction,detail}],alerts:[{severity,text}],recommendations:[{priority,action,impact}],kpi_changes:[{name,value,change,status}]}. JSON UNIQUEMENT. " +
              `DAU=${m.dau},MRR=${m.mrr},Churn=${m.churn},D1=${m.d1},D7=${m.d7},D30=${m.d30},Onb=${m.onb}`,
          },
        ],
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        try {
          const text = data.content.map((c) => c.text || "").join("");
          setReport(JSON.parse(text.replace(/```json|```/g, "").trim()));
        } catch (e) {
          setReport({ summary: `Erreur: ${e.message}` });
        }
        setLoading(false);
      })
      .catch((e) => {
        setReport({ summary: `Erreur: ${e.message}` });
        setLoading(false);
      });
  }

  function addEmail() {
    if (emailInput && emailInput.includes("@")) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  }

  function removeEmail(index) {
    setEmails(emails.filter((_, j) => j !== index));
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Card title="Destinataires">
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addEmail();
              }}
              placeholder="email@exemple.com"
              style={{
                flex: 1,
                padding: "9px 14px",
                borderRadius: 24,
                border: "1px solid #2A2F35",
                fontSize: 12,
                fontFamily: "inherit",
                background: "#0D0F12",
                color: "#FFFFFF",
                outline: "none",
              }}
            />
            <button
              onClick={addEmail}
              style={{
                padding: "9px 18px",
                borderRadius: 24,
                border: "none",
                background: "#0666EB",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Ajouter
            </button>
          </div>

          {emails.length === 0 && (
            <div
              style={{
                fontSize: 12,
                color: "#8E949A",
                padding: "16px 0",
                textAlign: "center",
              }}
            >
              Aucun destinataire
            </div>
          )}

          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {emails.map((email, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  marginBottom: 3,
                  borderRadius: 10,
                  background: "#0D0F12",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      background: "#0666EB20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "#0666EB",
                      fontWeight: 600,
                    }}
                  >
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 12, color: "#FFFFFF" }}>
                    {email}
                  </span>
                </div>
                <button
                  onClick={() => removeEmail(i)}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#D92027",
                    cursor: "pointer",
                    fontSize: 11,
                    fontFamily: "inherit",
                    padding: "4px 8px",
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Planification">
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            Jour
          </div>
          <div
            style={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {DAYS_OF_WEEK.map((day) => (
              <ChipButton
                key={day}
                label={day}
                active={scheduleDay === day}
                onClick={() => setScheduleDay(day)}
              />
            ))}
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            Heure
          </div>
          <div
            style={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {HOURS.map((hour) => (
              <ChipButton
                key={hour}
                label={hour}
                active={scheduleTime === hour}
                onClick={() => setScheduleTime(hour)}
              />
            ))}
          </div>

          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "#0D0F12",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#8E949A" }}>
                Prochain envoi
              </div>
              <div
                style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}
              >
                {`${scheduleDay} ${scheduleTime}`}
              </div>
            </div>
            <button
              onClick={generateReport}
              disabled={loading}
              style={{
                padding: "10px 22px",
                borderRadius: 24,
                border: "none",
                background: loading ? "#2A2F35" : "#FFFFFF",
                color: loading ? "#8E949A" : "#000000",
                fontSize: 13,
                fontWeight: 600,
                cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Analyse..." : "Generer maintenant"}
            </button>
          </div>
        </Card>
      </div>

      {report && (
        <div>
          <div
            style={{
              background: "#191C20",
              borderRadius: 12,
              border: "1px solid #2A2F35",
              padding: 20,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 10,
              }}
            >
              Synthese
            </div>
            <div
              style={{ fontSize: 13, lineHeight: 1.65, color: "#FFFFFF" }}
            >
              {report.summary}
            </div>
          </div>

          {report.kpi_changes && report.kpi_changes.length >= 1 && (
            <div
              style={{
                background: "#191C20",
                borderRadius: 12,
                border: "1px solid #2A2F35",
                padding: 20,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: 12,
                }}
              >
                Variations
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
              >
                {report.kpi_changes.map((kpi, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 140px",
                      padding: "12px",
                      borderRadius: 10,
                      background: "#0D0F12",
                      border: "1px solid #2A2F35",
                    }}
                  >
                    <div style={{ fontSize: 10, color: "#8E949A" }}>
                      {kpi.name}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {kpi.value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color:
                          kpi.status === "good"
                            ? "#21BF73"
                            : kpi.status === "bad"
                              ? "#D92027"
                              : "#8E949A",
                      }}
                    >
                      {kpi.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.recommendations && report.recommendations.length >= 1 && (
            <div
              style={{
                background: "#191C20",
                borderRadius: 12,
                border: "1px solid #2A2F35",
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: 12,
                }}
              >
                Recommandations
              </div>
              {report.recommendations.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px",
                    marginBottom: 6,
                    borderRadius: 10,
                    background: "#0D0F12",
                    border: "1px solid #2A2F35",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {rec.action}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#8E949A", marginTop: 3 }}
                  >
                    {`Impact : ${rec.impact}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
