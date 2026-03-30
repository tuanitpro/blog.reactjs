import React from "react";

const Footer = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <footer className="mt-auto px-5 py-4 border-t border-border">
        <div className="flex flex-col gap-1">
          <a
            className="text-xs text-foreground/50 hover:text-foreground transition-colors"
            href="https://tuanitpro.com/privacy-policy/"
            rel="privacy-policy"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </React.Suspense>
  );
};

export default Footer;
