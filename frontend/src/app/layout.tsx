import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script, Raleway } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { hotelJsonLd, organizationJsonLd, restaurantJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Shamyana Hotel & Restaurant · Boulevard Road, Srinagar",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Hotel Shamyana Srinagar",
    "Shamyana Restaurant Srinagar",
    "Hotel near Dal Lake Srinagar",
    "Hotel on Boulevard Road Srinagar",
    "Kashmiri Wazwan restaurant Srinagar",
    "Restaurant near Dal Lake",
    "Shamyana Lodge and Restaurant",
    "3-star hotel Srinagar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Shamyana Hotel & Restaurant · Srinagar",
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dal Lake at dusk, near Shamyana on Boulevard Road, Srinagar" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  robots: { index: true, follow: true, "max-image-preview": "large" } as Metadata["robots"],
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#f3ece2",
  width: "device-width",
  initialScale: 1,
};

/**
 * Adds `js` to <html> before paint so reveal animations can hide content only
 * when JavaScript is actually running.
 */
const jsDetect = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" id="top" className={`${cormorant.variable} ${raleway.variable} ${pinyon.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsDetect }} />
      </head>
      <body className="flex min-h-svh flex-col pb-14 lg:pb-0">
        <JsonLd data={[organizationJsonLd(), hotelJsonLd(), restaurantJsonLd()]} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
