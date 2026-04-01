import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  ScrollRestoration,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

import Sidebar from "@components/Sidebar";
import ErrorBoundary from "@components/ErrorBoundary";
import { ThemeProvider } from "@contexts/ThemeContext";

const PageFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Category = lazy(() => import("./pages/category"));

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Mobile: reserves height for fixed top bar. Desktop: reserves width for fixed sidebar. */}
      <div className="h-16 shrink-0 lg:h-auto lg:w-64 lg:flex-none" aria-hidden="true" />

      <Sidebar />
      
      <main className="flex-1 min-w-0 px-4 py-8 lg:px-12 lg:py-12 relative z-10 max-w-5xl">
        <ErrorBoundary>
          <ScrollRestoration />
          <Suspense fallback={<PageFallback />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {outlet}
              </motion.div>
            </AnimatePresence>
          </Suspense>
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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
