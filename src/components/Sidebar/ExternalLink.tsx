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
const CACHE_TTL_MS = 60 * 60 * 1000;

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

const ExternalLink = () => {
  const { data, isPending, isFetched } = useQuery<root>({
    queryKey: ["menuItems"],
    queryFn: () =>
      request(import.meta.env.VITE_GRAPHQL_ENDPOINT, menuItemsQuery),
    initialData: readCache<root>(CACHE_KEY),
  });

  if (data && isFetched) {
    writeCache(CACHE_KEY, data);
  }

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
