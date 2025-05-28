import * as Sentry from '@sentry/react';
import './instrument';
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { App } from "./App";
import { ErrorFallback } from "./components";
import "iframe-resizer/js/iframeResizer.contentWindow.js";
import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

const root = ReactDOM.createRoot(document.getElementById('root') as Element, {
  onRecoverableError: Sentry.reactErrorHandler(),
});
root.render((
  <StrictMode>
    <DeskproAppProvider>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingSpinner/>}>
            <Sentry.ErrorBoundary FallbackComponent={ErrorFallback}>
              <App />
            </Sentry.ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </HashRouter>
    </DeskproAppProvider>
  </StrictMode>
));
