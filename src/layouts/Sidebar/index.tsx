import React, { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useMediaQuery } from "react-responsive";
import Logo from "@components/Logo";
import Hero from "../../components/Hero";
import Navigation from "../../components/Navigation";
import Category from "./Category";
import ExternalLink from "./ExternalLink";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const [isVisible, setIsVisible] = useState(!isMobile);

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
            {isMobile && (
              <div className="navigation-icon">
                {isVisible ? (
                  <IonIcon
                    name="close"
                    size="large"
                    onClick={toggleVisibility}
                  />
                ) : (
                  <IonIcon
                    name="menu"
                    size="large"
                    onClick={toggleVisibility}
                  />
                )}
              </div>
            )}
          </header>
          {isVisible && (
            <div className="secondary">
              <Navigation toggleVisibility={toggleVisibility} />

              <div className="widget-area">
                <aside className="widget widget_block widget_search">
                  <form
                    role="search"
                    method="get"
                    action="https://blog.tuanitpro.com/"
                  >
                    <div className="wp-block-search__inside-wrapper ">
                      <input
                        className="wp-block-search__input"
                        placeholder="Search"
                        type="search"
                        name="s"
                      />
                    </div>
                  </form>
                </aside>
                <Category />
                <ExternalLink />
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Suspense>
  );
};

export default Sidebar;
