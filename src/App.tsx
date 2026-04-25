import { Calendar } from "./features/calendar/components/Calendar";
import { Sidebar } from "./features/sidebar/components/Sidebar";

function App() {
  return (
    <>
      <div className="flex gap-5">
        <Sidebar className="shrink-0" />
        <div className="w-full">
          <Calendar className="pt-24" />
        </div>
      </div>
    </>
  );
}

export default App;
