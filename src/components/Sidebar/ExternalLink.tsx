import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const ExternalLink = () => {
  const menuItemsQuery = gql`
    {
      menu(id: "dGVybToxMw==") {
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  `;

  const { data, isPending } = useQuery({
    queryKey: ["menuItems"],
    queryFn: async () =>
      request("https://blog.tuanitpro.com/graphql", menuItemsQuery),
    select: (res: { menu: { menuItems: { nodes: any } } }) =>
      res?.menu?.menuItems?.nodes,
  });

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <aside className="widget widget_block widget_nav_menu">
        <h2 className="widget-title">Liên kết</h2>

        {isPending && "Loading..."}
        <nav className="menu-blog-hay-container" aria-label="Liên kết">
          {data && (
            <ul className="menu">
              {data?.map((c) => {
                return (
                  <li key={c.id} className={`menu-item-${c.id}`}>
                    <a href={c.url} target="_blank" rel="noreferrer nofollow">
                      {c.label}
                    </a>
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

export default ExternalLink;
