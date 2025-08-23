import React from "react";

const Footer = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <footer id="colophon" className="site-footer">
        <div className="site-info">
          <a
            className="privacy-policy-link"
            href="https://tuanitpro.com/privacy-policy/"
            rel="privacy-policy"
          >
            Privacy Policy
          </a>
          <a href="https://wordpress.org/" className="imprint">
            Proudly powered by WordPress{" "}
          </a>
        </div>
      </footer>
    </React.Suspense>
  );
};

export default Footer;
