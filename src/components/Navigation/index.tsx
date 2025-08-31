import { Link, useLocation } from "react-router";
type Props = {
  toggleVisibility?: () => void;
};
const Navigation = ({ toggleVisibility }: Props) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "TRANG CHỦ",
      link: "/",
    },
    {
      name: "TÔI LÀ AI",
      link: "/about",
    },
    {
      name: "TÔI GIÚP ĐỠ",
      link: "/contact",
    },
    {
      name: "TÔI LÀM VIỆC",
      link: "https://khoahoc.tuanitpro.com",
      external: true,
    },
    {
      name: "MY CV",
      link: "https://cv.tuanitpro.com",
      external: true,
    },
  ];

  return (
    <nav className="main-navigation">
      <div className="menu-main-menu-container">
        <ul id="menu-main-menu" className="nav-menu">
          {menuItems?.map((i) => {
            return (
              <li
                key={i.name}
                className={`menu-item ${
                  location?.pathname === i.link ? "menu-active" : ""
                }`}
              >
                <Link
                  to={i.link}
                  onClick={() =>
                    i?.external ? undefined : toggleVisibility?.()
                  }
                >
                  {i.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
