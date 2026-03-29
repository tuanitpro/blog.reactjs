import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";
import { readCache, writeCache, CACHE_TTL_MS } from "@utils/cache";

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

const ExternalLink = () => {
  const { data, isPending } = useQuery<root>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const result = await request(
        import.meta.env.VITE_GRAPHQL_ENDPOINT,
        menuItemsQuery
      );
      writeCache(CACHE_KEY, result);
      return result;
    },
    initialData: () => readCache<root>(CACHE_KEY),
    staleTime: CACHE_TTL_MS,
  });

  return (
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
  );
};

export default ExternalLink;
