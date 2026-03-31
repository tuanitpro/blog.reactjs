import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";
import { useSearchQuery } from "@hooks/useSearchQuery";
import DOMPurify from "dompurify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
};

const SearchModal = ({ isOpen, onClose, initialQuery = "" }: Props) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  // Sync state with initialQuery when it changes (e.g. new search from sidebar)
  if (initialQuery !== prevInitialQuery) {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
    setPrevInitialQuery(initialQuery);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isPending } = useSearchQuery(debouncedQuery);
  const results = data?.posts?.nodes || [];

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-8 md:px-12 md:py-12 border-b border-white/10">
            <div className="flex-1 flex items-center gap-4 md:gap-8">
              <SearchIcon size={32} className="text-accent shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-transparent text-3xl md:text-5xl font-bold text-white outline-none placeholder:text-white/10 italic tracking-tighter"
              />
            </div>
            <button
              onClick={onClose}
              className="ml-8 p-4 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X size={40} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 py-12 md:px-12 md:py-20">
            <div className="max-w-4xl mx-auto">
              {isPending ? (
                <div className="flex flex-col gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex flex-col gap-4">
                      <div className="h-10 bg-white/5 w-3/4 rounded-sm" />
                      <div className="h-20 bg-white/5 w-full rounded-sm" />
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-16">
                  {results.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={`#${post.slug}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="flex items-start justify-between gap-8">
                          <div className="flex-1">
                            <span className="micro-label text-accent mb-2 block opacity-60">Result {(index + 1).toString().padStart(2, '0')}</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-accent transition-colors duration-300 italic tracking-tight leading-tight mb-4">
                              {post.title}
                            </h3>
                            <div
                              className="text-white/40 line-clamp-2 text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                            />
                          </div>
                          <div className="shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                            <ArrowRight size={32} className="text-accent" />
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              ) : debouncedQuery ? (
                <div className="text-center py-20">
                  <h2 className="text-4xl font-bold text-white/10 italic tracking-tighter">
                    Không tìm thấy kết quả cho &quot;{debouncedQuery}&quot;
                  </h2>
                </div>
              ) : (
                <div className="text-center py-20">
                  <h2 className="text-4xl font-bold text-white/10 italic tracking-tighter">
                    Bắt đầu nhập để tìm kiếm...
                  </h2>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SearchModal;
