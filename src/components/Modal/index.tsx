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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
          <motion.div
            className="relative w-full max-w-4xl h-[90vh] max-sm:h-[95vh] bg-background z-[9999] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm border border-border/30"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-start bg-background border-b border-border/30 shrink-0 px-8 py-8 gap-8">
              <div className="flex-1 min-w-0">
                <span className="micro-label text-accent mb-2 block">Article</span>
                <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-foreground text-display tracking-tight italic">
                  {title}
                </h3>
              </div>
              <motion.button
                onClick={() => onClose?.()}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="shrink-0 w-12 h-12 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full cursor-pointer transition-colors border border-border/30"
                aria-label="Đóng"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10 prose dark:prose-invert max-w-none prose-headings:text-display prose-headings:italic prose-headings:tracking-tight prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-lg">
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
