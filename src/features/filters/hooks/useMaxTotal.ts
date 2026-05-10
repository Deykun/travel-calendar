import usePreferencesStore from "@/features/preferences/stores/usePreferencesStore";
import useFiltersStore from "../stores/useFilterStore";

// TODO: cache in store at some point
export const useMaxTotal = () => {
    const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);
    const maxTotal = useFiltersStore((store) => {
        if (counterShouldShow === 'numberOfCountries') {
            return store.filtered.summary.maxCountriesInDay;
        }

        if (counterShouldShow === 'orderOfUnlocking') {
            return store.filtered.summary.activeDays.length;
        }

        return store.filtered.summary.maxYearsAbroadInDay;
    });

    return maxTotal;
}