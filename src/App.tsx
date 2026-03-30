import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  ScrollRestoration,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, motion } from "motion/react";

import Sidebar from "@components/Sidebar";
import ErrorBoundary from "@components/ErrorBoundary";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Category from "./pages/category";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Mobile: reserves height for fixed top bar. Desktop: reserves width for fixed sidebar. */}
      <div className="h-16 shrink-0 lg:h-auto lg:w-72 lg:flex-none" aria-hidden="true" />

      <Sidebar />
      <main className="flex-1 min-w-0 max-w-3xl px-0 py-8 lg:py-6 relative z-10">
        <ErrorBoundary>
          <ScrollRestoration />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: ":slug",
        element: <Category />,
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
