import { CalendarFooter } from './features/calendar/components/calendar-footer/CalendarFooter';
import { CalendarHeader } from './features/calendar/components/calendar-header/CalendarHeader';
import { Calendar } from './features/calendar/components/calendar/Calendar';
import ErrorBoundary from './features/error-boundary/components/ErrorBoundary';
import { Fallback } from './features/error-boundary/components/fallback/Fallback';
import { useRefreshIfNeeded } from './features/error-boundary/hooks/useShouldRefresh';
import { ButtonCopySharableLink } from './features/share/components/ButtonCopySharableLink';
import { ButtonDownloadImage } from './features/share/components/ButtonDownloadImage';
import { ButtonGoToNomads } from './features/share/components/ButtonGoToNomads';
import { LoadingOverlay } from './features/share/components/LoadingOverlay';
import { useLoadDataFromUrlIfPossible } from './features/share/hooks/useLoadDataFromUrlIfPossible';
import { Sidebar } from './features/sidebar/components/Sidebar';

function App() {
  useLoadDataFromUrlIfPossible();
  useRefreshIfNeeded();

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div className="flex">
        <Sidebar className="shrink-0 z-500" />
        <div className="w-full">
          <div className="overflow-hidden [@media(min-width:860px)]:pl-100 py-12">
            <div id="shareable-content-container">
              <div id="shareable-content-wrapper">
                <div id="shareable-content" className="@container max-w-[2000px] mx-auto py-12">
                  <div id="shareable-content-bg" />
                  <CalendarHeader />
                  <Calendar />
                  <CalendarFooter />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 empty:hidden">
              <ButtonGoToNomads />
              <ButtonCopySharableLink />
              <ButtonDownloadImage />
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay />
    </ErrorBoundary>
  );
}

export default App;
