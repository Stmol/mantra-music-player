import type { ComponentType } from "svelte";
import type { ProgressMeterAccent } from "../../shared/ProgressMeter";

export type SummaryCardIcon = ComponentType;

export type SummaryCardProps = {
  ariaLabel: string;
  description?: string;
  icon?: SummaryCardIcon;
  progress?: number;
  progressAccent?: ProgressMeterAccent;
  progressMax?: number;
  title: string;
  value: string;
};
