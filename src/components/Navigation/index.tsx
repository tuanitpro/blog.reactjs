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
    <nav className="px-5 py-4 border-t border-border">
      <ul className="space-y-1 list-none m-0 p-0">
        {menuItems?.map((item, index) => {
          const isActive = location?.pathname === item.link;
          return (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
            >
              <motion.div whileHover={{ x: 3 }} transition={{ type: "tween", duration: 0.15 }}>
                <Link
                  to={item.link}
                  onClick={() => (item?.external ? undefined : toggleVisibility?.())}
                  className={`
                    group flex items-center gap-2 py-1.5 text-[11px] font-semibold tracking-widest transition-colors duration-200
                    ${isActive
                      ? "text-accent border-l-2 border-accent pl-3 -ml-px"
                      : "text-foreground/50 hover:text-foreground pl-0"
                    }
                  `}
                >
                  {item.name}
                  {item.external && (
                    <span className="opacity-0 group-hover:opacity-60 transition-opacity text-[9px] translate-y-px">↗</span>
                  )}
                </Link>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
