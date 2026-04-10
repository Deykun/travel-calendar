import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./features/modal/providers/modal-provider.tsx";
import { HoverModalProvider } from "./features/hover-modal/providers/HoverModalProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ModalProvider />
        <HoverModalProvider />
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>,
);
