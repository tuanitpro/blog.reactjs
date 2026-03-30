import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import Logo from "@components/Logo";
import Hero from "@components/Hero";
import Navigation from "@components/Navigation";
import Category from "./Category";
import ExternalLink from "./ExternalLink";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [isVisible, setIsVisible] = useState(!(isMobile || isTablet));

  const toggleVisibility = () => {
    if (!isMobile && !isTablet) return;
    setIsVisible(!isVisible);
  };

  const isSmall = isMobile || isTablet;

  return (
    <div className="sidebar" style={{ bottom: "auto" }}>
      <div className="sidebar-scroll-container">
        <header className="site-header">
          <div className="site-branding">
            <Logo />
            <Hero />
            {isSmall && (
              <div className="navigation-icon">
                {isVisible ? (
                  <IoClose size={48} onClick={toggleVisibility} />
                ) : (
                  <IoMenu size={48} onClick={toggleVisibility} />
                )}
              </div>
            )}
          </div>
        </header>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="secondary"
              initial={{ opacity: 0, x: isSmall ? "-100%" : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSmall ? "-100%" : 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Navigation toggleVisibility={toggleVisibility} />
              <aside className="widget widget_block widget_search">
                <form
                  role="search"
                  method="get"
                  action={import.meta.env.VITE_BLOG_URL}
                >
                  <input placeholder="Search" type="search" name="s" />
                </form>
              </aside>
              <Category toggleVisibility={toggleVisibility} />
              <ExternalLink />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
