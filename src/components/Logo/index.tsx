import { motion } from "motion/react";
import { Link } from "react-router";
import logo from "@static/image/logo.jpg";

const Logo = () => {
  return (
    <Link to="/" rel="home" className="block shrink-0">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        <img
          width="248"
          height="248"
          src={logo}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-border hover:ring-accent transition-[box-shadow,ring-color] duration-300"
          alt="Tuấn"
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
