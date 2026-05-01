import { cn } from "@/utils/tailwind";

export const classNamesLayoutGap = "gap-4 @min-[1200px]:gap-8";
export const classNamesLayoutPx = "px-4 @min-[900px]:px-6 @min-[1200px]:px-12";
export const classNamesLayoutGrid = cn(
  "grid grid-cols-1 @min-[740px]:grid-cols-2",
  "@min-[1200px]:grid-cols-3 @min-[1600px]:grid-cols-4",
);
