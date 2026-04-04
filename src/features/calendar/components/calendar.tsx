import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./month";

const calendar = getDaysGroupedByMonths();

export const Calendar = () => {
  return (
    <div>
      {calendar.map((month) => (
        <Month month={month} />
      ))}
    </div>
  );
};
