import { motion } from "motion/react";
import { Link, useLocation } from "react-router";

type Props = {
  toggleVisibility?: () => void;
};

const menuItems = [
  { name: "TRANG CHỦ", link: "/" },
  { name: "TÔI LÀ AI", link: "/about" },
  { name: "TÔI GIÚP ĐỠ", link: "/contact" },
  { name: "KHOÁ HỌC", link: "https://khoahoc.tuanitpro.com", external: true },
  { name: "TÔI LÀM VIỆC", link: "https://antt.tech", external: true },
  { name: "MY CV", link: "https://www.linkedin.com/in/tuanitpro/", external: true },
];

const Navigation = ({ toggleVisibility }: Props) => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="menu-main-menu-container">
        <ul id="menu-main-menu" className="nav-menu">
          {menuItems?.map((i, index) => (
            <motion.li
              key={i.name}
              className={`menu-item ${location?.pathname === i.link ? "menu-active" : ""}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
            >
              <motion.div whileHover={{ x: 4 }} transition={{ type: "tween", duration: 0.15 }}>
                <Link
                  to={i.link}
                  onClick={() => (i?.external ? undefined : toggleVisibility?.())}
                >
                  {i.name}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
