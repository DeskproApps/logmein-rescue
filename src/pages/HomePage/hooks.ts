import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getSessionService,
  getCurrentAccountService,
} from "../../services/logmein-rescue";
import { QueryKey } from "../../query";
import type { Account, Session } from "../../services/logmein-rescue/types";

type UseSessions = () => {
  isLoading: boolean;
  account: Account;
  sessions: Session[];
};

const useSessions: UseSessions = () => {
  const account = useQueryWithClient(
    [QueryKey.ACCOUNT],
    getCurrentAccountService,
  );

  const sessions = useQueryWithClient(
    [QueryKey.SESSION, `${account.data?.iTechID}`],
    (client) => getSessionService(client, account.data?.iTechID as Account["iTechID"]),
    { enabled: Boolean(account.data?.iTechID) },
  );

  return {
    isLoading: [account].some(({ isLoading }) => isLoading),
    account: account.data as Account,
    sessions: sessions.data || [],
  };
};

export { useSessions };
