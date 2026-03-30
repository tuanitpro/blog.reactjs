import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
type Props = {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const Modal = ({ title, open, onClose, children }: Readonly<Props>) => {
  return createPortal(
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
            className="relative w-full max-w-3xl h-[85vh] max-sm:h-[93vh] bg-bg-primary z-[9999] flex flex-col shadow-2xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-start bg-bg-primary border-b border-border shrink-0 px-6 py-4 gap-4">
              <h3
                className="flex-1 min-w-0 text-base font-semibold leading-snug text-foreground pt-0.5 line-clamp-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h3>
              <motion.button
                onClick={() => onClose?.()}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="shrink-0 w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/8 rounded-sm cursor-pointer transition-colors"
                aria-label="Đóng"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 prose dark:prose-invert max-w-none prose-headings:font-display">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
