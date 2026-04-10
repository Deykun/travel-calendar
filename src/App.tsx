import { Calendar } from "./features/calendar/components/Calendar";
import { ButtonUpdate } from "./features/integrations/components/button-update";

function App() {
  return (
    <>
      <div>
        <ButtonUpdate />
      </div>
      <Calendar />
    </>
  );
}

export default App;
