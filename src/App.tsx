import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className={cn("text-xl")}>{t("common.calendar")}</h1>
    </>
  );
}

export default App;
