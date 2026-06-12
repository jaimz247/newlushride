export function generateFAQSchema(faqs: { question: string; answer: string }[], url: string = "https://lushride.com") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
