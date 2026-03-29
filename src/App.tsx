import { Outlet, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/media-query.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Sidebar from "@components/Sidebar";
import ErrorBoundary from "@components/ErrorBoundary";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Category from "./pages/category";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <div id="content" className="site-content">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path=":slug" element={<Category />} />
              </Routes>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
