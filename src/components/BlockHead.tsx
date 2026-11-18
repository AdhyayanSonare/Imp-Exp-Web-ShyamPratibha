import type { ReactNode } from "react";

export default function BlockHead({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <header className="block-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {aside && <p className="block-aside">{aside}</p>}
    </header>
  );
}
