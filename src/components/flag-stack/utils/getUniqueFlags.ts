import type { FlagData } from "@/features/filters/hooks/useFlagsForDate";

export const getUniqueFlags = (flags: FlagData[]): FlagData[] => {
  const seen = new Set<string>();

  return flags.filter(({ countryCode }) => {
    if (seen.has(countryCode)) {
      return false;
    }

    seen.add(countryCode);

    return true;
  });
};
