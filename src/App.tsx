import { CalendarFooter } from "./features/calendar/components/calendar-footer/CalendarFooter";
import { CalendarHeader } from "./features/calendar/components/calendar-header/CalendarHeader";
import { Calendar } from "./features/calendar/components/calendar/Calendar";
import { Sidebar } from "./features/sidebar/components/Sidebar";

function App() {
  return (
    <div className="flex ">
      <Sidebar className="shrink-0 z-1000" />
      <div className="w-full">
        <div className="overflow-hidden pl-95 pt-24 pb-24">
          <div className="@container">
            <CalendarHeader />
            <Calendar />
            <CalendarFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
