export type StackedLinkListItem = {
  label: string;
  meta?: number | string;
  value: string;
};

export type StackedLinkListProps = {
  headerActionAriaLabel?: string;
  items: StackedLinkListItem[];
  onHeaderAction?: () => void;
  onItemSelect?: (value: string) => void;
  title: string;
};
