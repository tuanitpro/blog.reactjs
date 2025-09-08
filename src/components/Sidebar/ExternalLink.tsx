import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";

type node = {
  id: string;
  url: string;
  label: string;
};

type menu = {
  menuItems: {
    nodes: node[];
  };
};

type root = {
  menu: menu;
};

const CACHE_KEY = "menus";

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

  const { data, isPending, isFetched } = useQuery<root>({
    queryKey: ["menuItems"],
    queryFn: () =>
      request("https://blog.tuanitpro.com/graphql", menuItemsQuery),
    initialData: localStorage.getItem(CACHE_KEY)
      ? JSON.parse(localStorage.getItem(CACHE_KEY) as string)
      : undefined,
  });

  if (data && isFetched) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <aside className="widget widget_block widget_nav_menu">
        <h2 className="widget-title">Liên kết</h2>

        {isPending && <Loader />}
        <nav className="menu-blog-hay-container" aria-label="Liên kết">
          {data && (
            <ul className="menu">
              {data?.menu?.menuItems?.nodes?.map((c) => {
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
