/**
 * JsonLd — SoftwareApplication structured data.
 *
 * No `aggregateRating` here — inventing review counts is treated as spam
 * by Google's structured-data guidelines. Add it once real reviews exist.
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Turf Cricket Manager",
    applicationCategory: "SportsApplication",
    operatingSystem: "Android 8.0+",
    softwareVersion: "1.0.0",
    description:
      "Offline-first turf and box-cricket tournament management app with a compiled Rust scoring engine.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Webtrendz Technologies",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
