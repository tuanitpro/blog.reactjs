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
    <nav className="px-6 py-6">
      <ul className="space-y-4 list-none m-0 p-0">
        {menuItems?.map((item, index) => {
          const isActive = location?.pathname === item.link;
          return (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                to={item.link}
                onClick={() => (item?.external ? undefined : toggleVisibility?.())}
                className={`
                  group flex items-center justify-between py-1 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300
                  ${isActive
                    ? "text-accent"
                    : "text-foreground/40 hover:text-foreground"
                  }
                `}
              >
                <span className="relative">
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                {item.external && (
                  <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
                    ↗
                  </span>
                )}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
