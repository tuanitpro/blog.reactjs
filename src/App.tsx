import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";
import "./styles/media-query.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "motion/react";

import Sidebar from "@components/Sidebar";
import ErrorBoundary from "@components/ErrorBoundary";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Category from "./pages/category";
import { useScrollToTop } from "./hooks/useScrollToTop";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  const location = useLocation();

  return (
    <>
      <Sidebar />
      <div id="content" className="site-content">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path=":slug" element={<Category />} />
                </Routes>
              </AnimatePresence>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
