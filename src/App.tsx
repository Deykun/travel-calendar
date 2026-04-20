import { SlidableContent } from "./features/over-modal/components/SlidableContent";

import { ButtonFilter } from "./features/filters/components/ButtonFilter";
import { ButtonUpdate } from "./features/integrations/components/button-update";
import { cn } from "./utils/tailwind";
import { Button } from "./components/button/Button";
import IconGithub from "./components/icons/IconGithub";
import { Calendar } from "./features/calendar/components/calendar";

function App() {
  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-100",
          "flex gap-3",
          "bg-[#111110] p-6",
        )}
      >
        <ButtonUpdate />
        <ButtonFilter />
        <Button
          tagName="a"
          href="https://github.com/Deykun/travel-calendar"
          target="_blank"
        >
          <IconGithub />
          <span>Repository</span>
        </Button>
      </header>
      <SlidableContent>
        <Calendar className="pt-24" />
      </SlidableContent>
    </>
  );
}

export default App;
