import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";
import { Link, useLocation } from "react-router";
import { readCache, writeCache, CACHE_TTL_MS } from "@utils/cache";

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

type Props = {
  toggleVisibility?: () => void;
};

const Category = ({ toggleVisibility }: Props) => {
  const location = useLocation();

  const { data, isPending } = useQuery<root>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await request(
        import.meta.env.VITE_GRAPHQL_ENDPOINT,
        categoriesQuery
      );
      writeCache(CACHE_KEY, result);
      return result;
    },
    initialData: () => readCache<root>(CACHE_KEY),
    staleTime: CACHE_TTL_MS,
  });

  return (
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
  );
};

export default Category;
