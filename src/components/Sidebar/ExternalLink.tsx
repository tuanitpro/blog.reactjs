type node = {
  url: string;
  label: string;
};

const menus: node[] = [
  {
    label: "GitHub",
    url: "https://github.com/tuanitpro",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/tuanitpro/",
  },
  {
    label: "Twitter",
    url: "https://x.com/tuanitpro",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/tuanitpro",
  },
  {
    label: "ANTT.Tech",
    url: "https://antt.tech",
  },
  {
    label: "NICEONE.vn",
    url: "https://niceone.vn",
  },
  {
    label: "ChatBot AI",
    url: "https://chat.antt.tech",
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
            <li key={crypto.randomUUID()}>
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
