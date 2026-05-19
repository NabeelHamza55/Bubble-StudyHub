import type { ReactNode } from "react";
import type { TabId } from "../../types";

interface SvgIconProps {
  className?: string;
  size?: number;
}

function SvgIcon({ className, size = 20, children }: SvgIconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconHome(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z" />
      <path d="M9 20v-7h6v7" />
    </SvgIcon>
  );
}

function IconTarget(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}

function IconClipboard(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </SvgIcon>
  );
}

function IconCards(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="3" y="5" width="14" height="16" rx="2" />
      <path d="M7 5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1" />
    </SvgIcon>
  );
}

function IconBook(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </SvgIcon>
  );
}

function IconLink(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </SvgIcon>
  );
}

export function IconMenu(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </SvgIcon>
  );
}

export function IconSearch(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </SvgIcon>
  );
}

const TAB_ICON_MAP: Record<TabId, (props: SvgIconProps) => ReactNode> = {
  home: IconHome,
  practice: IconTarget,
  studyquiz: IconClipboard,
  quiz: IconCards,
  topics: IconBook,
  extra: IconLink,
};

export function TabIcon({ tab, className, size }: { tab: TabId } & SvgIconProps) {
  const Icon = TAB_ICON_MAP[tab];
  return <Icon className={className} size={size} />;
}
