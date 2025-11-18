import { Outlet, Route, Routes } from "react-router";
import "./styles/App.css";
import "./styles/media-query.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Sidebar from "@components/Sidebar";

import Home from "./routes/home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Category from "./routes/category";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <div id="content" className="site-content">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path=":slug" element={<Category />} />
            </Routes>
            <Outlet />
          </main>
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
