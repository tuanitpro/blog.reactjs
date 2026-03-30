import { motion } from "motion/react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="min-w-0">
      <h2 className="leading-none" style={{ fontFamily: "var(--font-display)" }}>
        <Link
          to="/"
          rel="home"
          className="text-foreground hover:text-accent transition-colors duration-300 text-3xl font-bold tracking-tight italic"
        >
          Tuấn
        </Link>
      </h2>
      <motion.p
        className="mt-1.5 text-[11px] text-foreground/45 leading-snug hidden lg:block font-medium tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn
      </motion.p>
    </div>
  );
};

export default Hero;
