import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {X} from "lucide-react";
type Props = {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const Modal = ({ title, open, onClose, children }: Readonly<Props>) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
          <motion.div
            className="relative w-full max-w-3xl h-[80vh] max-sm:h-[90vh] bg-bg-secondary z-[9999] flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center bg-bg-secondary border-b border-border shrink-0">
              <h3 className="flex-1 min-w-0 px-4 text-sm font-semibold truncate text-foreground">
                {title}
              </h3>
              <motion.button
                onClick={() => onClose?.()}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "tween", duration: 0.1 }}
                className="h-full px-4 border-l border-border cursor-pointer bg-transparent hover:bg-foreground/5 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 prose dark:prose-invert max-w-none">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
