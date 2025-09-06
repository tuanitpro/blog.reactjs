import React, { useState } from "react";

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
    setIsVisible(!isVisible); // Toggles between true and false
  };

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <div className="sidebar" style={{ bottom: "auto" }}>
        <div className="sidebar-scroll-container">
          <header className="site-header">
            <div className="site-branding">
              <Logo />
              <Hero />
            </div>
            {(isMobile || isTablet) && (
              <div className="navigation-icon">
                {isVisible ? (
                  <IoClose size={48} onClick={toggleVisibility} />
                ) : (
                  <IoMenu size={48} onClick={toggleVisibility} />
                )}
              </div>
            )}
          </header>
          {isVisible && (
            <div className="secondary">
              <Navigation toggleVisibility={toggleVisibility} />

              <aside className="widget widget_block widget_search">
                <form
                  role="search"
                  method="get"
                  action="https://blog.tuanitpro.com/"
                >
                  <input placeholder="Search" type="search" name="s" />
                </form>
              </aside>
              <Category />
              <ExternalLink />
            </div>
          )}
        </div>
      </div>
    </React.Suspense>
  );
};

export default Sidebar;
