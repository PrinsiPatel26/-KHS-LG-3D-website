import { PageHero } from '../components/layout/PageHero';
import { TechnologySection } from '../components/sections/TechnologySection';
import { ProductExplorer } from '../components/sections/ProductExplorer';
import { PerformanceSection } from '../components/sections/PerformanceSection';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';

export function Technology() {
  useSeo({
    title: 'Technology',
    description:
    'KHS-LG products and services are high technology, assisting manufacturers in their product design across a 4,500+ product bearing range.',
    path: '/technology'
  });

  return (
    <main>
      <PageHero
        code="Technology"
        eyebrow="Engineering behind the range"
        lines={['Precision is', 'A process']}
        body="High technology products and services that support manufacturers from product design through to the bearing that ships."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Technology' }]} />
      
      <TechnologySection hideHeading />
      <ProductExplorer
        title={['Engineering', 'Every component']}
        code="EXP / TECH" />
      
      <PerformanceSection />
      <CTASection />
    </main>);

}