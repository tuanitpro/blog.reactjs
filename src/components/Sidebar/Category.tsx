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
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCache<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;
  try {
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return undefined;
    }
    return data as T;
  } catch {
    return undefined;
  }
}

function writeCache(key: string, data: unknown): void {
  localStorage.setItem(
    key,
    JSON.stringify({ data, expiresAt: Date.now() + CACHE_TTL_MS })
  );
}

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
      request(import.meta.env.VITE_GRAPHQL_ENDPOINT, categoriesQuery),
    initialData: readCache<root>(CACHE_KEY),
  });

  if (data && isFetched) {
    writeCache(CACHE_KEY, data);
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
