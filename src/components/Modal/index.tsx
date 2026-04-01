import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Props = {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  content?: string;
};

const Modal = ({ title, open, onClose, children, content }: Readonly<Props>) => {
  const html = content
    ? DOMPurify.sanitize(marked(content) as string)
    : null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-background z-[9998] flex flex-col"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-8 md:px-12 md:py-12 border-b border-border/30 shrink-0">
            <div className="flex-1 min-w-0">
              <span className="micro-label text-accent mb-2 block">Article</span>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight text-foreground text-display tracking-tight italic">
                {title}
              </h3>
            </div>
            <motion.button
              onClick={() => onClose?.()}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full cursor-pointer transition-colors border border-border/30"
              aria-label="Đóng"
            >
              <X size={24} className="md:w-8 md:h-8" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-8 pb-12 md:px-12 md:pt-12 md:pb-20">
            <div className="max-w-4xl mx-auto prose dark:prose-invert max-w-none prose-headings:text-display prose-headings:italic prose-headings:tracking-tight prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-xl">
              {html
                ? <div dangerouslySetInnerHTML={{ __html: html }} />
                : children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
