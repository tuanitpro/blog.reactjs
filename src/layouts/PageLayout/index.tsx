import React from "react";

type Props = {
  title: string;
  children: React.ReactElement;
};

const PageLayout = ({ title, children }: Readonly<Props>) => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <title>{title}</title>
      <meta name="author" content="Tuấn" />
      <meta
        name="keywords"
        content="React, JavaScript, semantic markup, html"
      />
      <meta
        name="description"
        content="Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn"
      />
      <div className="__Layout">{children}</div>
    </React.Suspense>
  );
};

export default PageLayout;
