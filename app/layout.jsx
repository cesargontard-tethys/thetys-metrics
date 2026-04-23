import FirebaseAnalytics from "@/app/components/FirebaseAnalytics";

export const metadata = {
  title: "THETYS METRICS",
  description: "Dashboard métriques EdTech",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, WebkitFontSmoothing: "antialiased" }}>
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
