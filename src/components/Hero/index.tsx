import { motion } from "motion/react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="min-w-0">
      <h2 className="leading-none">
        <Link
          to="/"
          rel="home"
          className="text-foreground hover:text-accent transition-colors duration-300 text-4xl font-bold tracking-tighter text-display italic"
        >
          Tuấn
        </Link>
      </h2>
      <motion.p
        className="mt-2 text-[10px] text-foreground/50 leading-snug hidden lg:block font-semibold tracking-[0.1em] uppercase"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn
      </motion.p>
    </div>
  );
};

export default Hero;
