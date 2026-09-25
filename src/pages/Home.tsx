import { Hero3D } from '../components/sections/Hero3D';
import { BearingSearch } from '../components/sections/BearingSearch';
import { MotionSection } from '../components/sections/MotionSection';
import { StatsSection } from '../components/sections/StatsSection';
import { Products3D } from '../components/sections/Products3D';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { ApplicationsSection } from '../components/sections/ApplicationsSection';
import { QualitySection } from '../components/sections/QualitySection';
import { TechnologySection } from '../components/sections/TechnologySection';
import { PerformanceSection } from '../components/sections/PerformanceSection';
import { GlobalPresence } from '../components/sections/GlobalPresence';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';
import { company, stats } from '../data/company';

export function Home() {
  useSeo({
    title: 'Precision Bearing Solutions',
    description:
    'KHS-LG — precision bearing solutions engineered for reliable motion. 50+ years of experience, 12,000+ OEMs served, 4,500+ products, exporting to 35+ countries.',
    path: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.legalName,
      alternateName: 'KHS-LG',
      url: company.website,
      email: company.email,
      telephone: company.phone,
      slogan: 'Precision in Motion',
      description: company.intro,
      knowsAbout: stats.map((s) => `${s.value}${s.suffix} ${s.label}`)
    }
  });

  return (
    <main>
      <Hero3D />
      <BearingSearch />
      <MotionSection />
      <StatsSection />
      <Products3D limit={6} />
      <IndustriesSection />
      <ApplicationsSection />
      <QualitySection />
      <TechnologySection />
      <PerformanceSection />
      <GlobalPresence />
      <CTASection />
    </main>);

}