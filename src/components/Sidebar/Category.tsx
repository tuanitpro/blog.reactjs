import React from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";
import { Link, useLocation } from "react-router";

type node = {
  id: string;
  name: string;
  link: string;
  slug: string;
};

type categories = {
  nodes: node[];
};

type root = {
  categories: categories;
};

const CACHE_KEY = "categories";

type Props = {
  toggleVisibility?: () => void;
};

const Category = ({ toggleVisibility }: Props) => {
  const location = useLocation();
  const categoriesQuery = gql`
    {
      categories {
        nodes {
          id
          name
          link
          slug
        }
      }
    }
  `;

  const { data, isPending, isFetched } = useQuery<root>({
    queryKey: ["categories"],
    queryFn: () =>
      request(import.meta.env.REACT_APP_GRAPHQL_ENDPOINT, categoriesQuery),
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
                  <li
                    key={c.id}
                    className={`menu-item ${
                      location?.pathname.includes(c.slug) ? "menu-active" : ""
                    }`}
                  >
                    <Link to={c.slug} onClick={() => toggleVisibility?.()}>
                      {c.name}
                    </Link>
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
