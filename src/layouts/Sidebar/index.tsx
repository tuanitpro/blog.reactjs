import React, { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useMediaQuery } from "react-responsive";
import Logo from "@components/Logo";
import Hero from "../../components/Hero";
import Navigation from "../../components/Navigation";

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
                <aside className="widget widget_block widget_categories">
                   <h2 className="widget-title">Blog</h2>
                  <nav
                    className="menu-blog-hay-container"
                    aria-label="Blog"
                  >
                  <ul className="wp-block-categories-list wp-block-categories">
                    {" "}
                    <li className="cat-item cat-item-6">
                      <a href="https://blog.tuanitpro.com/category/dot-net/">.NET</a>
                    </li>
                    <li className="cat-item cat-item-8">
                      <a href="https://blog.tuanitpro.com/category/cuoc-song/">
                        Cuộc sống
                      </a>
                    </li>
                    <li className="cat-item cat-item-47">
                      <a href="https://blog.tuanitpro.com/category/database/">
                        Database
                      </a>
                    </li>
                    <li className="cat-item cat-item-7">
                      <a href="https://blog.tuanitpro.com/category/design-pattern/">
                        Design Pattern
                      </a>
                    </li>
                    <li className="cat-item cat-item-57">
                      <a href="https://blog.tuanitpro.com/category/lap-trinh/">
                        Lập trình
                      </a>
                    </li>
                    <li className="cat-item cat-item-11">
                      <a href="https://blog.tuanitpro.com/category/mobile-app/">
                        Mobile App
                      </a>
                    </li>
                    <li className="cat-item cat-item-12">
                      <a href="https://blog.tuanitpro.com/category/sql/">SQL</a>
                    </li>
                    <li className="cat-item cat-item-9">
                      <a href="https://blog.tuanitpro.com/category/startup/">
                        Startup
                      </a>
                    </li>
                    <li className="cat-item cat-item-1">
                      <a href="https://blog.tuanitpro.com/category/uncategorized/">
                        Uncategorized
                      </a>
                    </li>
                    <li className="cat-item cat-item-10">
                      <a href="https://blog.tuanitpro.com/category/web-app/">
                        Web App
                      </a>
                    </li>
                  </ul>
                  </nav>
                </aside>

                <aside className="widget widget_nav_menu">
                  <h2 className="widget-title">Liên kết</h2>
                  <nav
                    className="menu-blog-hay-container"
                    aria-label="Liên kết"
                  >
                    <ul id="menu-blog-hay" className="menu">
                      <li
                        id="menu-item-387"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-387"
                      >
                        <a href="https://roadmap.sh/">Developer Roadmaps</a>
                      </li>
                      <li
                        id="menu-item-88"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-88"
                      >
                        <a href="https://github.com/justinamiller/SoftwareArchitect">
                          Software Architect
                        </a>
                      </li>
                      <li
                        id="menu-item-452"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-452"
                      >
                        <a href="https://nestjs.com/">Nest JS</a>
                      </li>
                      <li
                        id="menu-item-304"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-304"
                      >
                        <a href="https://ngochieu.com/">NgocHieu.com</a>
                      </li>
                      <li
                        id="menu-item-305"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-305"
                      >
                        <a href="https://toidicodedao.com/">ToiDiCodeDao</a>
                      </li>
                    </ul>
                  </nav>
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Suspense>
  );
};

export default Sidebar;
