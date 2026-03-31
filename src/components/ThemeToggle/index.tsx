import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@contexts/ThemeContext";

const ThemeToggle = ({ showLabel = false }: { showLabel?: boolean }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-box/50 border border-border/50 text-foreground/60 hover:text-accent transition-colors cursor-pointer ${showLabel ? 'w-auto' : 'w-10 h-10 justify-center'}`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {showLabel && <span className="text-[10px] font-bold tracking-wider uppercase">{theme === 'light' ? 'Dark' : 'Light'}</span>}
    </motion.button>
  );
};

export default ThemeToggle;
