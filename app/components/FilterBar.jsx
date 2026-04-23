"use client";

import { useState } from "react";

import { Segmented } from "@/app/components/ui";
import { colors } from "@/lib/theme";

const FILTER_OPTIONS = {
  ut: [
    { v: "all", l: "Tous" },
    { v: "free", l: "Gratuits" },
    { v: "prem", l: "Premium" },
    { v: "trial", l: "Essai" },
  ],
  pe: [
    { v: "7d", l: "7j" },
    { v: "30d", l: "30j" },
    { v: "90d", l: "90j" },
    { v: "all", l: "All time" },
  ],
  ch: [
    { v: "all", l: "Tous" },
    { v: "organic", l: "Organique" },
    { v: "meta", l: "Meta" },
    { v: "google", l: "Google" },
    { v: "tiktok", l: "TikTok" },
    { v: "asa", l: "ASA" },
  ],
  pl: [
    { v: "all", l: "Toutes" },
    { v: "ios", l: "iOS" },
    { v: "android", l: "Android" },
  ],
};

const COUNTRIES = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algerie", "Allemagne",
  "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie saoudite", "Argentine",
  "Armenie", "Australie", "Autriche", "Azerbaidjan", "Bahamas", "Bahrein",
  "Bangladesh", "Barbade", "Belgique", "Belize", "Benin", "Bhoutan",
  "Bielorussie", "Birmanie", "Bolivie", "Bosnie-Herzegovine", "Botswana",
  "Bresil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge",
  "Cameroun", "Canada", "Cap-Vert", "Centrafrique", "Chili", "Chine",
  "Chypre", "Colombie", "Comores", "Congo", "Coree du Nord", "Coree du Sud",
  "Costa Rica", "Cote d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti",
  "Dominique", "Egypte", "Emirats arabes unis", "Equateur", "Erythree",
  "Espagne", "Estonie", "Eswatini", "Etats-Unis", "Ethiopie", "Fidji",
  "Finlande", "France", "Gabon", "Gambie", "Georgie", "Ghana", "Grece",
  "Grenade", "Guatemala", "Guinee", "Guinee-Bissau", "Guinee equatoriale",
  "Guyana", "Haiti", "Honduras", "Hongrie", "Inde", "Indonesie", "Irak",
  "Iran", "Irlande", "Islande", "Israel", "Italie", "Jamaique", "Japon",
  "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweit",
  "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein",
  "Lituanie", "Luxembourg", "Macedoine du Nord", "Madagascar", "Malaisie",
  "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie",
  "Mexique", "Micronesie", "Moldavie", "Monaco", "Mongolie", "Montenegro",
  "Mozambique", "Namibie", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria",
  "Norvege", "Nouvelle-Zelande", "Oman", "Ouganda", "Ouzbekistan", "Pakistan",
  "Palaos", "Palestine", "Panama", "Papouasie-N-Guinee", "Paraguay", "Pays-Bas",
  "Perou", "Philippines", "Pologne", "Portugal", "Qatar",
  "Republique dominicaine", "Republique tcheque", "Roumanie", "Royaume-Uni",
  "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Sainte-Lucie", "Saint-Vincent",
  "Salomon", "Salvador", "Samoa", "Sao Tome-et-Principe", "Senegal", "Serbie",
  "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovenie", "Somalie",
  "Soudan", "Soudan du Sud", "Sri Lanka", "Suede", "Suisse", "Suriname",
  "Syrie", "Tadjikistan", "Tanzanie", "Tchad", "Thailande", "Timor oriental",
  "Togo", "Tonga", "Trinite-et-Tobago", "Tunisie", "Turkmenistan", "Turquie",
  "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam",
  "Yemen", "Zambie", "Zimbabwe",
];

const labelStyle = {
  fontSize: 10,
  fontWeight: 600,
  color: colors.sub,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 4,
};

function CountryDropdown({ countries, setCountries }) {
  const [open, setOpen] = useState(false);
  const allSelected = countries[0] === "all";

  function toggleCountry(country) {
    if (allSelected) {
      setCountries([country]);
      return;
    }
    if (countries.includes(country)) {
      const next = countries.filter((c) => c !== country);
      setCountries(next.length >= 1 ? next : ["all"]);
    } else {
      setCountries([...countries, country]);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={labelStyle}>Pays</div>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: "7px 16px",
          borderRadius: 24,
          fontSize: 12,
          fontWeight: 400,
          border: "none",
          background: "#191C20",
          cursor: "pointer",
          fontFamily: "inherit",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {allSelected ? "Tous les pays" : `${countries.length} pays`}
        <span style={{ fontSize: 8, color: "#FFFFFF", opacity: 0.6 }}>
          {"\u25BC"}
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(0,0,0,.6)",
            padding: 8,
            zIndex: 200,
            minWidth: 200,
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          <div
            onClick={() => setCountries(["all"])}
            style={{
              padding: "6px 10px",
              borderRadius: 5,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 2,
            }}
          >
            <Checkbox checked={allSelected} accent={colors.o1} />
            Tous les pays
          </div>
          <div
            style={{ height: 1, background: colors.border, margin: "4px 0" }}
          />
          {COUNTRIES.map((country) => {
            const selected =
              countries.includes(country) || allSelected;
            return (
              <div
                key={country}
                onClick={() => toggleCountry(country)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 5,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Checkbox checked={selected} accent={colors.pri} />
                {country}
              </div>
            );
          })}
        </div>
      )}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 199 }}
        />
      )}
    </div>
  );
}

function Checkbox({ checked, accent }) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: 3,
        border: `1.5px solid ${checked ? accent : colors.border}`,
        background: checked ? accent : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {checked && (
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>
          {"\u2713"}
        </span>
      )}
    </div>
  );
}

export function FilterBar({ filters, setFilters, countries, setCountries }) {
  const update = (key, value) =>
    setFilters({ ...filters, [key]: value });

  const activeFilterCount = [
    filters.ut !== "all",
    filters.pe !== "30d",
    filters.ch !== "all",
    filters.pl !== "all",
  ].filter(Boolean).length;

  function reset() {
    setFilters({ ut: "all", pe: "30d", ch: "all", pl: "all" });
    setCountries(["all"]);
  }

  return (
    <div
      style={{
        paddingBottom: 10,
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      <div>
        <div style={labelStyle}>Utilisateur</div>
        <Segmented
          opts={FILTER_OPTIONS.ut}
          val={filters.ut}
          set={(v) => update("ut", v)}
        />
      </div>
      <div>
        <div style={labelStyle}>Période</div>
        <Segmented
          opts={FILTER_OPTIONS.pe}
          val={filters.pe}
          set={(v) => update("pe", v)}
        />
      </div>
      <div>
        <div style={labelStyle}>Canal</div>
        <Segmented
          opts={FILTER_OPTIONS.ch}
          val={filters.ch}
          set={(v) => update("ch", v)}
        />
      </div>
      <div>
        <div style={labelStyle}>Plateforme</div>
        <Segmented
          opts={FILTER_OPTIONS.pl}
          val={filters.pl}
          set={(v) => update("pl", v)}
        />
      </div>

      <CountryDropdown countries={countries} setCountries={setCountries} />

      {countries[0] !== "all" && (
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          {countries.map((country) => (
            <span
              key={country}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 8px",
                borderRadius: 5,
                background: `${colors.pri}20`,
                color: colors.pri,
                fontSize: 10.5,
                fontWeight: 600,
              }}
            >
              {country}
              <span
                onClick={() => {
                  const next = countries.filter((c) => c !== country);
                  setCountries(next.length >= 1 ? next : ["all"]);
                }}
                style={{ cursor: "pointer", fontSize: 12, opacity: 0.7 }}
              >
                {"\u00d7"}
              </span>
            </span>
          ))}
        </div>
      )}

      {activeFilterCount >= 1 && (
        <button
          onClick={reset}
          style={{
            fontSize: 11,
            color: colors.bad,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontFamily: "inherit",
            marginBottom: 4,
          }}
        >
          {`Reset (${activeFilterCount})`}
        </button>
      )}
    </div>
  );
}
