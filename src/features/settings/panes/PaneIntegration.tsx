import { Datetime } from "@/components/datetime/datetime";
import { useState } from "react";
import { cn } from "@/utils/tailwind";
import IconBolt from "@/components/icons/IconBolt";
import Input from "@/components/input/Input";
import { useTranslation } from "react-i18next";
import useDataStore from "../stores/useDateStore";
import { getDataFromNomads } from "../actions/get-data-from-nomads";
import { Button } from "@/components/button/Button";
import { closeSidebar } from "@/features/sidebar/stores/useSidebarStore";

const sidebarStyles = cn(
  "rounded-lg",
  "p-4",
  "bg-black border border-[#2b2b27]",
);

export function PaneIntegration() {
  const integrationCode = useDataStore(
    (store) => store.integration.integrationCode,
  );
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);
  const [username, setUsername] = useState(integrationCode ?? "deykun");

  const { t } = useTranslation();

  const handleSubmitNomads: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (username) {
      await getDataFromNomads({ username });
      closeSidebar();
    }
  };

  return (
    <div className={sidebarStyles}>
      <h2 className="text-xl text-white font-semibold mb-2">
        {t("integration.title")}
      </h2>
      <form onSubmit={handleSubmitNomads}>
        <h3 className="mb-2">{t("integration.withNomads")}</h3>
        <Input value={username} setValue={setUsername} />
        <br />
        <Button type="submit" isDisabled={!username}>
          <IconBolt />
          <span>Get data</span>
        </Button>
      </form>
      {lastUpdate && (
        <p className="text-[#979797] text-sm mt-2">
          {t("integration.lastUpdatePrefix")}{" "}
          <span className="text-white">
            <Datetime date={lastUpdate} />
          </span>
        </p>
      )}
    </div>
  );
}
