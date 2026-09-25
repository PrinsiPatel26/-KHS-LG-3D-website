import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { PageLoader } from './components/layout/PageLoader';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { ProductFamily } from './pages/ProductFamily';
import { Industries } from './pages/Industries';
import { Applications } from './pages/Applications';
import { Technology } from './pages/Technology';
import { Quality } from './pages/Quality';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogArticle } from './pages/BlogArticle';
import { Careers } from './pages/Careers';
import { Catalogue } from './pages/Catalogue';
import { CatalogueDetail } from './pages/CatalogueDetail';
import { NotFound } from './pages/NotFound';
import { OurBrands } from './pages/OurBrands';
import { BrandPage } from './pages/BrandPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export interface AppProps {
  /** Play the cinematic bearing loader before the site appears. */
  showIntroLoader?: boolean;
  /** Desktop precision cursor. */
  customCursor?: boolean;
}

export function App({ showIntroLoader = true, customCursor = true }: AppProps) {
  const [siteVisible, setSiteVisible] = useState(!showIntroLoader);
  const [loaderMounted, setLoaderMounted] = useState(showIntroLoader);

  return (
    <BrowserRouter>
      {loaderMounted &&
      <PageLoader
        onReveal={() => setSiteVisible(true)}
        onFinish={() => setLoaderMounted(false)} />

      }

      {siteVisible &&
      <div className="min-h-screen w-full bg-ink-950 animate-[fadeIn_400ms_ease-out]">
          {customCursor && <CustomCursor />}
          <Site />
        </div>
      }
    </BrowserRouter>);

}

function Site() {
  useSmoothScroll();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-signal focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:uppercase focus:text-ink-950">
        
        Skip to content
      </a>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductFamily />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/our-brands" element={<OurBrands />} />
          <Route path="/our-brands/:slug" element={<BrandPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/downloads" element={<Catalogue />} />
          <Route path="/downloads/catalogue" element={<Catalogue />} />
          <Route path="/downloads/catalogue/bearings" element={<Catalogue />} />
          <Route path="/downloads/catalogue/bearings/:slug" element={<CatalogueDetail />} />
          <Route path="/downloads/catalogue/v-belts" element={<Catalogue />} />
          <Route path="/downloads/catalogue/v-belts/:slug" element={<CatalogueDetail />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/bearings" element={<Catalogue />} />
          <Route path="/catalogue/v-belts" element={<Catalogue />} />
          <Route path="/catalogue/:slug" element={<CatalogueDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>);

}