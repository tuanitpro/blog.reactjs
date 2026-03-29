import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const PageLayout = ({ title, children }: Readonly<Props>) => {
  return (
    <>
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
    </>
  );
};

export default PageLayout;
