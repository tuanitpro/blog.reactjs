import React from "react";

const Footer = () => {
  return (
    <React.Suspense fallback={null}>
      <footer className="mt-auto px-5 py-4 border-t border-border">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-foreground/30 tracking-wide">
            © {new Date().getFullYear()} Tuấn
          </span>
          <a
            className="text-[10px] text-foreground/35 hover:text-accent transition-colors duration-200 tracking-wide"
            href="https://tuanitpro.com/privacy-policy/"
            rel="privacy-policy"
          >
            Privacy
          </a>
        </div>
      </footer>
    </React.Suspense>
  );
};

export default Footer;
