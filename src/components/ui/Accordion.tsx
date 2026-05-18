import { useEffect, useRef, useState, type ReactNode } from "react";

interface AccordionProps {
  title: string;
  accent: string;
  open: boolean;
  toggle: () => void;
  badge?: ReactNode;
  children: ReactNode;
}

export function Accordion({ title, accent, open, toggle, badge, children }: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        marginBottom: 6,
        borderRadius: 10,
        background: "#fff",
        border: `1.5px solid ${open ? accent + "55" : "#E5E7EB"}`,
        boxShadow: open ? "0 2px 10px rgba(0,0,0,.07)" : "none",
        transition: "all .25s",
      }}
    >
      <button
        type="button"
        onClick={toggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 13px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#111827" }}>{title}</span>
        {badge}
        <span
          style={{
            fontSize: 10,
            color: "#9CA3AF",
            transform: open ? "rotate(90deg)" : "none",
            transition: "transform .25s",
          }}
        >
          ▶
        </span>
      </button>
      <div
        style={{
          height: open ? height : 0,
          overflow: "hidden",
          transition: "height .4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div ref={contentRef} style={{ padding: "0 13px 11px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
