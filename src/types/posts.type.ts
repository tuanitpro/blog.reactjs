export type featuredImage = {
  node: {
    mediaItemUrl: string;
  };
};

export type post = {
  excerpt: string;
  content: string;
  id: string;
  title: string;
  slug: string;
  link: string;
  featuredImage: featuredImage;
};

export type root = {
  posts: {
    nodes: post[];
    pageInfo: pageInfo;
  };
};

export type pageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};
