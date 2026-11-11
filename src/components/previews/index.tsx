import type * as React from "react";
import {
  ButtonPreview,
  ButtonGroupPreview,
  CheckboxPreview,
  SwitchPreview,
  TogglePreview,
  ToggleGroupPreview,
  SliderPreview,
  InputPreview,
  InputGroupPreview,
  InputOtpPreview,
  TextareaPreview,
  LabelPreview,
  FieldPreview,
  ComboboxPreview,
  SelectPreview,
  NativeSelectPreview,
  RadioGroupPreview,
  CalendarPreview,
} from "./forms";

import {
  AvatarPreview,
  BadgePreview,
  CarouselPreview,
  ChartPreview,
  ItemPreview,
  KbdPreview,
  TablePreview,
} from "./data-display";

import {
  AlertPreview,
  ProgressPreview,
  SkeletonPreview,
  SpinnerPreview,
  ToastPreview,
} from "./feedback";

import {
  AccordionPreview,
  AspectRatioPreview,
  CardPreview,
  CollapsiblePreview,
  ResizablePreview,
  ScrollAreaPreview,
  SeparatorPreview,
  SidebarPreview,
} from "./layout";

import {
  BreadcrumbPreview,
  MenubarPreview,
  NavigationMenuPreview,
  PaginationPreview,
  TabsPreview,
} from "./navigation";

import {
  AlertDialogPreview,
  CommandPreview,
  ContextMenuPreview,
  DialogPreview,
  DrawerPreview,
  DropdownMenuPreview,
  HoverCardPreview,
  PopoverPreview,
  SheetPreview,
  TooltipPreview,
} from "./overlay";

export function FallbackPreview() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 text-neutral-400">
      <div className="h-8 w-16 rounded-xs border border-dashed border-border bg-canvas-soft flex items-center justify-center">
        <span className="font-mono text-[10px] text-neutral-500">Preview</span>
      </div>
    </div>
  );
}

export const PREVIEW_REGISTRY: Record<string, React.ComponentType> = {
  // Forms (18)
  button: ButtonPreview,
  "button-group": ButtonGroupPreview,
  calendar: CalendarPreview,
  checkbox: CheckboxPreview,
  combobox: ComboboxPreview,
  field: FieldPreview,
  input: InputPreview,
  "input-group": InputGroupPreview,
  "input-otp": InputOtpPreview,
  label: LabelPreview,
  "native-select": NativeSelectPreview,
  "radio-group": RadioGroupPreview,
  select: SelectPreview,
  slider: SliderPreview,
  switch: SwitchPreview,
  textarea: TextareaPreview,
  toggle: TogglePreview,
  "toggle-group": ToggleGroupPreview,

  // Data Display (7)
  avatar: AvatarPreview,
  badge: BadgePreview,
  carousel: CarouselPreview,
  chart: ChartPreview,
  item: ItemPreview,
  kbd: KbdPreview,
  table: TablePreview,

  // Feedback (5)
  alert: AlertPreview,
  progress: ProgressPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  toast: ToastPreview,

  // Layout (8)
  accordion: AccordionPreview,
  "aspect-ratio": AspectRatioPreview,
  card: CardPreview,
  collapsible: CollapsiblePreview,
  resizable: ResizablePreview,
  "scroll-area": ScrollAreaPreview,
  separator: SeparatorPreview,
  sidebar: SidebarPreview,

  // Navigation (5)
  breadcrumb: BreadcrumbPreview,
  menubar: MenubarPreview,
  "navigation-menu": NavigationMenuPreview,
  pagination: PaginationPreview,
  tabs: TabsPreview,

  // Overlay (10)
  "alert-dialog": AlertDialogPreview,
  command: CommandPreview,
  "context-menu": ContextMenuPreview,
  dialog: DialogPreview,
  drawer: DrawerPreview,
  "dropdown-menu": DropdownMenuPreview,
  "hover-card": HoverCardPreview,
  popover: PopoverPreview,
  sheet: SheetPreview,
  tooltip: TooltipPreview,
};

export function getComponentPreview(id: string): React.ComponentType {
  return PREVIEW_REGISTRY[id] ?? FallbackPreview;
}
