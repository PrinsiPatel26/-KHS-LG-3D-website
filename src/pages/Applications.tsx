import { PageHero } from '../components/layout/PageHero';
import { ApplicationsSection } from '../components/sections/ApplicationsSection';
import { PerformanceSection } from '../components/sections/PerformanceSection';
import { ProductExplorer } from '../components/sections/ProductExplorer';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';

export function Applications() {
  useSeo({
    title: 'Applications',
    description:
    'Where KHS-LG bearings work: industrial machinery, manufacturing equipment, automotive assemblies and automation systems.',
    path: '/applications'
  });

  return (
    <main>
      <PageHero
        code="Applications"
        eyebrow="Verified KHS-LG application areas"
        lines={['Where motion', 'Matters']}
        body="From plant machinery to automation systems, the KHS-LG range is specified around how the assembly actually moves."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Applications' }]} />
      
      <ApplicationsSection />
      <ProductExplorer />
      <PerformanceSection />
      <CTASection />
    </main>);

}