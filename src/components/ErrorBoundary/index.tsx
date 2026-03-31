import React, { ErrorInfo } from "react";
import { AlertCircle, RefreshCcw, Home, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Props = { children: React.ReactNode };
type State = { 
  hasError: boolean; 
  error: Error | null; 
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    localStorage.clear();
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-bg-primary/50 backdrop-blur-sm rounded-sm border border-border/30">
          <div className="max-w-2xl w-full text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-8">
                <AlertCircle size={40} />
              </div>
              
              <span className="micro-label text-accent mb-4 block opacity-60">System Error</span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground text-display tracking-tighter italic mb-6 leading-tight">
                Oops! Something went wrong.
              </h2>
              
              <p className="text-foreground/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                An unexpected error occurred while rendering this page. We&apos;ve been notified and are looking into it.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={this.handleReset}
                  className="flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-tight hover:bg-accent/90 transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCcw size={18} />
                  Try Again
                </button>
                <a
                  href="/"
                  className="flex items-center gap-2 bg-foreground/5 text-foreground px-8 py-4 rounded-sm font-bold tracking-tight hover:bg-foreground/10 transition-all active:scale-95 border border-border/30 cursor-pointer"
                >
                  <Home size={18} />
                  Go Home
                </a>
              </div>

              {/* Technical Details */}
              <div className="mt-16 pt-8 border-t border-border/30 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="flex items-center gap-2 text-foreground/40 hover:text-foreground text-sm font-mono transition-colors uppercase tracking-widest mb-4"
                >
                  {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {this.state.showDetails ? "Hide" : "Show"} Technical Details
                </button>
                
                <AnimatePresence>
                  {this.state.showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-box p-6 rounded-sm border border-border/30 font-mono text-xs text-foreground/70 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        <p className="text-destructive font-bold mb-2">
                          {this.state.error?.toString()}
                        </p>
                        <p className="opacity-50">
                          {this.state.errorInfo?.componentStack}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
