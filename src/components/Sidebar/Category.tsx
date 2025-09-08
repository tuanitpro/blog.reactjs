import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";

type node = {
  id: string;
  name: string;
  link: string;
};

type categories = {
  nodes: node[];
};

type root = {
  categories: categories;
};

const CACHE_KEY = "categories";

const Category = () => {
  const categoriesQuery = gql`
    {
      categories {
        nodes {
          id
          name
          link
        }
      }
    }
  `;

  const { data, isPending, isFetched } = useQuery<root>({
    queryKey: ["categories"],
    queryFn: () =>
      request("https://blog.tuanitpro.com/graphql", categoriesQuery),
    initialData: localStorage.getItem(CACHE_KEY)
      ? JSON.parse(localStorage.getItem(CACHE_KEY) as string)
      : undefined,
  });

  if (data && isFetched) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <aside className="widget widget_block widget_categories">
        <h2 className="widget-title">Blog</h2>

        {isPending && <Loader />}
        <nav className="menu-blog-hay-container" aria-label="Blog">
          {data && (
            <ul className="wp-block-categories-list wp-block-categories">
              {data?.categories?.nodes?.map((c) => {
                return (
                  <li key={c.id} className={`cat-item cat-item-${c.id}`}>
                    <a href={c.link}>{c.name}</a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
    </React.Suspense>
  );
};

export default Category;
