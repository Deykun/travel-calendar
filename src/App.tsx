import { SlidableContent } from "./features/over-modal/components/SlidableContent";
import { Calendar } from "./features/calendar/components/Calendar";
import { ButtonFilter } from "./features/filters/components/ButtonFilter";
import { ButtonUpdate } from "./features/integrations/components/button-update";
import { cn } from "./utils/tailwind";

function App() {
  return (
    <>
      <header
        className={cn("fixed top-0 left-0 z-100", "flex gap-3", "bg-black p-6")}
      >
        <ButtonUpdate />
        <ButtonFilter />
      </header>
      <SlidableContent>
        <Calendar className="pt-24" />
      </SlidableContent>
    </>
  );
}

export default App;
