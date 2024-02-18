import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { createNewSessionService } from "../../services/logmein-rescue";
import { useRegisterElements, useAsyncError } from "../../hooks";
import { useSessions } from "./hooks";
import { SOAP_ERRORS } from "../../constants";
import { Home } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";

const HomePage: FC = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string>>(null);
  const [newSessionPinCode, setNewSessionPinCode] = useState<Maybe<string>>(null);
  const { account, sessions, isLoading: isLoadingSessions } = useSessions();
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);
  const isLoading = isLoadingSessions || !ticketId;

  const onCreate = useCallback((sessionName: string) => {
    if (!client || !account?.iTechID || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return createNewSessionService(client, account.iTechID, sessionName, ticketId)
      .then(setNewSessionPinCode)
      .catch((err) => {
        const error = get(SOAP_ERRORS, [err.data]);

        if (!error) {
          asyncErrorHandler(err);
        } else {
          setError(error);
        }
      });
  }, [client, asyncErrorHandler, account?.iTechID, ticketId]);

  const onInsertLink = useCallback((sessionLink: string) => {
    client?.deskpro().appendLinkToActiveTicketReplyBox(sessionLink, sessionLink);
  }, [client]);

  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: { type: "logout" },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Home
      error={error}
      sessions={sessions}
      onCreate={onCreate}
      ticketId={ticketId}
      onInsertLink={onInsertLink}
      newSessionPinCode={newSessionPinCode}
    />
  );
};

export { HomePage };
