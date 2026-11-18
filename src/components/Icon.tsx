/* Inline SVG sprite (rendered once in <App/>) + <Icon name="..."/> to reference it. */

const PATHS = {
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  package: <><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
  container: <><rect x="2.5" y="6" width="19" height="12" rx="1.5" /><path d="M7 9v6M11 9v6M15 9v6M19 9v6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-ur": <path d="M7 17 17 7M8 7h9v9" />,
  chev: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />,
  leaf: <><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 13 11" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  ship: <><path d="M3 15h18l-2.5 4.5h-13L3 15Z" /><path d="M6 15V9h12v6M9 9V5h6v4" /></>,
  plane: <path d="M10.5 13.5 4 11l1.5-1.5 7 1 4-4c1-1 2.6-1.3 3.2-.7.6.6.3 2.2-.7 3.2l-4 4 1 7L14.5 21 12 14.5l-3 3V20l-1.5 1-1-3.5L3 16.5 4 15h2.5l3-3" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.5-3.6 3.2-6 6.5-6s6 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2 .8 3.3 2.9 3.5 5.7" /></>,
  cap: <><path d="m12 4 10 5-10 5L2 9l10-5Z" /><path d="M6 11v5c2 2.5 10 2.5 12 0v-5M22 9v6" /></>,
  shield: <><path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  menu: <path d="M4 8h16M4 16h16" />,
} as const;

export type IconName = keyof typeof PATHS;

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {(Object.keys(PATHS) as IconName[]).map((name) => (
          <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">
            {PATHS[name]}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
