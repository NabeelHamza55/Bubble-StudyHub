import { useEffect, useRef, useState, type ReactNode } from "react";
import { BRAND } from "../../theme/colors";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";

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
        marginBottom: SPACE.sm,
        borderRadius: RADIUS.md,
        background: BRAND.white,
        border: `1px solid ${open ? accent + "66" : BRAND.border}`,
        boxShadow: open ? "0 2px 8px rgba(0,0,0,.06)" : "none",
        transition: "border-color .2s, box-shadow .2s",
      }}
    >
      <button
        type="button"
        onClick={toggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: SPACE.md,
          padding: `${SPACE.md}px ${SPACE.lg}px`,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: accent,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            flex: 1,
            fontSize: TYPE.lg,
            fontWeight: 600,
            color: BRAND.text,
            lineHeight: 1.35,
          }}
        >
          {title}
        </span>
        {badge}
        <span
          style={{
            fontSize: TYPE.sm,
            color: "#9CA3AF",
            transform: open ? "rotate(90deg)" : "none",
            transition: "transform .25s",
            flexShrink: 0,
          }}
          aria-hidden
        >
          ▶
        </span>
      </button>
      <div
        style={{
          height: open ? height : 0,
          overflow: "hidden",
          transition: "height .35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div ref={contentRef} style={{ padding: `0 ${SPACE.lg}px ${SPACE.md}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
