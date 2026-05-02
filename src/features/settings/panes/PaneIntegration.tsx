import { Datetime } from "@/components/datetime/datetime";
import { useState } from "react";
import { cn } from "@/utils/tailwind";
import IconBolt from "@/components/icons/IconBolt";
import Input from "@/components/input/Input";
import { useTranslation } from "react-i18next";
import useDataStore from "../stores/useDateStore";
import { getDataFromNomads } from "../actions/get-data-from-nomads";
import { Button } from "@/components/button/Button";
import { Pane } from "@/features/sidebar/components/pane/Pane";
import IconWarning from "@/components/icons/IconWarning";

export function PaneIntegration() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const integrationCode = useDataStore(
    (store) => store.integration.integrationCode,
  );
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);
  const [username, setUsername] = useState(integrationCode ?? "deykun");

  const { t } = useTranslation();

  const handleUsernameUpdate = (newValue: string) => {
    setUsername(newValue);
    setErrorMessage("");
  };

  const handleSubmitNomads: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    if (username) {
      const response = await getDataFromNomads({ username });

      if (!response.isSuccess) {
        setErrorMessage(response.reason);
      }
    }

    setIsLoading(false);
  };

  return (
    <Pane>
      <Pane.Title>{t("integration.title")}</Pane.Title>
      <form onSubmit={handleSubmitNomads} className={cn("flex flex-col gap-3")}>
        <Pane.Subtitle>{t("integration.withNomads")}</Pane.Subtitle>
        <Input
          value={username}
          setValue={handleUsernameUpdate}
          isDisabled={isLoading}
        />
        <Button
          className="ml-auto"
          type="submit"
          isDisabled={!username}
          isLoading={isLoading}
        >
          <IconBolt />
          <span>Get data</span>
        </Button>
      </form>
      {lastUpdate && (
        <p className="text-[#979797] text-xs mt-2">
          {t("integration.lastUpdatePrefix")}{" "}
          <span className="text-white">
            <Datetime date={lastUpdate} />
          </span>
          .
        </p>
      )}
      {errorMessage && (
        <Pane.Footer>
          <h4 className="flex gap-2 mb-1 text-sm text-[white] font-semibold tracking-wide">
            <IconWarning className="size-5 text-[#d8da51]" />
            <span>{t("common.error")}</span>
          </h4>
          <p className="text-xs mb-2">{t(errorMessage)}</p>
        </Pane.Footer>
      )}
    </Pane>
  );
}
