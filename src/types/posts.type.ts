export type post = {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    image: string;
  };
};

export type ApiPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type ApiPostsResponse = {
  items: post[];
  pagination: ApiPagination;
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
  order: number;
  parent: ApiCategory | null;
};
