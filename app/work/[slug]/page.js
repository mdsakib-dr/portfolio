import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import CaseStudy from "@/components/CaseStudy";

// One static route per case study. Adding a project to `caseStudies` in
// lib/data.js is all it takes to publish its page.
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const study = caseStudies[params.slug];
  if (!study) return {};
  return {
    title: `${study.name} — ${study.category}`,
    description: study.tagline,
    openGraph: {
      title: `${study.name} — ${study.category}`,
      description: study.tagline,
      type: "article",
    },
  };
}

export default function Page({ params }) {
  const study = caseStudies[params.slug];
  if (!study) notFound();
  return <CaseStudy study={study} />;
}
