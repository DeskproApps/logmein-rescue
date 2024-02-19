import { create } from "xmlbuilder2";
import { baseRequest } from "./baseRequest";
import { LogMeInError } from "./LogMeInError";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Account } from "./types";

const getCurrentAccountService = (client: IDeskproClient) => {
  const endpoint = "getAccount_v2";
  const xml = create(`
    <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
    >
      <soap12:Body>
        <${endpoint} xmlns="https://secure.logmeinrescue.com/API/API.asmx">
          <sAuthCode>${placeholders.AUTH_CODE}</sAuthCode>
        </${endpoint}>
      </soap12:Body>
    </soap12:Envelope>
  `).end();

  return baseRequest<Account>(client, { endpoint, data: xml })
    .then((account) => {
      if (account.getAccount_v2Result === "getAccount_OK") {
        return {
          iAccountID: Number(account.iAccountID),
          sOrganization: account.sOrganization,
          iAdminID: Number(account.iAdminID),
          iTechID: Number(account.iTechID),
          sEmail: account.sEmail,
          bTcRunning: Boolean(account.bTcRunning),
        };
      } else {
        throw new LogMeInError({
          data: account.getAccount_v2Result,
        });
      }
    });
};

export { getCurrentAccountService };
