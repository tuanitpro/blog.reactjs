
type node = {
  id: string;
  url: string;
  label: string;
};

const menus: node[] = [
  {
    id: "dGVybToxMw==",
    label: "GitHub",
    url: "https://github.com/tuanitpro",
  },
  {
    id: "dGVybToxNA==",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/tuanitpro/",
  },
  {
    id: "dGVybToxNQ==",
    label: "Twitter",
    url: "https://x.com/tuanitpro",
  },
  {
    id: "dGVybToxNg==",
    label: "Facebook",
    url: "https://www.facebook.com/tuanitpro",
  },
  {
    id: "dGVybToxNw==",
    label: "ANTT.Tech",
    url: "https://antt.tech",
  },
  {
    id: "dGVybToxOA==",
    label: "NICEONE.vn",
    url: "https://niceone.vn",
  },
];

const ExternalLink = () => {
  return (
    <aside className="px-6 py-6 border-t border-border/30">
      <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/30 mb-4">
        Liên kết
      </h2>

      <nav aria-label="Liên kết">
        <ul className="space-y-0.5 list-none m-0 p-0">
          {menus.map((c) => (
            <li key={c.id}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer nofollow"
                className="group flex items-center justify-between py-1 text-sm font-medium text-foreground/55 hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {c.label}
                <span className="opacity-0 group-hover:opacity-40 transition-opacity text-xs">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ExternalLink;
