import { Calendar } from "./features/calendar/components/calendar/Calendar";
import { Sidebar } from "./features/sidebar/components/Sidebar";

function App() {
  return (
    <>
      <div className="flex gap-5">
        <Sidebar className="shrink-0 z-1000" />
        <div className="w-full @container">
          <Calendar className="pt-24 pb-24" />
        </div>
      </div>
    </>
  );
}

export default App;
