import { Calendar } from "./features/calendar/components/calendar/Calendar";
import { Sidebar } from "./features/sidebar/components/Sidebar";

function App() {
  return (
    <div className="flex ">
      <Sidebar className="shrink-0 z-1000" />
      <div className="w-full @container">
        <div className="overflow-hidden pl-95 pt-24 pb-24">
          <Calendar className="" />
        </div>
      </div>
    </div>
  );
}

export default App;
