import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

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

  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      request("https://blog.tuanitpro.com/graphql", categoriesQuery),
    select: (res) => res?.categories?.nodes,
  });

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <aside className="widget widget_block widget_categories">
        <h2 className="widget-title">Blog</h2>

        {isPending && "Loading..."}
        <nav className="menu-blog-hay-container" aria-label="Blog">
          {data && (
            <ul className="wp-block-categories-list wp-block-categories">
              {data?.map((c) => {
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
