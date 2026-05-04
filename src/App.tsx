import { CalendarFooter } from './features/calendar/components/calendar-footer/CalendarFooter';
import { CalendarHeader } from './features/calendar/components/calendar-header/CalendarHeader';
import { Calendar } from './features/calendar/components/calendar/Calendar';
import { ButtonCopySharableLink } from './features/share/components/ButtonCopySharableLink';
import { ButtonGoToNomads } from './features/share/components/ButtonGoToNomads';
import { LoadingOverlay } from './features/share/components/LoadingOverlay';
import { useLoadDataFromUrlIfPossible } from './features/share/hooks/useLoadDataFromUrlIfPossible';
import { Sidebar } from './features/sidebar/components/Sidebar';

function App() {
  useLoadDataFromUrlIfPossible();

  return (
    <>
      <div className="flex ">
        <Sidebar className="shrink-0 z-500" />
        <div className="w-full">
          <div className="overflow-hidden [@media(min-width:860px)]:pl-95 pt-24 pb-24">
            <div className="@container max-w-[2000px] mx-auto">
              <CalendarHeader />
              <Calendar />
              <CalendarFooter />
              <div className="mt-24 flex flex-wrap justify-center gap-4 empty:hidden">
                <ButtonGoToNomads />
                <ButtonCopySharableLink />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay />
    </>
  );
}

export default App;
