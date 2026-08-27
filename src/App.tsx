import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { PageLoader } from './components/layout/PageLoader';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Industries } from './pages/Industries';
import { Applications } from './pages/Applications';
import { Technology } from './pages/Technology';
import { Quality } from './pages/Quality';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
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
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>);

}